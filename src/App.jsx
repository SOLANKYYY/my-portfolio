import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Github,
  Linkedin,
  Download,
  Menu,
  X,
  MapPin,
  ArrowRight,
} from "lucide-react";
import {
  profile,
  education,
  experience,
  hackathons,
  contact,
} from "./data/portfolio";
import { selectedProjects, moreProjects, skills } from "./data/work";
import Intro from "./components/Intro";

const links = [
  ["Work", "projects"],
  ["About", "about"],
  ["Experience", "experience"],
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
function ProjectArt({ kind }) {
  return (
    <div className={`project-art art-${kind}`} aria-hidden="true">
      {kind === "retina" && (
        <>
          <div className="orbital-eye">
            <i />
            <b />
          </div>
          <span className="art-caption">IMAGE → MODEL → EXPLANATION</span>
        </>
      )}
      {kind === "signal" && (
        <>
          <div className="signal-window">
            <div className="window-top">
              <span /> SIGNAL DESK <small>INTELLIGENCE</small>
            </div>
            <div className="signal-layout">
              <div className="signal-sidebar">
                Feed
                <br />
                Reports
                <br />
                Evidence
              </div>
              <div className="signal-lines">
                <strong>Follow the evidence.</strong>
                <i />
                <i />
                <i />
                <div>
                  <span>REPORTS</span>
                  <span>ENTITIES</span>
                  <span>REVIEW</span>
                </div>
              </div>
            </div>
          </div>
          <span className="art-caption">COLLECT · INVESTIGATE · REVIEW</span>
        </>
      )}
      {kind === "flat" && (
        <>
          <div className="meal-paper">
            <span>THIS WEEK AT HOME</span>
            <h4>
              A little more
              <br />
              in sync.
            </h4>
            <div>
              <b>M</b>
              <b>T</b>
              <b>W</b>
              <b>T</b>
              <b>F</b>
            </div>
            <p>Meals planned. Duties shared.</p>
          </div>
          <div className="meal-dot" />
          <span className="art-caption">FLAT & FORK / SHARED LIVING</span>
        </>
      )}
      {kind === "agri" && (
        <>
          <div className="agri-lines">
            {[36, 63, 48, 85, 58, 94, 72].map((h, i) => (
              <div key={i} style={{ height: `${h}%` }}>
                <i />
              </div>
            ))}
          </div>
          <span className="agri-label">
            Same soil.
            <br />
            <em>Different reasoning.</em>
          </span>
          <span className="art-caption">AGRILENS / LOCAL LLM BENCHMARK</span>
        </>
      )}
      {kind === "lung" && (
        <>
          <div className="lung-grid">
            <div />
            <div />
            <span>+</span>
          </div>
          <span className="art-caption">LUNGLENS / RESEARCH PROTOTYPE</span>
        </>
      )}
      {kind === "trace" && (
        <>
          <div className="trace-art">
            <div className="trace-points">
              {Array.from({ length: 35 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    left: `${12 + ((i * 29) % 78)}%`,
                    top: `${10 + ((i * 17) % 75)}%`,
                  }}
                />
              ))}
            </div>
            <span>384 → 50 → 2</span>
          </div>
          <span className="art-caption">
            TRACELENS / DIMENSIONALITY REDUCTION
          </span>
        </>
      )}
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
  const replayRef = useRef(null);
  const replaying = useRef(false);
  const [menu, setMenu] = useState(false),
    [filter, setFilter] = useState("All"),
    [introKey, setIntroKey] = useState(0);
  const [intro, setIntro] = useState(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return false;
    try {
      return !sessionStorage.getItem("om-intro-seen");
    } catch {
      return true;
    }
  });
  function finishIntro() {
    setIntro(false);
    try {
      sessionStorage.setItem("om-intro-seen", "1");
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
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const animations = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
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
        ".hero-copy,.portrait-composition,.section-title,.project-card,.about-grid,.timeline article,.focus-grid article",
      )
      .forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [intro, filter]);
  const shown =
    filter === "All"
      ? selectedProjects
      : selectedProjects.filter((p) => p.category === filter);
  return (
    <>
      {intro && <Intro key={introKey} onDone={finishIntro} />}
      <div inert={intro ? "" : undefined}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="container nav-wrap">
            <a className="wordmark" href="#home" aria-label="Om Solanki home">
              om<span>.</span>
            </a>
            <button
              className="menu-toggle"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
              aria-controls="main-nav"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
            <nav
              id="main-nav"
              className={menu ? "nav open" : "nav"}
              aria-label="Main navigation"
            >
              {links.map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                  {label}
                  {id === "contact" && <ArrowUpRight size={15} />}
                </a>
              ))}
            </nav>
            <a
              className="nav-resume"
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé <Download size={15} />
            </a>
          </div>
        </header>
        <main id="main">
          <section id="home" className="container hero">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" /> AI & ML UNDERGRADUATE ·
                BENGALURU
              </p>
              <h1 id="intro-heading" tabIndex={-1}>
                Hi, I’m <span className="name-highlight">Om.</span>
                <br />
                I turn ideas into
                <br />
                <span className="hero-emphasis">useful software.</span>
              </h1>
              <p className="hero-description">
                I’m <strong>Solanki Om Narendra</strong>, an AI & ML
                undergraduate exploring computer vision, thoughtful interfaces,
                and software that makes everyday work a little easier.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#projects">
                  Explore my work <ArrowDown size={17} />
                </a>
                <a className="text-link" href={`mailto:${profile.email}`}>
                  Let’s talk <ArrowUpRight size={17} />
                </a>
              </div>
              <div className="hero-socials">
                <External href={profile.socials.github}>
                  <Github size={17} /> GitHub
                </External>
                <External href={profile.socials.linkedin}>
                  <Linkedin size={17} /> LinkedIn
                </External>
                <span className="hero-location">
                  <MapPin size={15} /> Bengaluru, India
                </span>
              </div>
            </div>
            <div className="portrait-composition">
              <span className="portrait-index">
                A LITTLE CURIOSITY GOES A LONG WAY
              </span>
              <div className="portrait-frame">
                <img
                  src={profile.photo}
                  alt="Solanki Om Narendra"
                  fetchPriority="high"
                />
                <span className="portrait-corner">
                  OM
                  <br />
                  SOLANKI
                </span>
              </div>
              <div className="portrait-note">
                <span className="asterisk">✳</span>
                <p>
                  Learning by doing.
                  <br />
                  <strong>One project at a time.</strong>
                </p>
                <span className="note-arrow">↗</span>
              </div>
            </div>
          </section>
          <div className="focus-strip">
            <div className="container">
              <span>EXPLORING THE INTERSECTION OF</span>
              <p>
                Machine learning <i /> Computer vision <i /> Software
                engineering
              </p>
            </div>
          </div>
          <section id="projects" className="container section">
            <SectionTitle
              number="01"
              label="SELECTED WORK"
              title="Ideas, put into practice."
            >
              <p>
                A selection of research prototypes and practical applications.
                <br />
                Built to learn. Documented to share.
              </p>
            </SectionTitle>
            <div
              className="project-filters"
              role="group"
              aria-label="Filter projects"
            >
              {["All", "AI & ML", "Web & systems"].map((f) => (
                <button
                  key={f}
                  aria-pressed={filter === f}
                  className={filter === f ? "active" : ""}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="project-grid">
              {shown.map((p) => (
                <article className="project-card" key={p.title}>
                  <External
                    className="project-image-link"
                    href={p.github}
                    aria-label={`View ${p.title} source on GitHub`}
                  >
                    <ProjectArt kind={p.art} />
                    <span className="project-open">
                      <ArrowUpRight size={21} />
                    </span>
                  </External>
                  <div className="project-meta">
                    <span>{p.category}</span>
                    <span>
                      {String(selectedProjects.indexOf(p) + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{p.title}</h3>
                  <p className="project-description">{p.description}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <External href={p.github}>
                      View source <ArrowUpRight size={15} />
                    </External>
                    {p.demo && (
                      <External href={p.demo}>
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
            <div className="more-work">
              <div>
                <h3>More from the workbench</h3>
                <p>Experiments, foundations, and daily practice.</p>
              </div>
              <div className="archive-list">
                {moreProjects.map((p) => (
                  <External key={p.title} href={p.github}>
                    <span>
                      {p.title}
                      <small>{p.description}</small>
                    </span>
                    <ArrowUpRight size={19} />
                  </External>
                ))}
              </div>
            </div>
            <External
              className="text-link all-repos"
              href={`${profile.socials.github}?tab=repositories`}
            >
              All repositories on GitHub <ArrowUpRight size={17} />
            </External>
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
              <div className="skills-section">
                <div>
                  <p className="eyebrow">TOOLS & TECHNOLOGIES</p>
                  <h3>What I work with.</h3>
                </div>
                <div className="skills-grid">
                  {skills.map((group) => (
                    <div key={group.title}>
                      <h4>{group.title}</h4>
                      <p>{group.items.join(" · ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section id="experience" className="container section">
            <SectionTitle
              number="03"
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
          <section id="exploring" className="exploring-section">
            <div className="container section">
              <SectionTitle
                number="04"
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
                <p className="eyebrow">05 / SAY HELLO</p>
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
          </section>
        </main>
        <footer className="container footer">
          <a className="wordmark" href="#home">
            om<span>.</span>
          </a>
          <p>© {new Date().getFullYear()} Solanki Om Narendra</p>
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
