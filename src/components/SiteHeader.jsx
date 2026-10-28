import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Search, Menu, X, Download, Github, Linkedin, ArrowRight, Home, Layers, UserRound, BriefcaseBusiness, FlaskConical, Mail, Sparkles } from "lucide-react";
import { profile } from "../data/portfolio";
import { selectedProjects, moreProjects } from "../data/work";

const descriptions = {
  home: ["Start here", Home], projects: ["Selected builds & case studies", Layers],
  about: ["The person behind the projects", UserRound], skills: ["Tools I put into practice", Sparkles],
  experience: ["My work & learning journey", BriefcaseBusiness], lab: ["Smaller ideas, deeper experiments", FlaskConical],
  contact: ["A project, an opportunity, a hello", Mail],
};
const projects = [...selectedProjects, ...moreProjects];
const shortcutLabel = /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ K" : "Ctrl K";

export default function SiteHeader({ links, activeSection, disabled, onPreview }) {
  const [panel, setPanel] = useState(null);
  const [search, setSearch] = useState("");
  const dialogRef = useRef(null);
  const searchRef = useRef(null);
  const actionRef = useRef(null);
  const triggerRef = useRef(null);
  const overflowRef = useRef(null);
  const isOpen = panel !== null;
  const term = search.trim().toLowerCase();
  const sectionResults = links.filter(([label, id]) => !term || `${label} ${descriptions[id][0]}`.toLowerCase().includes(term));
  const projectResults = projects.filter(p => term && `${p.title} ${p.description} ${p.category} ${(p.categories || []).join(" ")} ${p.tags.join(" ")}`.toLowerCase().includes(term));

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    dialog.showModal();
    overflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { dialog.close(); releaseScroll(); };
  }, [isOpen]);
  useEffect(() => {
    if (panel === "search") searchRef.current?.focus();
  }, [panel]);
  useEffect(() => {
    const shortcut = event => {
      if (disabled || document.querySelector(".project-preview-dialog[open]")) return;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        triggerRef.current?.focus({ preventScroll: true });
        setPanel("search");
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [disabled]);
  useEffect(() => {
    const wide = matchMedia("(min-width: 1121px)");
    const sync = () => { if (wide.matches && panel === "menu") dialogRef.current.close(); };
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  }, [panel]);
  function releaseScroll() {
    if (overflowRef.current !== null) {
      document.body.style.overflow = overflowRef.current;
      overflowRef.current = null;
    }
  }
  function dialogKey(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      close();
    }
    if (event.key === "Tab") {
      const items = [...dialogRef.current.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),[tabindex="0"]')].filter(el => el.getClientRects().length);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }
  function close() { dialogRef.current.close(); }
  function closed() {
    releaseScroll();
    setPanel(null);
    setSearch("");
    const action = actionRef.current;
    actionRef.current = null;
    if (action) requestAnimationFrame(action);
  }
  function goTo(event, id) {
    event.preventDefault();
    actionRef.current = () => {
      history.pushState(null, "", `#${id}`);
      const section = document.getElementById(id);
      section?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
      const heading = section?.querySelector("h1,h2,h3");
      if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus({ preventScroll: true }); }
    };
    close();
  }
  function preview(project) {
    actionRef.current = () => onPreview(project);
    close();
  }
  return <>
    <header className="portfolio-header">
      <div className="header-shell">
        <a className="header-brand" href="#home" aria-label="Om Solanki home"><span className="brand-mark">os<span>.</span></span><span className="brand-name">Om Solanki<small>CODE & CURIOSITY</small></span></a>
        <nav className="desktop-nav" id="main-nav" aria-label="Main navigation">
          {links.filter(([, id]) => id !== "home" && id !== "contact").map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <button ref={triggerRef} className="header-search" aria-label="Search portfolio" aria-haspopup="dialog" onClick={() => setPanel("search")}><Search size={17} /><span>Search</span><kbd>{shortcutLabel}</kbd></button>
          <a className="header-contact" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
          <button className="header-menu" aria-label="Open navigation" aria-expanded={panel === "menu"} aria-controls="mobile-nav" aria-haspopup="dialog" onClick={() => setPanel("menu")}><Menu size={21} /><span>Menu</span></button>
        </div>
      </div>
    </header>
    <dialog className={`header-dialog ${panel === "search" ? "search-dialog" : "menu-dialog"}`} ref={dialogRef} aria-labelledby="header-dialog-title" onClose={closed} onKeyDown={dialogKey} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="header-dialog-inner">
        <div className="dialog-topline"><span className="eyebrow">OM SOLANKI / PORTFOLIO</span><button className="header-close" aria-label={panel === "search" ? "Close search" : "Close navigation"} onClick={close}><X size={21} /></button></div>
        {panel === "menu" ? <>
          <div className="menu-intro"><h2 id="header-dialog-title">A little curiosity.<br /><em>A lot to explore.</em></h2><p>Projects, experiments, and the story behind them.</p></div>
          <nav id="mobile-nav" className="mobile-navigation" aria-label="Mobile navigation">
            {links.map(([label, id]) => { const [description, Icon] = descriptions[id]; return <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={event => goTo(event,id)}><Icon size={19} aria-hidden="true" /><span>{label}<small>{description}</small></span><ArrowUpRight size={15} aria-hidden="true" /></a>; })}
          </nav>
          <div className="menu-shortcuts"><a href={profile.resume} target="_blank" rel="noopener noreferrer"><Download size={17} /> Read my résumé <ArrowUpRight size={15} /></a><div><a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={19} /></a><a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a></div></div>
          <p className="menu-signoff">Based in Bengaluru. Always learning, always building.</p>
        </> : <>
          <h2 id="header-dialog-title" className="search-title">Find your way around.</h2>
          <label className="command-input"><Search size={20} aria-hidden="true" /><span className="sr-only">Search portfolio sections and projects</span><input ref={searchRef} type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Try computer vision, résumé, or a project…" /></label>
          <div className="command-results" aria-label="Search results">
            {sectionResults.length > 0 && <div><p className="command-group">EXPLORE</p>{sectionResults.map(([label,id]) => <a key={id} href={`#${id}`} onClick={event=>goTo(event,id)}><span>{label}<small>{descriptions[id][0]}</small></span><ArrowRight size={17} /></a>)}</div>}
            {projectResults.length > 0 && <div><p className="command-group">PROJECTS</p>{projectResults.map(p => p.image ? <button key={p.title} onClick={()=>preview(p)}><span>{p.title}<small>{p.category} · Preview project</small></span><ArrowUpRight size={17} /></button> : <a key={p.title} href={p.github} target="_blank" rel="noopener noreferrer"><span>{p.title}<small>{p.category} · Open source on GitHub</small></span><ArrowUpRight size={17} /></a>)}</div>}
            {(!term || /^(r[eé]sum[eé]?|cv|download)$/.test(term)) && <div><p className="command-group">QUICK LINK</p><a href={profile.resume} target="_blank" rel="noopener noreferrer"><span>Résumé<small>Education, experience, and skills</small></span><Download size={17} /></a></div>}
            {sectionResults.length === 0 && projectResults.length === 0 && !/^(r[eé]sum[eé]?|cv|download)$/.test(term) && <p className="command-empty">No matches yet. Try “Python”, “projects”, or “contact”.</p>}
          </div>
          <p className="command-hint"><span>Navigate with Tab · Select with Enter</span><span>Esc to close</span></p>
        </>}
      </div>
    </dialog>
  </>;
}
