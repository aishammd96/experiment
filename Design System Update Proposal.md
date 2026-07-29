# Design System Update Proposal
Source: changes made across Home Page.html, About.html, Resume.html, Kindex.html. Proposed additions/changes to `AishaMomandDesignSystem_ae6873`, with the actual code pulled from the pages.

## 1. New component: Nav (sticky site header)
No `Nav` component exists in `components/navigation/` today (only `Link`, `Footer`). All four pages now share one hand-built header — promote it to a real component.

**Mobile breakpoint hook (raised from ~768px to 1000px):**
```jsx
function useIsMobile() {
  const [mobile, setMobile] = React.useState(window.innerWidth < 1000);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 1000px)");
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return mobile;
}
```

**Mobile navbar markup (sticky, frosted glass, hamburger):**
```jsx
function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy-900)" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line>
    </svg>
  );
}

function Navbar({ mobile }) {
  const [open, setOpen] = React.useState(false);
  if (mobile) {
    return (
      <div className="navbar-noise" style={{position:"sticky",top:0,zIndex:10,background:"color-mix(in oklch, var(--surface-page) 70%, transparent)",backdropFilter:"blur(16px) saturate(160%)",WebkitBackdropFilter:"blur(16px) saturate(160%)",boxShadow:"var(--shadow-navbar)",overflow:"hidden"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px"}}>
          <a href="Home Page.html" className="logo-link"><Logo size={36} /></a>
          <button aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",padding:10,cursor:"pointer",minHeight:44,minWidth:44,display:"inline-flex",alignItems:"center",justifyContent:"center"}}><MenuIcon /></button>
        </div>
        {open && (
          <nav style={{display:"flex",flexDirection:"column",padding:"0 20px 16px",gap:4}}>
            <Link active>Work</Link>
            <Link href="About.html">About</Link>
            <Link href="Resume.html">Resume</Link>
            <Link href="https://www.linkedin.com/in/aisha-momand/" target="_blank" rel="noopener">LinkedIn</Link>
            <div style={{paddingTop:8}}><Button variant="primary" size="sm" onClick={()=>{window.location.href="mailto:aisha.momand1@gmail.com"}}>Contact</Button></div>
          </nav>
        )}
      </div>
    );
  }
  // desktop branch: same sticky/noise/blur wrapper, Logo size={46}, inline <nav> — no hamburger
}
```

**Noise-grain texture** — new visual primitive, apply as a class on any frosted surface:
```css
.navbar-noise::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
```

**Custom cursor (dot + ring, mouse-follow)** — sitewide, non-touch only:
```html
<div class="cursor-dot"></div>
<div class="cursor-ring"></div>
<script>(function(){
  const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
  if(!dot||!ring||window.matchMedia('(hover:none)').matches)return;
  let rx=0,ry=0,tx=0,ty=0;
  window.addEventListener('mousemove',e=>{
    dot.classList.add('active');ring.classList.add('active');
    dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';
    tx=e.clientX;ty=e.clientY;
    const el=document.elementFromPoint(e.clientX,e.clientY);
    const hovering=!!(el&&el.closest('a,button'));
    dot.classList.toggle('hovering',hovering);ring.classList.toggle('hovering',hovering);
  });
  function loop(){rx+=(tx-rx)*0.18;ry+=(ty-ry)*0.18;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);}
  loop();
})();</script>
```
Links use coral hover via existing tokens: `a{color:var(--text-accent-on-light)} a:hover{color:var(--coral-600)}`.

## 2. Logo size update
Desktop: 40px → **46px** (`<Logo size={46} />`). Mobile: 32px → **36px** (`<Logo size={36} />`). Recommend adding these as named presets (`sm=36`, `md=46`) to `Logo.d.ts`.

## 3. New utility: scroll reveal
```jsx
function useReveal() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
```
Paired with a `.reveal` / `.reveal.in` CSS pair (fade + 48px translate-up + subtle scale, `transitionDelay: i*80ms` for stagger). Used on Home Page (work grid), Kindex, About.html.

