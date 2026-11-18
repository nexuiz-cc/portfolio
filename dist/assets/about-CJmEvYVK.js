import{t as l,f as m,g as x,h as g,j as t,s as r,i as v,e as f}from"./page-gyTyqmWo.js";import{r as b,a as s,b as u,c as h}from"./chapter-DrJDel5a.js";function $(){const e=l.aboutPage,{brand:n}=r,o=l.nav.availability,d=m.map((a,i)=>`
      <div data-reveal style="--reveal-delay: ${i*80}ms">
        <div class="mb-2 flex items-baseline justify-between">
          <span class="text-sm font-medium text-ink">${a.name}</span>
          <span class="font-mono text-[11px] tracking-[0.14em] text-muted">${a.level}%</span>
        </div>
        <div class="h-px w-full bg-line">
          <div class="skill-bar-fill h-[3px] -translate-y-px bg-ink" data-skill="${a.level}"></div>
        </div>
      </div>`).join(""),c=x.map((a,i)=>`
      <div class="border-t border-line pt-4" data-reveal style="--reveal-delay: ${i*90}ms">
        <p class="font-display text-5xl font-extrabold tracking-[-0.03em] text-ink md:text-6xl">
          <span data-counter="${a.value}">0</span><span class="text-accent">${a.suffix}</span>
        </p>
        <p class="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">${a.label}</p>
      </div>`).join(""),p=g.map((a,i)=>`
      <div class="group grid grid-cols-1 gap-2 border-b border-line py-7 transition-colors duration-500 ease-paper hover:bg-fog md:grid-cols-12 md:items-baseline md:gap-6"
           data-reveal style="--reveal-delay: ${i*60}ms">
        <span class="font-mono text-[11px] tracking-[0.18em] text-muted md:col-span-3">${a.period}</span>
        <h3 class="font-display text-2xl font-extrabold tracking-[-0.03em] md:col-span-4 md:text-3xl">${a.title}</h3>
        <p class="text-sm leading-relaxed text-ink-soft md:col-span-5">${a.desc}</p>
      </div>`).join("");return`
  <!-- Hero：大見出し -->
  <header class="px-5 pb-10 pt-14 md:px-10 md:pb-16 md:pt-24">
    <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted" data-reveal>${e.eyebrow}</p>
    <h1 class="mt-5 font-display text-[clamp(2.9rem,9vw,8.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]" data-reveal style="--reveal-delay: 80ms">
      ${t.name}<span class="text-accent">.</span>
    </h1>
    <p class="mt-5 max-w-2xl font-serif text-[clamp(1.15rem,2.4vw,1.75rem)] font-light italic leading-[1.45] text-ink-soft" data-reveal style="--reveal-delay: 160ms">
      ${t.role} —— ${e.lede}
    </p>
    <div class="mt-8 flex flex-wrap items-center gap-4" data-reveal style="--reveal-delay: 240ms">
      <span class="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
        <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent"></span>${o}
      </span>
      <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">${t.location} / ${r.brand.role}</span>
    </div>
  </header>

  ${b([{id:"intro",index:"01",label:e.toc.intro},{id:"skills",index:"02",label:e.toc.skills},{id:"numbers",index:"03",label:e.toc.numbers},{id:"journey",index:"04",label:e.toc.journey},{id:"reach",index:"05",label:e.toc.reach}])}

  ${s({id:"intro",index:"01",title:e.chapters.intro,body:`
      ${u([t.bio[0],t.bio[1]])}
      ${h(v("portrait",1200,900),`${t.name} — ${e.figs.portrait}`,`Fig.01 — ${e.figs.portrait}`)}
    `})}

  ${s({id:"skills",index:"02",title:e.chapters.skills,body:`<div class="grid max-w-2xl grid-cols-1 gap-7">${d}</div>`})}

  ${s({id:"numbers",index:"03",title:e.chapters.numbers,body:`<div class="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">${c}</div>`})}

  ${s({id:"journey",index:"04",title:e.chapters.journey,body:`<div class="border-t border-line">${p}</div>`})}

  ${s({id:"reach",index:"05",title:e.chapters.reach,body:`
      <p class="max-w-xl text-[15px] leading-[1.85] text-ink-soft" data-reveal>
        ${e.reachText} ${l.nav.replyNote}
      </p>
      <a href="mailto:${n.email}" data-magnetic data-reveal
         class="mt-6 inline-block font-serif text-[clamp(1.5rem,4vw,2.75rem)] font-light italic tracking-tight text-ink underline decoration-line decoration-2 underline-offset-8 transition-colors duration-300 hover:decoration-accent">
        ${n.email}
      </a>
      <div class="mt-10" data-reveal>
        <a href="contact.html" data-magnetic
           class="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-paper transition-transform duration-300 ease-paper hover:scale-[1.03] active:scale-[0.98]">
          ${l.cta.button}
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    `})}`}f("about",['<div class="pt-16 md:pt-20"></div>',$()]);
