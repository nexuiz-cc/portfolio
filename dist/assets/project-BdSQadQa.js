import{p as n,t as u,i as g,c,e as $}from"./page-gyTyqmWo.js";import{i as x}from"./icons-DWAe6HI_.js";import{r as v,a as i,b as l,c as d,d as b}from"./chapter-DrJDel5a.js";function k(a){return c.find(e=>e.id===a)??c[0]}function s(a,e){return`
    <div class="border-t border-line pt-3">
      <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">${a}</dt>
      <dd class="mt-1.5 text-sm text-ink">${e}</dd>
    </div>`}function w(a){const e=n.find(o=>o.id===a)??n[0],h=n.indexOf(e),p=n[(h+1)%n.length],r=k(e.cat),t=u.projectPage,m=e.gallerySeeds.map(o=>g(o,1600,1e3,r.id)),f=e.cat==="web"?t.visitWeb:t.visitOn.replace("{label}",r.label);return`
  <!-- 頂部大標題区（Editions 詳細ページの Hero に準拠） -->
  <header class="px-5 pb-10 pt-28 md:px-10 md:pb-14 md:pt-40">
    <p class="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-muted" data-reveal>
      <span class="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-paper">${x(r.id,"h-3 w-3")}</span>
      ${r.label} · ${r.en} · ${e.year}
    </p>
    <h1 class="mt-6 font-display text-[clamp(2.6rem,9.5vw,8.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em]" data-reveal>
      ${e.title}
    </h1>
    <p class="mt-6 max-w-2xl font-serif text-xl font-light italic leading-snug text-ink-soft md:text-2xl" data-reveal>
      ${e.desc}
    </p>
    ${e.metrics?`<p class="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink" data-reveal><span class="text-accent">■</span> ${e.metrics}</p>`:""}
    <div class="mt-8 flex flex-wrap items-center gap-4" data-reveal>
      <a href="${e.platformUrl}" target="_blank" rel="noopener noreferrer" data-magnetic
         class="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-black">
        ${x(r.id,"h-3.5 w-3.5")}
        ${f}
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <a href="works.html" class="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink">
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M11 3L3 11M3 11H10M3 11V4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        ${t.backToIndex}
      </a>
    </div>
  </header>

  ${v([{id:"overview",index:"01",label:t.chapters.overview},{id:"process",index:"02",label:t.chapters.process},{id:"outcome",index:"03",label:t.chapters.outcome},{id:"notes",index:"04",label:"Notes"},{id:"next",index:"05",label:t.chapters.next}])}

  ${i({id:"overview",index:"01",title:t.chapters.overview,body:`
      ${l([e.paragraphs[0]])}
      ${d(m[0],`${e.title} — ${t.figs.cover}`,`${r.label} / Fig.01 — ${t.figs.cover}`)}
    `})}

  ${i({id:"process",index:"02",title:t.chapters.process,body:`
      ${l([e.paragraphs[1]])}
      ${d(m[1],`${e.title} — ${t.figs.process}`,`${r.label} / Fig.02 — ${t.figs.process}`)}
    `})}

  ${i({id:"outcome",index:"03",title:t.chapters.outcome,body:`
      ${l(e.paragraphs.slice(2))}
      ${d(g(e.coverSeed,1600,900,r.id),`${e.title} — ${t.figs.final}`,`${r.label} / Fig.03 — ${t.figs.final}`)}
    `})}

  ${i({id:"notes",index:"04",title:"Notes",body:`
      ${b([`${t.notes.client}：${e.client}`,`${t.notes.role}：${e.role}`,`${t.notes.yearPlatform}：${e.year} · ${e.platform}`,`${t.notes.category}：${r.label} / ${r.en} —— ${t.notes.categoryNote}：${c.map(o=>o.label).join(" / ")}`])}
      <dl class="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
        ${s(t.notes.client,e.client)}
        ${s(t.notes.role,e.role)}
        ${s(t.notes.year,e.year)}
        ${s(t.notes.platform,e.platform)}
      </dl>
    `})}

  <!-- 下一项目（Editions 底部导航に準拠） -->
  <a id="next" href="project.html?id=${p.id}" data-cursor="view"
     class="group block border-t border-line px-5 py-14 transition-colors duration-500 hover:bg-ink hover:text-paper md:px-10 md:py-20">
    <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-paper/60">05 / ${t.nextProject}</p>
    <div class="mt-4 flex items-end justify-between gap-6">
      <span class="font-display text-[clamp(1.9rem,5.5vw,4.5rem)] font-extrabold leading-none tracking-[-0.03em] transition-transform duration-500 ease-paper group-hover:translate-x-2 md:group-hover:translate-x-4">
        ${p.title}
      </span>
      <span class="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-paper/40 md:h-14 md:w-14">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
  </a>`}const y=new URLSearchParams(window.location.search).get("id");$("works",[w(y)]);
