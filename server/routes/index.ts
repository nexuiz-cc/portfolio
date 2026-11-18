import { Router } from 'express';
import { buildPlaceholderSvg } from '../lib/placeholder';

const router = Router();

// ヘルスチェック API
router.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.COZE_PROJECT_ENV,
    timestamp: new Date().toISOString(),
  });
});

// seed 付きプレースホルダー画像 API：同じ seed からは常に同じ SVG を返し、全站でトーンを統一
// 使い方：/api/placeholder/<seed>/<幅>/<高さ>?v=video|social|short|web（v はカテゴリ別モチーフ、省略可）
router.get('/api/placeholder/:seed/:w/:h', (req, res) => {
  const seed = String(req.params.seed).slice(0, 40) || 'default';
  const w = parseInt(req.params.w, 10) || 1200;
  const h = parseInt(req.params.h, 10) || 900;
  const v = typeof req.query.v === 'string' ? req.query.v : undefined;

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(buildPlaceholderSvg(seed, w, h, v));
});

// お問い合わせフォーム送信 API

/** 簡易レートリミット：IP あたり 10 分間に 5 件まで（インメモリ・スライディングウィンドウ） */
const CONTACT_LIMIT = 5;
const CONTACT_WINDOW_MS = 10 * 60 * 1000;
const contactHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (contactHits.get(ip) ?? []).filter((t) => now - t < CONTACT_WINDOW_MS);
  if (hits.length >= CONTACT_LIMIT) {
    contactHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  contactHits.set(ip, hits);
  return false;
}

router.post('/api/contact', (req, res) => {
  const ip = req.ip ?? req.socket.remoteAddress ?? 'unknown';
  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ success: false, error: '送信回数が多すぎます。しばらくしてから再度お試しください' });
  }

  const { name, email, message } = req.body as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
  };

  if (typeof name !== 'string' || !name.trim() || name.length > 40) {
    return res.status(400).json({ success: false, error: 'お名前を正しく入力してください（40 文字以内）' });
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 80) {
    return res.status(400).json({ success: false, error: '有効なメールアドレスを入力してください' });
  }
  if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
    return res.status(400).json({ success: false, error: 'メッセージは必須で、2000 文字以内で入力してください' });
  }

  console.log(
    `[contact] ${new Date().toISOString()} ${name.trim()} <${email.trim()}> からのメッセージ（${message.trim().length} 文字）`,
  );

  return res.json({
    success: true,
    message: 'ありがとうございます。24 時間以内に返信します。',
    receivedAt: new Date().toISOString(),
  });
});

// クリーンパス → 実ページ（URL を美しく保つ。例：/works → /works.html）
const cleanPaths: Record<string, string> = {
  '/works': '/works.html',
  '/about': '/about.html',
  '/contact': '/contact.html',
  '/project': '/project.html',
};

Object.entries(cleanPaths).forEach(([from, to]) => {
  router.get(from, (req, res) => {
    const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    res.redirect(302, `${to}${query}`);
  });
});

export default router;
