#!/bin/bash
set -Eeuo pipefail


PORT=5000
COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"
DEPLOY_RUN_PORT="${DEPLOY_RUN_PORT:-${PORT}}"


cd "${COZE_WORKSPACE_PATH}"

kill_port_if_listening() {
    local pids
    pids=$(ss -H -lntp 2>/dev/null | awk -v port="${DEPLOY_RUN_PORT}" '$4 ~ ":"port"$"' | grep -o 'pid=[0-9]*' | cut -d= -f2 | paste -sd' ' - || true)
    if [[ -z "${pids}" ]]; then
      echo "Port ${DEPLOY_RUN_PORT} is free."
      return
    fi
    echo "Port ${DEPLOY_RUN_PORT} in use by PIDs: ${pids} (SIGKILL)"
    echo "${pids}" | xargs -I {} kill -9 {}
    sleep 1
    pids=$(ss -H -lntp 2>/dev/null | awk -v port="${DEPLOY_RUN_PORT}" '$4 ~ ":"port"$"' | grep -o 'pid=[0-9]*' | cut -d= -f2 | paste -sd' ' - || true)
    if [[ -n "${pids}" ]]; then
      echo "Warning: port ${DEPLOY_RUN_PORT} still busy after SIGKILL, PIDs: ${pids}"
    else
      echo "Port ${DEPLOY_RUN_PORT} cleared."
    fi
}


LOG_DIR="${COZE_LOG_DIR:-${COZE_WORKSPACE_PATH}/logs}"
LOG_FILE="${LOG_DIR}/server.log"
PID_FILE="${LOG_DIR}/server.pid"

# detach されたプロセスは誰も回収しないため、この時間を超えたら自壊させ、ポートとメモリの長期リークを防ぐ。
MAX_RUNTIME_SECONDS=3600

timeout_watchdog_enabled() {
  [[ -z "${COZE_EVAL:-}" && -z "${COZE_PROJECT_TYPE:-}" ]]
}

# 実際に detach されるのはこの bash wrapper。これがプロセスグループの leader で、
# グループ内の watchdog が時間どおりにグループ全体を回収する（wrapper -> pnpm -> tsx -> node）。
# 内側のプロセスが先に終了した場合も、ついでにプロセスグループを空にして残骸を残さない。
RUN_WITH_TIMEOUT="$(declare -f timeout_watchdog_enabled)"'
timeout_seconds=$1
shift

"$@" &
child_pid=$!

# 先に TERM を無視しておき、グループ全体への TERM（自分も含む）のあとで生き残って KILL を追撃できるようにする。
if timeout_watchdog_enabled; then
( trap "" TERM
  sleep "${timeout_seconds}"
  echo "[dev] バックグラウンドプロセスが ${timeout_seconds}s を超過。プロセスグループ $$ を回収。"
  kill -TERM -- "-$$" 2>/dev/null || true
  sleep 5
  kill -KILL -- "-$$" 2>/dev/null || true
) &
fi

wait "${child_pid}"
kill -KILL -- "-$$" 2>/dev/null || true
'

# coze-daemon は runtime shell 終了時に元のプロセスグループをクリーンアップする。
# Node の detached spawn で独立した session/プロセスグループを作り、stdio はログへ直接書き込む。
# 返ってくる PID は wrapper のもので、プロセスグループ全体の PGID でもある。以降はグループ単位で回収する。
spawn_detached() {
  local cwd="$1"
  local log_file="$2"
  shift 2

  node - "$cwd" "$log_file" \
    /bin/bash -c "${RUN_WITH_TIMEOUT}" detached-runner "${MAX_RUNTIME_SECONDS}" "$@" <<'NODE'
const fs = require('node:fs');
const { spawn } = require('node:child_process');

const [cwd, logFile, command, ...args] = process.argv.slice(2);
if (!cwd || !logFile || !command) {
  throw new Error('spawn_detached 缺少 cwd、log_file 或 command');
}

const logFd = fs.openSync(logFile, 'a');
try {
  const child = spawn(command, args, {
    cwd,
    detached: true,
    env: process.env,
    stdio: ['ignore', logFd, logFd],
  });
  child.unref();
  process.stdout.write(String(child.pid));
} finally {
  fs.closeSync(logFd);
}
NODE
}

stop_detached() {
  local pid="${1:-}"
  if [[ -z "${pid}" ]]; then
    return
  fi

  kill -TERM -- "-${pid}" 2>/dev/null || kill -TERM "${pid}" 2>/dev/null || true
  sleep 1
  kill -KILL -- "-${pid}" 2>/dev/null || true
}

# ポートを listen しているのは孫プロセス（pnpm -> tsx -> node）。ポートだけ潰すと上位の pnpm/tsx が残るため、
# 前回記録した PID を使ってプロセスグループごと回収する。
if [[ -f "${PID_FILE}" ]]; then
  stop_detached "$(cat "${PID_FILE}" 2>/dev/null || true)"
  rm -f "${PID_FILE}"
fi

echo "Clearing port ${DEPLOY_RUN_PORT} before start."
kill_port_if_listening
echo "Starting express + Vite dev server on port ${DEPLOY_RUN_PORT}..."

mkdir -p "${LOG_DIR}"
: > "${LOG_FILE}"

export PORT="${DEPLOY_RUN_PORT}"
server_pid="$(spawn_detached "${COZE_WORKSPACE_PATH}" "${LOG_FILE}" \
  "$(command -v pnpm)" tsx watch server/server.ts)"
echo "${server_pid}" > "${PID_FILE}"

sleep 1
if [[ -z "${server_pid}" ]] || ! kill -0 "${server_pid}" 2>/dev/null; then
  echo "Dev server failed to start. See ${LOG_FILE}." >&2
  tail -n 20 "${LOG_FILE}" >&2 || true
  rm -f "${PID_FILE}"
  exit 1
fi

echo "Dev server started (PID: ${server_pid})."
if timeout_watchdog_enabled; then
  echo "Auto stop after ${MAX_RUNTIME_SECONDS}s."
fi
echo "Log file: ${LOG_FILE}"
echo "PID file: ${PID_FILE}"

