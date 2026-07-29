import React from "react";
import { Logo } from "../brand/Logo.jsx";
import { Link } from "./Link.jsx";
import { Button } from "../core/Button.jsx";

const PAGES = [
  { key: "work", label: "Work", href: "Home Page.html" },
  { key: "about", label: "About", href: "About.html" },
  { key: "resume", label: "Resume", href: "Resume.html" },
];
const noiseBg = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")';

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy-900)" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line></svg>
  );
}

/** Internal — mirrors the mobile-nav breakpoint used across all pages (1000px). */
function useIsMobile(breakpoint = 1000) {
  const [mobile, setMobile] = React.useState(() => typeof window !== "undefined" && window.innerWidth < breakpoint);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = () => setMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);
  return mobile;
}

/**
 * Sticky site header. Owns its own responsive behavior (1000px breakpoint) —
 * pages only declare which link is current via `activePage`, no per-page
 * nav markup or mobile-state plumbing needed.
 */
export function Navbar({ activePage = "work", contactEmail = "aisha.momand1@gmail.com", logoHref = "Home Page.html" }) {
  const mobile = useIsMobile(1000);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => { if (!mobile) setOpen(false); }, [mobile]);

  const glass = { background: "var(--surface-navbar-glass)", backdropFilter: "blur(16px) saturate(160%)", WebkitBackdropFilter: "blur(16px) saturate(160%)", boxShadow: "var(--shadow-navbar)" };
  const noiseLayer = <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.035, backgroundImage: noiseBg }}></div>;
  const links = PAGES.map(p => <Link key={p.key} href={p.href} active={activePage === p.key}>{p.label}</Link>);

  if (mobile) {
    return (
      <div style={{ ...glass, position: "sticky", top: 0, zIndex: 10, overflow: "hidden" }}>
        {noiseLayer}
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
          <a href={logoHref} style={{ textDecoration: "none" }}><Logo size={36} /></a>
          <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", padding: 10, cursor: "pointer", minHeight: 44, minWidth: 44, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><MenuIcon /></button>
        </div>
        {open && (
          <nav aria-label="Primary" style={{ position: "relative", display: "flex", flexDirection: "column", padding: "0 20px 16px", gap: 4 }}>
            {links}
            <Link href="https://www.linkedin.com/in/aisha-momand/" target="_blank" rel="noopener">LinkedIn</Link>
            <div style={{ paddingTop: 8 }}><Button variant="primary" size="sm" onClick={() => { window.location.href = `mailto:${contactEmail}`; }}>Contact</Button></div>
          </nav>
        )}
      </div>
    );
  }
  return (
    <div style={{ ...glass, position: "sticky", top: 0, zIndex: 10, overflow: "hidden" }}>
      {noiseLayer}
      <div style={{ position: "relative", maxWidth: "var(--container-max)", margin: "0 auto", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 80px" }}>
        <a href={logoHref} style={{ textDecoration: "none" }}><Logo size={46} /></a>
        <nav aria-label="Primary" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {links}
          <Link href="https://www.linkedin.com/in/aisha-momand/" target="_blank" rel="noopener">LinkedIn</Link>
          <Button variant="primary" size="sm" onClick={() => { window.location.href = `mailto:${contactEmail}`; }}>Contact</Button>
        </nav>
      </div>
    </div>
  );
}
