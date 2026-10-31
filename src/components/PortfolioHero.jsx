import { ArrowDown, ArrowUpRight, Github, Linkedin, FileText } from "lucide-react";
import { profile } from "../data/portfolio";
import { selectedProjects } from "../data/work";

export default function PortfolioHero({ onPreview }) {
  return (
    <section id="home" className="neutral-hero opening-grey">
      <div className="builder-grid">
        <div className="builder-intro">
          <p className="neutral-kicker"><span /> AI & ML / BENGALURU</p>
          <h1 id="intro-heading" tabIndex={-1}>
            Hi, I’m Om.<br />I learn.<br /><span>I build.</span>
          </h1>
          <p className="neutral-description">
            From exploring a model to shaping the interface—<br className="desktop-break" />
            I enjoy bringing useful ideas to life.
          </p>
          <div className="neutral-actions">
            <a className="neutral-primary" href="#projects">Explore my work <ArrowDown size={16} /></a>
            <a className="neutral-secondary" href={`mailto:${profile.email}`}>Get in touch <ArrowUpRight size={16} /></a>
          </div>
          <div className="neutral-socials">
            <a href={profile.socials.github} target="_blank" rel="noreferrer"><Github size={17} />GitHub</a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} />LinkedIn</a>
            <a href={profile.resume} target="_blank" rel="noreferrer"><FileText size={17} />Résumé</a>
          </div>
        </div>
        <aside className="builder-profile" aria-label="About Om">
          <div className="builder-photo">
            <img src={profile.photo} alt="Om Solanki" fetchPriority="high" />
            <span>OM SOLANKI / A WORK IN PROGRESS</span>
          </div>
          <div className="builder-caption">
            <div><strong>Code, curiosity & coffee.</strong><p>AI & ML undergraduate<br />Jain University, Bengaluru</p></div>
            <a href="#about" aria-label="More about Om"><ArrowUpRight size={20} /></a>
          </div>
        </aside>
      </div>
      <div className="opening-projects">
        <div className="opening-project-label"><span>SELECTED PROJECTS</span><p>A few things I’ve been building.</p></div>
        {selectedProjects.slice(0, 3).map((project) => (
          <button type="button" onClick={() => onPreview(project)} key={project.title} aria-label={`Preview ${project.title}`}>
            <img src={project.image.src} alt="" loading="lazy" />
            <span><small>{project.category}</small><strong>{project.title}</strong></span>
            <ArrowUpRight size={16} />
          </button>
        ))}
      </div>
    </section>
  );
}
