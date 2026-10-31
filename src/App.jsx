import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Github,
  Linkedin,
  ArrowRight,
  Search,
} from "lucide-react";
import {
  profile,
  education,
  experience,
  hackathons,
  contact,
} from "./data/portfolio";
import { selectedProjects, projectCategories } from "./data/work";
import { ProjectThumbnail, ProjectPreview } from "./components/ProjectMedia";
import { PortfolioOverview, ToolkitGrid, LabProjects, PortfolioQuestions } from "./components/PortfolioDepth";
import Intro from "./components/Intro";
import SiteHeader from "./components/SiteHeader";
import PortfolioHero from "./components/PortfolioHero";
import {
  CursorExperience,
} from "./components/MotionExperience";

const links = [
  ["Home", "home"],
  ["Work", "projects"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Lab", "lab"],
  ["Contact", "contact"],
];
function External({ href, children, ...props }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
function SectionTitle({ number, label, title, children }) {
  return (
    <div className="section-title">
      <div>
        <p className="eyebrow">
          {number} / {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
function ContactForm() {
  const [status, setStatus] = useState("idle");
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    const controller = new AbortController(),
      timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(contact.formEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            placeholder="Alex Taylor"
            maxLength={120}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="alex@example.com"
          />
        </label>
      </div>
      <label>
        What do you have in mind?
        <textarea
          name="message"
          required
          rows={4}
          maxLength={5000}
          placeholder="A project, an opportunity, or just a hello…"
        />
      </label>
      <button className="button primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
        <ArrowUpRight size={18} />
      </button>
      <p className={`form-status ${status}`} role="status">
        {status === "success"
          ? "Thanks! Your message has been sent."
          : status === "error"
            ? `Couldn't send your message. Please email ${profile.email} instead.`
            : ""}
      </p>
    </form>
  );
}
export default function App() {
  const [query, setQuery] = useState("");
  const [previewProject, setPreviewProject] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const replayRef = useRef(null);
  const replaying = useRef(false);
  const revealed = useRef(new WeakSet());
  const [motionPaused, setMotionPaused] = useState(() => {
    try {
      return localStorage.getItem("om-effects-paused") === "1";
    } catch {
      return false;
    }
  });
  const [filter, setFilter] = useState("All"),
    [introKey, setIntroKey] = useState(0);
  const [intro, setIntro] = useState(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return false;
    try {
      return !motionPaused && !sessionStorage.getItem("om-intro-spectra-seen");
    } catch {
      return true;
    }
  });
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const current = [...links].reverse().find(([, id]) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= 150;
      });
      setActiveSection(current?.[1] || "home");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  function finishIntro() {
    setIntro(false);
    try {
      sessionStorage.setItem("om-intro-spectra-seen", "1");
    } catch {
      /* Storage may be unavailable. */
    }
    requestAnimationFrame(() => {
      const target = replaying.current
        ? replayRef.current
        : document.getElementById("intro-heading");
      target?.focus({ preventScroll: true });
      replaying.current = false;
    });
  }
  useEffect(() => {
    if (
      intro ||
      motionPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const animations = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || revealed.current.has(entry.target))
            return;
          revealed.current.add(entry.target);
          if (entry.target.animate)
            animations.push(
              entry.target.animate(
                [
                  { opacity: 0, transform: "translateY(16px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                { duration: 550, easing: "cubic-bezier(.2,.7,.3,1)" },
              ),
            );
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        ".builder-intro,.builder-profile,.opening-projects,.section-title,.project-card,.about-grid,.timeline article,.focus-grid article,.toolkit-card,.lab-project,.portfolio-overview",
      )
      .forEach((el) => observer.observe(el));
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const stopMotion = () => {
      if (media.matches) {
        observer.disconnect();
        animations.forEach((animation) => animation.cancel());
      }
    };
    media.addEventListener("change", stopMotion);
    return () => {
      media.removeEventListener("change", stopMotion);
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [intro, filter, query, motionPaused]);
  function toggleMotion() {
    setMotionPaused((paused) => {
      const next = !paused;
      try {
        localStorage.setItem("om-effects-paused", next ? "1" : "0");
      } catch {}
      return next;
    });
  }
  const searchTerm = query.trim().toLowerCase();
  const shown = selectedProjects.filter((project) => {
    const matchesCategory = filter === "All" || project.categories.includes(filter);
    const searchable = [project.title, project.description, ...project.tags, ...project.categories].join(" ").toLowerCase();
    return matchesCategory && (!searchTerm || searchable.includes(searchTerm));
  });
  function resetProjects() {
    setFilter("All");
    setQuery("");
  }
  return (
    <>
      {intro && <Intro key={introKey} onDone={finishIntro} />}
      <CursorExperience enabled={!intro && !motionPaused && !previewProject} />
      <ProjectPreview project={previewProject} onClose={() => setPreviewProject(null)} />
      <div
        inert={intro ? "" : undefined}
        data-motion={motionPaused || intro ? "paused" : "active"}
      >
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader links={links} activeSection={activeSection} disabled={intro} onPreview={setPreviewProject} />
        <main id="main">
          <PortfolioHero onPreview={setPreviewProject} />
          <PortfolioOverview />
          <section id="projects" className="container section">
            <SectionTitle
              number="01"
              label="SELECTED WORK"
              title="Ideas, put into practice."
            >
              <p>
                A selection of research prototypes and practical applications.
                <br />
                Real interfaces. Open source. Built to explore.
              </p>
            </SectionTitle>
            <div className="project-toolbar">
              <div className="project-filters" role="group" aria-label="Filter projects">
                {projectCategories.map((category) => (
                  <button key={category} aria-pressed={filter === category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>
                    {category}<span aria-hidden="true">{category === "All" ? selectedProjects.length : selectedProjects.filter(p => p.categories.includes(category)).length}</span>
                  </button>
                ))}
              </div>
              <label className="project-search">
                <Search size={17} aria-hidden="true" />
                <span className="sr-only">Search projects</span>
                <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search a project or technology…" />
              </label>
            </div>
            <div className="project-results">
              <p role="status" aria-live="polite">{shown.length} of {selectedProjects.length} featured projects{filter !== "All" ? ` · ${filter}` : ""}</p>
              <span>Open a screenshot for a closer look <ArrowUpRight size={14} aria-hidden="true" /></span>
            </div>
            {shown.length === 0 && <div className="project-empty">
              <Search size={25} aria-hidden="true" /><h3>No projects found.</h3>
              <p>Try a different keyword or category, or explore the smaller experiments in the Lab.</p>
              <button className="button primary" onClick={resetProjects}>Reset search & filters</button>
            </div>}
            <div className="project-grid">
              {shown.map((p) => (
                <article className="project-card" key={p.title}>
                  <ProjectThumbnail project={p} onPreview={() => setPreviewProject(p)} />
                  <div className="project-meta">
                    <span>{p.category}</span>
                    <span className="project-availability"><i aria-hidden="true" />{p.art === "lung" ? "Interface demo" : p.demo ? "Demo available" : "Source available"}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p className="project-description">{p.description}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <External href={p.github} aria-label={`View ${p.title} source on GitHub`}>
                      <Github size={15} /> View source
                    </External>
                    {p.demo && (
                      <External href={p.demo} aria-label={`Explore ${p.title} demo`}>
                        Explore demo <ArrowUpRight size={15} />
                      </External>
                    )}
                  </div>
                  <details className="project-details">
                    <summary>
                      Inside the project <span aria-hidden="true">+</span>
                    </summary>
                    <dl>
                      {p.details.map((item) => (
                        <div key={item.label}>
                          <dt>{item.label}</dt>
                          <dd>{item.text}</dd>
                        </div>
                      ))}
                    </dl>
                  </details>
                </article>
              ))}
            </div>
            <div className="work-next">
              <p>There’s more on the workbench: smaller experiments, model studies, and algorithm practice.</p>
              <a className="text-link" href="#lab">Visit the lab <ArrowDown size={16} /></a>
            </div>
          </section>
          <section id="about" className="about-section">
            <div className="container section">
              <SectionTitle
                number="02"
                label="A LITTLE ABOUT ME"
                title="Learning by building."
              />
              <div className="about-grid">
                <div className="about-copy">
                  <p>
                    I’m <strong>Solanki Om Narendra</strong>, a Computer Science
                    and AI & ML undergraduate at Jain University, Bengaluru.
                  </p>
                  <p>
                    I enjoy the full journey: understanding a problem,
                    experimenting with a model, and building an interface that
                    makes the result useful. My projects span computer vision,
                    language-model evaluation, security tools, and everyday web
                    applications.
                  </p>
                  <p>
                    I’m looking for opportunities to learn with thoughtful teams
                    and contribute to practical machine learning and software
                    engineering projects.
                  </p>
                  <a
                    className="text-link"
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read my résumé <ArrowUpRight size={17} />
                  </a>
                  <div className="language-line">
                    English <span>·</span> Hindi <span>·</span> Gujarati
                  </div>
                </div>
                <div className="education-list">
                  <p className="eyebrow">EDUCATION</p>
                  {education.map((e) => (
                    <article key={e.institution}>
                      <span>{e.period || "HIGHER SECONDARY"}</span>
                      <h3>{e.degree}</h3>
                      <p>{e.institution}</p>
                      <small>{e.stat}</small>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section id="skills" className="container section toolkit-section">
            <SectionTitle number="03" label="TOOLS IN PRACTICE" title="The tools behind the work.">
              <p>From the first data experiment to the interface around it. Each area connects to something I’ve built.</p>
            </SectionTitle>
            <ToolkitGrid />
          </section>
          <section id="experience" className="container section">
            <SectionTitle
              number="04"
              label="THE JOURNEY"
              title="Experience & involvement."
            />
            <div className="timeline">
              {experience.map((e, i) => (
                <article key={e.org}>
                  <span className="timeline-number">0{i + 1}</span>
                  <div>
                    <h3>
                      {e.title} <span>· {e.org}</span>
                    </h3>
                    <p>{e.detail}</p>
                  </div>
                  <time>{e.period}</time>
                </article>
              ))}
            </div>
            <div className="hackathon-block">
              <p className="eyebrow">BEYOND THE CLASSROOM</p>
              <div>
                {hackathons.map((h) => (
                  <article key={h.title}>
                    <span>{h.period}</span>
                    <h3>{h.title}</h3>
                    <p>{h.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section id="lab" className="lab-section">
            <div className="container section">
              <SectionTitle number="05" label="THE EXPERIMENT LAB" title="Small questions. Deeper dives.">
                <p>More from the workbench: focused studies in data, models, and the fundamentals that hold everything together.</p>
              </SectionTitle>
              <LabProjects onPreview={setPreviewProject} />
              <External className="text-link all-repos" href={`${profile.socials.github}?tab=repositories`}>
                Browse all repositories <ArrowUpRight size={17} />
              </External>
            </div>
          </section>
          <section id="exploring" className="exploring-section">
            <div className="container section">
              <SectionTitle
                number="06"
                label="CONNECTING THE DOTS"
                title="What keeps me curious."
              >
                <p>
                  Three themes running through my work, from the first
                  experiment to the finished interface.
                </p>
              </SectionTitle>
              <div className="focus-grid">
                <article>
                  <span>01 / MODELS</span>
                  <h3>
                    From prediction
                    <br />
                    to understanding.
                  </h3>
                  <p>
                    Computer vision becomes more interesting when the output can
                    be inspected. RetinaBridge and LungLens explore inference,
                    visual review, and the limits of what a model can tell us.
                  </p>
                  <a href="#projects">
                    Explore the research <ArrowUpRight size={16} />
                  </a>
                </article>
                <article>
                  <span>02 / EVIDENCE</span>
                  <h3>
                    Test the idea.
                    <br />
                    Question the result.
                  </h3>
                  <p>
                    AgriLens and TraceLens make experiments visible: shared
                    inputs, saved outputs, clear comparisons, and honest
                    evaluation limits. A useful result includes the context
                    behind it.
                  </p>
                  <External href="https://github.com/SOLANKYYY/agrilens-llm-benchmark">
                    Read the methodology <ArrowUpRight size={16} />
                  </External>
                </article>
                <article>
                  <span>03 / SOFTWARE</span>
                  <h3>
                    Make complex work
                    <br />
                    easier to do.
                  </h3>
                  <p>
                    From household schedules to security reports, I’m interested
                    in interfaces that organize real tasks. Flat & Fork and
                    Signal Desk bring data, workflows, and people together.
                  </p>
                  <External href="https://github.com/SOLANKYYY/flat-and-fork">
                    Explore the application <ArrowUpRight size={16} />
                  </External>
                </article>
              </div>
            </div>
          </section>
          <section id="contact" className="contact-section">
            <div className="container section contact-grid">
              <div>
                <p className="eyebrow">07 / SAY HELLO</p>
                <h2>
                  Good things start
                  <br />
                  with a conversation<span>.</span>
                </h2>
                <p>
                  Have an opportunity or an idea to explore?
                  <br />
                  I’d love to hear about it.
                </p>
                <a className="email-link" href={`mailto:${profile.email}`}>
                  {profile.email}
                  <ArrowUpRight size={20} />
                </a>
                <div className="contact-socials">
                  <External href={profile.socials.github}>
                    GitHub <ArrowUpRight size={15} />
                  </External>
                  <External href={profile.socials.linkedin}>
                    LinkedIn <ArrowUpRight size={15} />
                  </External>
                </div>
              </div>
              <ContactForm />
            </div>
            <PortfolioQuestions />
          </section>
        </main>
        <div className="container footer-directory">
          <div><p className="eyebrow">EXPLORE A LITTLE FURTHER</p><p>Ideas, experiments, and the work in between.</p></div>
          <nav aria-label="Footer navigation">
            {links.filter(([, id]) => id !== "home").map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
        </div>
        <footer className="container footer">
          <a className="wordmark" href="#home">
            om<span>.</span>
          </a>
          <p>© {new Date().getFullYear()} Solanki Om Narendra</p>
          <button
            onClick={toggleMotion}
            aria-pressed={!motionPaused}
            className="motion-toggle"
          >
            {motionPaused ? "Resume effects" : "Pause effects"}{" "}
            <span aria-hidden="true">{motionPaused ? "▶" : "Ⅱ"}</span>
          </button>
          <button
            ref={replayRef}
            onClick={() => {
              replaying.current = true;
              setIntroKey((k) => k + 1);
              setIntro(true);
            }}
          >
            Replay intro <ArrowRight size={14} />
          </button>
          <a href="#home">Back to top ↑</a>
        </footer>
      </div>
    </>
  );
}
