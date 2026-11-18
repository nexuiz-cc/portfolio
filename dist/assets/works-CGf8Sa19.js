import{t as g,p as h,e as w,c as x}from"./page-gyTyqmWo.js";import{a as y,b as k}from"./works-466zRBI9.js";import"./icons-DWAe6HI_.js";const l=g.worksPage,v=`
  <section class="px-5 pt-28 md:px-10 md:pt-40">
    <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted" data-reveal>${l.eyebrow}</p>
    <div class="mt-4 flex flex-wrap items-end justify-between gap-6 pb-10 md:pb-14">
      <h1 class="font-display text-[clamp(2.8rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.03em]" data-reveal style="--reveal-delay: 80ms">
        ${l.title}
        <sup id="works-count" class="ml-2 align-super font-mono text-[0.2em] font-normal tracking-[0.2em] text-muted">(${String(h.length).padStart(2,"0")})</sup>
      </h1>
      <p class="max-w-xs text-sm leading-relaxed text-ink-soft" data-reveal style="--reveal-delay: 160ms">
        ${l.sub}
      </p>
    </div>
    ${y()}
  </section>`;w("works",[v,`<section class="px-5 pb-24 pt-4 md:px-10 md:pb-36" data-work-list>${k()}</section>`]);function b(){const r=Array.from(document.querySelectorAll("[data-filter]")),n=Array.from(document.querySelectorAll("[data-cat-group]")),c=document.getElementById("works-count");if(r.length===0||n.length===0)return;const f=["all",...x.map(t=>t.id)],u=!window.matchMedia("(prefers-reduced-motion: reduce)").matches,i=(t,a)=>{let m=0;n.forEach(e=>{const s=t==="all"||e.dataset.catGroup===t;if(e.classList.toggle("row-hide",!s),!s)return;const p=Array.from(e.querySelectorAll(".work-row"));m+=p.length,a&&p.forEach(o=>{o.classList.remove("row-enter"),o.offsetWidth,o.classList.add("row-enter")})}),r.forEach(e=>{const s=e.dataset.filter===t;e.classList.toggle("is-active",s),e.setAttribute("aria-pressed",String(s))}),c&&(c.textContent=`(${String(m).padStart(2,"0")})`)};r.forEach(t=>t.addEventListener("click",()=>{const a=t.dataset.filter??"all";i(a,u),history.replaceState(null,"",a==="all"?"works.html":`works.html?cat=${a}`)}));const d=new URLSearchParams(location.search).get("cat")??"all";i(f.includes(d)?d:"all",!1)}b();
