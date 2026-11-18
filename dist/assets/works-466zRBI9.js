import{t as a,a as d,p as i,c as o,i as c}from"./page-gyTyqmWo.js";import{i as s}from"./icons-DWAe6HI_.js";function l(e){return i.filter(t=>t.cat===e).length}function m(e){const t=o.find(n=>n.id===e.cat)??o[0],r=String(i.indexOf(e)+1).padStart(2,"0");return`
  <a href="project.html?id=${e.id}" data-cursor="view" data-category="${e.cat}"
     class="work-row group flex w-full items-center gap-3 border-b border-line px-1 py-4 transition-colors duration-300 ease-paper md:gap-5 md:py-5">
    <img src="${c(e.coverSeed,192,144,e.cat)}" alt="" width="192" height="144" loading="lazy"
         class="aspect-[4/3] w-16 flex-shrink-0 bg-fog object-cover md:w-24" />
    <span class="min-w-0 flex-1">
      <span class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted md:text-[11px]">
        <span class="text-ink">${r}</span>
        ${s(t.id,"h-3.5 w-3.5")} ${t.label}
        <span class="hidden md:inline">· ${e.year}</span>
      </span>
      <span class="mt-1 block font-display text-xl font-extrabold leading-tight tracking-[-0.02em] transition-transform duration-500 ease-paper group-hover:translate-x-2 md:text-3xl">${e.title}</span>
    </span>
    <span class="work-arrow inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-line px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:px-4">
      <span class="hidden md:inline">${a.hero.view}</span>${s("arrow","h-3 w-3")}
    </span>
  </a>`}function b(){const e=(t,r,n,p)=>`
    <button type="button" data-filter="${t}" aria-pressed="false"
      class="filter-pill inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300">
      ${p?s(t,"h-3.5 w-3.5"):""}${r}
      <span class="text-muted">(${String(n).padStart(2,"0")})</span>
    </button>`;return`
  <div class="flex flex-wrap gap-2 pb-1" data-filterbar data-reveal role="group" aria-label="${a.aria.filter}">
    ${e("all",a.works.filterAll,i.length,!1)}
    ${o.map(t=>e(t.id,t.label,l(t.id),!0)).join("")}
  </div>`}function x(e,t){return`
    <div class="flex flex-wrap items-end justify-between gap-4 border-t border-line px-1 pb-6 pt-8 md:pb-8 md:pt-10" data-reveal>
      <div class="flex items-center gap-4">
        <span class="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink">${s(e.id,"h-5 w-5")}</span>
        <div>
          <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">${String(t+1).padStart(2,"0")} / ${e.en}</p>
          <h3 class="mt-1 font-display text-2xl font-extrabold tracking-[-0.02em] md:text-3xl">${e.label}</h3>
        </div>
      </div>
      <a href="works.html?cat=${e.id}" class="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
        <span class="text-muted">(${String(l(e.id)).padStart(2,"0")})</span>
        <span class="u-sweep">${a.works.viewAll}</span>
        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:rotate-45">${s("arrow","h-3 w-3")}</span>
      </a>
    </div>`}function f(){return o.map((e,t)=>{const r=i.filter(n=>n.cat===e.id);return`
    <section data-cat-group="${e.id}">
      ${x(e,t)}
      <div class="border-t border-line">
        ${r.map(m).join("")}
      </div>
    </section>`}).join("")}function w(e){return`
  <section class="px-5 py-24 md:px-10 md:py-36">
    <div class="mb-12 md:mb-16" data-reveal>
      <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"><span class="font-bold text-accent">${e}</span> / ${a.works.eyebrow}</p>
      <div class="mt-4 flex flex-wrap items-end justify-between gap-6">
        <h2 class="font-display text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          ${d("works")}
          <sup class="ml-2 align-super font-mono text-[0.22em] font-normal tracking-[0.2em] text-muted">(${String(i.length).padStart(2,"0")})</sup>
        </h2>
        <p class="max-w-xs text-[13px] leading-relaxed text-ink-soft">${a.works.desc}</p>
      </div>
    </div>
    ${f()}
  </section>`}export{b as a,f as b,w as r};
