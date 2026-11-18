import{t as s,k as d,s as c,e as p}from"./page-gyTyqmWo.js";import{r as m,a as l}from"./chapter-DrJDel5a.js";function x(){const e=s.contactPage,{brand:a}=c,r=`
    <div class="mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-2 border border-line px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft" data-reveal style="--reveal-delay: 240ms">
      <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent"></span>
      <span class="font-bold text-ink">${s.nav.availability}</span>
      <span class="text-muted">·</span>
      <span>${s.nav.replyNote}</span>
    </div>`,i=e.steps.map((t,n)=>`
      <div class="relative border-t border-line pt-6 md:border-t-0 md:border-l md:pl-8 md:pt-0 md:first:border-l-0 md:first:pl-0" data-reveal style="--reveal-delay: ${n*90}ms">
        <p class="font-mono text-[11px] font-bold tracking-[0.24em] text-accent">0${n+1}</p>
        <h3 class="mt-3 font-display text-xl font-extrabold tracking-[-0.02em] md:text-2xl">${t.name}</h3>
        <p class="mt-3 text-sm leading-[1.8] text-ink-soft">${t.desc}</p>
      </div>`).join(""),o=d.map(t=>`
      <a href="${t.url}" target="_blank" rel="noopener noreferrer" data-magnetic
         class="group flex items-center justify-between border-t border-line py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft transition-colors duration-300 hover:text-ink">
        <span>${t.label}</span>
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink">
          <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>`).join("");return`
  <!-- Hero：大見出し + 受付ステータス -->
  <header class="px-5 pb-10 pt-14 md:px-10 md:pb-16 md:pt-24">
    <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted" data-reveal>${e.eyebrow}</p>
    <h1 class="mt-5 font-display text-[clamp(2.9rem,9vw,8.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]" data-reveal style="--reveal-delay: 80ms">
      ${e.titleA}<br /><span class="italic">${e.titleB}</span><span class="text-accent">.</span>
    </h1>
    <p class="mt-5 max-w-md font-serif text-[clamp(1.05rem,2vw,1.4rem)] font-light italic leading-[1.5] text-ink-soft" data-reveal style="--reveal-delay: 160ms">
      ${e.lede}
    </p>
    ${r}
  </header>

  ${m([{id:"message",index:"01",label:e.toc.message},{id:"flow",index:"02",label:e.toc.flow},{id:"elsewhere",index:"03",label:e.toc.elsewhere}])}

  ${l({id:"message",index:"01",title:e.chapters.message,body:`
      <form id="contact-form" class="max-w-2xl" data-reveal novalidate>
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-8">
          <label class="block">
            <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">${e.fields.name} *</span>
            <input class="field" type="text" name="name" placeholder="${e.fields.namePh}" required maxlength="40" />
          </label>
          <label class="block">
            <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">${e.fields.email} *</span>
            <input class="field" type="email" name="email" placeholder="${e.fields.emailPh}" required maxlength="80" />
          </label>
        </div>
        <label class="mt-2 block">
          <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">${e.fields.message} *</span>
          <textarea class="field resize-none" name="message" rows="4" placeholder="${e.fields.messagePh}" required maxlength="2000"></textarea>
        </label>

        <div class="mt-8 flex flex-wrap items-center gap-5">
          <button type="submit" data-magnetic id="contact-submit"
                  class="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-paper transition-transform duration-300 ease-paper hover:scale-[1.03] active:scale-[0.98]">
            <span data-submit-label>${e.fields.submit}</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <p id="form-status" class="font-mono text-[11px] tracking-[0.14em] text-muted" role="status" aria-live="polite"></p>
        </div>
      </form>
    `})}

  ${l({id:"flow",index:"02",title:e.chapters.flow,body:`<div class="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">${i}</div>`})}

  ${l({id:"elsewhere",index:"03",title:e.chapters.elsewhere,body:`
      <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted" data-reveal>${e.orMail}</p>
      <a href="mailto:${a.email}" data-magnetic data-reveal
         class="mt-4 inline-block font-serif text-[clamp(1.4rem,3.6vw,2.5rem)] font-light italic tracking-tight text-ink underline decoration-line decoration-2 underline-offset-8 transition-colors duration-300 hover:decoration-accent">
        ${a.email}
      </a>

      <div class="mt-12 max-w-2xl" data-reveal>${o}</div>
      <div class="max-w-2xl border-t border-line"></div>

      <div class="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted" data-reveal>
        <span class="inline-block h-1.5 w-1.5 rounded-full animate-pulse bg-accent"></span>
        ${a.location}
      </div>
    `})}`}p("contact",['<div class="pt-16 md:pt-20"></div>',x()]);
