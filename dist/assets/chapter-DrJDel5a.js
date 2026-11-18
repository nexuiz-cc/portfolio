import{t as n}from"./page-gyTyqmWo.js";function o(e){const a=e.map(t=>`
      <a href="#${t.id}"
         class="group flex shrink-0 items-baseline gap-2 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-ink">
        <span class="text-[9px] tracking-[0.2em] text-accent">${t.index}</span>
        <span class="u-sweep">${t.label}</span>
      </a>`).join("");return`
  <nav aria-label="${n.aria.toc}"
       class="sticky top-16 z-30 border-y border-line bg-paper/95 px-5 backdrop-blur md:top-20 md:px-10">
    <div class="flex gap-6 overflow-x-auto md:gap-10">${a}</div>
  </nav>`}function i({id:e,index:a,title:t,body:s}){return`
  <section id="${e}" class="grid scroll-mt-36 grid-cols-1 gap-8 border-t border-line px-5 py-14 md:grid-cols-12 md:gap-10 md:px-10 md:py-20" data-reveal>
    <div class="md:col-span-4 lg:col-span-3">
      <p class="font-mono text-[11px] font-bold tracking-[0.24em] text-accent">${a}</p>
      <h2 class="mt-3 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] md:text-[2rem]">${t}</h2>
    </div>
    <div class="md:col-span-8 lg:col-span-8">${s}</div>
  </section>`}function p(e,a,t){return`
  <figure class="mt-8">
    <img src="${e}" alt="${a}" loading="lazy" decoding="async"
         width="1600" height="1000" class="aspect-[16/10] w-full object-cover" />
    ${t?`<figcaption class="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">${t}</figcaption>`:""}
  </figure>`}function c(e){return`
  <div class="border-t border-line pt-6">
    <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">Notes</p>
    <ol class="mt-5 space-y-3">
      ${e.map((a,t)=>`
        <li class="flex items-baseline gap-4 text-[13px] leading-[1.7] text-ink-soft">
          <span class="shrink-0 font-mono text-[10px] tracking-[0.14em] text-muted">[${t+1}]</span>
          <span>${a}</span>
        </li>`).join("")}
    </ol>
  </div>`}function l(e){return e.map(a=>`<p class="max-w-[62ch] text-[15px] leading-[1.85] text-ink-soft [&:not(:first-child)]:mt-5">${a}</p>`).join("")}export{i as a,l as b,p as c,c as d,o as r};