## 4. Kindex: progress indicator moved into nav
Full working component — sticky horizontal bar with italic section label, `n/8` counter, jump-to dropdown menu, and a scroll-progress fill track:
```jsx
const SECTIONS = [["01","The Problem / The Solution","sec-01"], /* … 02–07 … */];

function TableOfContents() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  React.useEffect(()=>{const onDoc=e=>{if(!e.target.closest(".toc-bar-inner"))setOpen(false);};document.addEventListener("click",onDoc);return()=>document.removeEventListener("click",onDoc);},[]);
  React.useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
      const positions = SECTIONS.map(([,,id]) => { const el = document.getElementById(id); return el ? el.getBoundingClientRect().top : Infinity; });
      let idx = 0;
      positions.forEach((top, i) => { if (top - 220 <= 0) idx = i; });
      setActiveIdx(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="toc-bar">
      <div className="toc-bar-inner">
        <button className="toc-bar-trigger" aria-expanded={open} aria-haspopup="true" onClick={()=>setOpen(o=>!o)}>
          <span className="toc-bar-num">{SECTIONS[activeIdx][0]}</span>
          <span className="toc-bar-label">{SECTIONS[activeIdx][1]}</span>
          <span className="toc-bar-chev" aria-hidden="true"></span>
        </button>
        <span className="toc-bar-count">{activeIdx+1}/{SECTIONS.length}</span>
        {open && (
          <div className="toc-menu" role="menu">
            {SECTIONS.map(([num,label,id],i)=>(
              <a key={id} href={`#${id}`} role="menuitem" className={`toc-menu-item${i===activeIdx?" active":""}`} onClick={()=>setOpen(false)}>
                <span className="toc-menu-num">{num}</span><span>{label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="toc-bar-track" role="progressbar" aria-label="Reading progress" aria-valuenow={Math.round(progress*100)} aria-valuemin={0} aria-valuemax={100}>
        <div className="toc-bar-fill" style={{width:`${progress*100}%`}}></div>
      </div>
    </div>
  );
}
```
Recommend as a new `SectionNav` component in `components/navigation/` — reusable for future long-form case studies.

## 5. Kindex: TOC hover-underline
Static underlines removed from the inline "On This Page" links; hover-underline added instead, consistent with `Link`'s existing hover/focus underline parity rule. No token change needed.

## 6. About.html: Artwork carousel
No lightbox was actually built (correcting earlier note) — clicking an image does nothing; it's prev/next arrows + dot pagination only:
```jsx
const ARTWORKS = ["gallery-2","gallery-1","gallery-3","gallery-4"];
function ArtworkCarousel() {
  const [i, setI] = React.useState(0);
  const go = (d) => setI((i + d + ARTWORKS.length) % ARTWORKS.length);
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
      <div style={{position:"relative",width:"min(520px,100%)",maxWidth:"100%",aspectRatio:"4/5",borderRadius:"var(--radius-card)",overflow:"hidden",border:"0.56px solid rgba(255,255,255,0.4)",boxShadow:"0 16px 32px rgba(20,30,50,0.12)"}}
        onMouseEnter={e=>e.currentTarget.querySelectorAll(".carousel-arrow").forEach(b=>b.style.opacity=1)}
        onMouseLeave={e=>e.currentTarget.querySelectorAll(".carousel-arrow").forEach(b=>b.style.opacity=0)}>
        <image-slot key={ARTWORKS[i]} id={ARTWORKS[i]} shape="rounded" radius="var(--radius-card)" placeholder="Drop artwork" src={`assets/${ARTWORKS[i]}.png`}></image-slot>
        <button aria-label="Previous artwork" onClick={()=>go(-1)} className="carousel-arrow" style={{position:"absolute",left:0,top:0,bottom:0,width:64,border:"none",background:"linear-gradient(to right, rgba(20,30,50,0.16), transparent)",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",paddingLeft:14,fontSize:22,opacity:0,transition:"opacity 200ms ease"}}>‹</button>
        <button aria-label="Next artwork" onClick={()=>go(1)} className="carousel-arrow" style={{position:"absolute",right:0,top:0,bottom:0,width:64,border:"none",background:"linear-gradient(to left, rgba(20,30,50,0.16), transparent)",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:14,fontSize:22,opacity:0,transition:"opacity 200ms ease"}}>›</button>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {ARTWORKS.map((id,idx)=>(
          <button key={id} aria-label={`Go to artwork ${idx+1}`} onClick={()=>setI(idx)} style={{width:idx===i?20:8,height:8,borderRadius:4,border:"none",padding:0,cursor:"pointer",background:idx===i?"var(--text-accent-on-light)":"var(--border-divider)",transition:"width 240ms cubic-bezier(0.16,1,0.3,1),background 240ms ease"}}></button>
        ))}
      </div>
    </div>
  );
}
```
Recommend as `components/core/Carousel.jsx` (arrows + dots, hover-reveal controls), styled with existing radii/border tokens. Drop "Lightbox" from scope unless click-to-expand is still wanted.

## 6b. Kindex: lightbox (this one's real)
Kindex's "Before, During & After" artifacts do open in a lightbox — a portal-rendered modal dialog:
```jsx
{lightbox && ReactDOM.createPortal(
  <div role="dialog" aria-modal="true" aria-label="Artifact viewer" style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(20,20,24,0.92)",display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setLightbox(null)}>
    <button aria-label="Close" onClick={()=>setLightbox(null)} style={{position:"absolute",top:24,right:28,width:44,height:44,borderRadius:"50%",border:"none",background:"rgba(255,255,255,0.12)"}}>×</button>
    <img src={lightbox} alt="" style={{maxWidth:"92vw",maxHeight:"88vh",borderRadius:"var(--radius-card)",boxShadow:"0 24px 60px rgba(0,0,0,0.4)"}} onClick={(e)=>e.stopPropagation()} />
  </div>, document.body
)}
```
Recommend pairing this with the Carousel recommendation above as `components/core/Lightbox.jsx` (overlay, click-outside + close button, `role="dialog"`).

## 7. Colors & fonts — verified unchanged
Diffed every hex/font-family literal across all four pages against `tokens/colors.css` / `tokens/typography.css`:
- All colors reference semantic tokens (`var(--navy-900)`, `var(--coral-600)`, `var(--text-accent-on-light)`, etc.) — no new hex values or off-palette colors introduced.
- Fonts are Inter (body/labels) + Cormorant Garamond (display/hero) throughout — matches system spec exactly, no third family added.
- Minor note: a few inline styles hardcode CSS fallback values for `--text-muted` (e.g. `color:var(--text-muted,#62748e)`) that no longer match the token's current resolved value (`#5c6470`). Harmless — the fallback only fires if the var were undefined, which it isn't — but worth cleaning up for hygiene.
No color or type changes are needed in the design system as a result of this work.

## 8. Content additions (not component changes)
- About.html: custom copy — structure-first design, "AI as acceleration, not shortcut."
- Resume.html: condensed to one page, achievement-focused bullets, PDF download action.
These are content/copy decisions, not system changes — flagged for awareness only.

## Recommended next steps for the design system
1. Add `Nav` to `components/navigation/` (sticky header + mobile breakpoint + noise texture; cursor as an optional sitewide script).
2. Add `--breakpoint-mobile-nav: 1000px` token.
3. Update `Logo` size presets (36 / 46).
4. Add `reveal` motion utility (hook + `.reveal`/`.reveal.in` CSS) to `tokens/motion.css`.
5. Add `SectionNav` (progress-in-nav) as a navigation component.
6. Add `Carousel` + `Lightbox` to `components/core/` (Lightbox pattern already proven in Kindex; reuse it, don't rebuild).
7. No color/font token changes needed — verified no drift.
