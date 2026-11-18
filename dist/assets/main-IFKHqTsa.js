import{p as f,s as i,t as a,i as g,c as p,m as u,a as o,b as v,d as b,e as h}from"./page-gyTyqmWo.js";import{i as $}from"./icons-DWAe6HI_.js";import{r as k}from"./works-466zRBI9.js";function x(e){return p.find(t=>t.id===e)??p[0]}function y(e,t){const s=x(e.cat);return`
    <div class="mt-3 flex items-start justify-between gap-4">
      <div class="min-w-0">
        <p class="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          ${e.year} · ${$(s.id,"h-3 w-3")} ${s.label}
        </p>
        <p class="mt-1 text-sm font-medium leading-snug text-ink md:text-base">${e.title}</p>
        ${t&&e.metrics?`<p class="mt-1.5 font-mono text-[11px] font-medium tracking-[0.06em] text-ink">${e.metrics}</p>`:""}
      </div>
      <span class="mt-0.5 inline-flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
        ${a.hero.view} <span aria-hidden="true">→</span>
      </span>
    </div>`}function m(e,t,s={}){const r=x(e.cat),{featured:n=!1,eager:l=!1}=s,[c,d]=n?[1200,900]:[640,480];return`
    <figure class="hero-item ${n?"md:col-span-7":""}" style="--hero-delay: ${t}ms">
      <a href="project.html?id=${e.id}" class="hero-card group aspect-[4/3]" data-cursor="view" aria-label="${a.hero.viewWork}：${e.title}">
        ${n?`<span class="absolute left-3 top-3 z-10 rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper">${a.hero.featuredLabel}</span>`:""}
        <img src="${g(e.coverSeed,c,d,e.cat)}" alt="${e.title} · ${r.label}カバー" width="${c}" height="${d}" loading="${l?"eager":"lazy"}" />
      </a>
      ${y(e,n)}
    </figure>`}function w(){const[e,...t]=f,s=t.slice(0,4);return`
  <section id="top" class="relative overflow-hidden bg-fog">
    <!-- 標語：左上の 2 行コピー（site.config.ts の brand.tagline で編集可） -->
    <div class="px-5 pt-24 md:px-10 md:pt-32">
      <h1 class="hero-item max-w-[24ch] text-[19px] font-medium leading-[1.45] text-ink-soft md:max-w-md md:text-[22px]" style="--hero-delay: 0ms">
        ${i.brand.tagline[0]}<br />
        ${i.brand.tagline[1]}
      </h1>
    </div>

    <!-- 注目作品：モバイルは単列、md 以上は 1 大（7 列）+ 4 小（5 列の 2×2） -->
    <div class="px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14" data-hero-grid>
      <div class="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-12 md:gap-y-5">
        ${e?m(e,90,{featured:!0,eager:!0}):""}
        <div class="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:col-span-5 md:gap-y-5">
          ${s.map((r,n)=>m(r,160+n*70,{eager:n===0})).join("")}
        </div>
      </div>

      <div class="hero-item mt-12 flex justify-center md:mt-16" style="--hero-delay: 480ms">
        <a href="works.html" data-magnetic
           class="rounded-full border border-ink px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper">
          ${a.hero.seeAll} →
        </a>
      </div>
    </div>
  </section>`}function j(){const e=u.map(t=>`
      <span class="mx-6 flex items-center gap-6 font-mono text-sm uppercase tracking-[0.2em] text-paper">
        ${t}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="text-paper/50">
          <path d="M7 0L8.6 5.4L14 7L8.6 8.6L7 14L5.4 8.6L0 7L5.4 5.4L7 0Z" fill="currentColor"/>
        </svg>
      </span>`).join("");return`
  <div class="marquee border-y border-ink bg-ink py-4" aria-hidden="true">
    <div class="marquee-track">
      <div class="flex items-center">${e}</div>
      <div class="flex items-center">${e}</div>
    </div>
  </div>`}function S(e,t){const s=e.tags.map(r=>`<li class="flex items-center gap-3 border-t border-line py-3 text-sm transition-colors duration-500 group-hover:border-line-light">
          <span class="h-1 w-1 rounded-full bg-current"></span>${r}
        </li>`).join("");return`
  <div class="group relative flex flex-col border-t border-line px-1 py-10 transition-colors duration-500 ease-paper hover:bg-ink hover:text-paper md:px-6 md:py-12"
       data-reveal style="--reveal-delay: ${t%2*100}ms">
    <div class="flex items-start justify-between">
      <span class="font-mono text-xs tracking-[0.2em] text-muted transition-colors duration-500 group-hover:text-accent">(${String(t+1).padStart(2,"0")})</span>
      <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true"
           class="text-ink transition-all duration-500 ease-paper group-hover:rotate-45 group-hover:text-accent">
        <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <h3 class="mt-8 font-display text-3xl font-extrabold tracking-[-0.03em] md:mt-12 md:text-4xl">${e.title}</h3>
    <p class="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">${e.en}</p>
    <p class="mt-4 max-w-md text-[15px] leading-[1.8] text-ink-soft transition-colors duration-500 group-hover:text-paper/70">${e.desc}</p>
    <ul class="mt-8">${s}</ul>
  </div>`}function L(e){return`
  <section id="services" class="px-5 py-24 md:px-10 md:py-36">
    <div class="mb-12 md:mb-16" data-reveal>
      <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"><span class="font-bold text-accent">${e}</span> / ${a.services.eyebrow}</p>
      <div class="mt-4 flex flex-wrap items-end justify-between gap-6">
        <h2 class="font-display text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">${o("services")}</h2>
        <p class="max-w-xs text-sm leading-relaxed text-ink-soft">${a.services.desc}</p>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-x-10 md:grid-cols-2">
      ${v.map(S).join("")}
    </div>
    <div class="border-t border-line" data-reveal></div>
  </section>`}const C=[{name:"KITASANDO",className:"font-display text-xl font-extrabold tracking-[-0.02em]"},{name:"あおぞら工業",className:"font-serif text-xl italic"},{name:"HIKARI TECH",className:"font-mono text-base font-bold tracking-[0.22em]"},{name:"みのりフーズ",className:"font-display text-xl font-medium tracking-[0.08em]"},{name:"MIDORI FES",className:"font-display text-xl font-extrabold uppercase tracking-[0.12em]"},{name:"くらし日和",className:"font-serif text-xl"}];function M(e){return`
  <section class="px-5 py-16 md:px-10 md:py-24">
    <div class="mb-10 flex flex-wrap items-end justify-between gap-4" data-reveal>
      <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"><span class="font-bold text-accent">${e}</span> / ${a.clients.eyebrow}</p>
      <h2 class="font-display text-xl font-extrabold tracking-[-0.02em] text-ink md:text-2xl">${o("clients")}</h2>
    </div>
    <div class="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-6" data-reveal>
      ${C.map(t=>`
        <div class="flex h-24 items-center justify-center border-b border-r border-line px-4 md:h-28">
          <span class="${t.className} text-ink/30 transition-colors duration-500 ease-paper hover:text-ink">${t.name}</span>
        </div>`).join("")}
    </div>
  </section>`}function N(e,t){const s=t===0,r=(n,l)=>`
      <div class="grid grid-cols-[4.5rem_1fr] gap-3 border-t border-line py-4 md:grid-cols-[5rem_1fr]">
        <span class="pt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">${n}</span>
        <p class="text-[15px] font-medium leading-[1.7] text-ink ${s?"md:text-lg":""}">${l}</p>
      </div>`;return`
  <figure class="flex flex-col justify-between ${s?"md:col-span-7":"md:col-span-5"}"
          data-reveal style="--reveal-delay: ${t*100}ms">
    <blockquote>
      ${r(a.voices.challenge,e.challenge)}
      ${r(a.voices.action,e.action)}
      ${r(a.voices.result,e.result)}
    </blockquote>
    <figcaption class="mt-8 flex items-center gap-4">
      <span class="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-mono text-[11px] text-paper">${e.name.slice(0,1)}</span>
      <span>
        <span class="block text-sm font-semibold text-ink">${e.name}</span>
        <span class="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">${e.role}</span>
      </span>
    </figcaption>
  </figure>`}function q(e){return`
  <section class="px-5 py-24 md:px-10 md:py-36">
    <div class="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16" data-reveal>
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"><span class="font-bold text-accent">${e}</span> / ${a.voices.eyebrow}</p>
        <h2 class="mt-4 font-display text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">${o("voices")}</h2>
      </div>
      <p class="max-w-xs text-sm leading-relaxed text-ink-soft">${a.voices.desc}</p>
    </div>
    <div class="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-12">
      ${b.map(N).join("")}
    </div>
  </section>`}function I(e){const{email:t}=i.brand;return`
  <section class="bg-ink px-5 py-24 text-paper md:px-10 md:py-36">
    <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40" data-reveal><span class="font-bold text-accent">${e}</span> / ${a.cta.eyebrow}</p>
    <div class="mt-6 flex flex-wrap items-end justify-between gap-10">
      <h2 class="font-display text-[clamp(2.8rem,9vw,8.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]" data-reveal>
        ${o("contact")}
      </h2>
      <div class="flex flex-col items-start gap-6 pb-3" data-reveal style="--reveal-delay: 120ms">
        <p class="max-w-xs text-[15px] leading-[1.8] text-paper/60">
          ${a.cta.sub}
        </p>
        <a href="contact.html" data-magnetic
           class="group inline-flex items-center gap-3 rounded-full bg-paper px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition-transform duration-300 ease-paper hover:scale-[1.03] active:scale-[0.98]">
          ${a.cta.button}
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="mailto:${t}" class="u-sweep font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60 transition-colors hover:text-paper">
          ${t}
        </a>
      </div>
    </div>
  </section>`}function A(){const e=i.sections,t=[{enabled:e.works.enabled,render:k},{enabled:e.services.enabled,render:L},{enabled:e.clients.enabled,render:M},{enabled:e.voices.enabled,render:q},{enabled:e.contact.enabled,render:I}];let s=0;const r=t.filter(n=>n.enabled).map(n=>n.render(String(++s).padStart(2,"0")));h("home",[w(),j(),...r])}A();
