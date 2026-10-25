import { ArrowUpRight, ArrowDown, BrainCircuit, Code2, Database, Braces } from "lucide-react";
import { selectedProjects, moreProjects, skills } from "../data/work";

const skillIcons = [BrainCircuit, Code2, Database, Braces];

export function PortfolioOverview() {
  const items = [
    { count: selectedProjects.length, label: "Featured builds", text: "From model to interface", href: "#projects" },
    { count: moreProjects.length, label: "Lab projects", text: "Experiments worth opening", href: "#lab" },
    { count: skills.length, label: "Skill areas", text: "Tools with work behind them", href: "#skills" },
  ];
  return <aside className="container portfolio-overview" aria-label="Portfolio at a glance">
    <div className="overview-intro"><p className="eyebrow">A QUICK LOOK AROUND</p><h2>Curiosity, in practice.</h2><p>Explore the builds, the experiments, and how they connect.</p></div>
    {items.map(item => <a className="overview-item" href={item.href} key={item.label}>
      <span className="overview-number">{String(item.count).padStart(2, "0")}<ArrowDown size={17} /></span>
      <strong>{item.label}</strong><span>{item.text}</span>
    </a>)}
  </aside>;
}

export function ToolkitGrid() {
  return <div className="toolkit-grid">
    {skills.map((group, index) => {
      const Icon = skillIcons[index];
      return <article className="toolkit-card" key={group.title}>
        <div className="toolkit-heading"><span className="toolkit-icon"><Icon size={23} aria-hidden="true" /></span><span className="eyebrow">0{index + 1} / TOOLKIT</span></div>
        <h3>{group.title}</h3><p>{group.description}</p>
        <ul className="toolkit-tags" aria-label={`${group.title} tools`}>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
        <a className="toolkit-example" href={group.example.href} target="_blank" rel="noopener noreferrer"><span><small>SEE IT IN PRACTICE</small>{group.example.title}</span><ArrowUpRight size={19} /></a>
      </article>;
    })}
  </div>;
}

export function LabProjects() {
  return <div className="lab-projects">
    {moreProjects.map((project, index) => <article className="lab-project" key={project.title}>
      <span className="lab-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div className="lab-title"><p className="eyebrow">{project.category}</p><h3><a href={project.github} target="_blank" rel="noopener noreferrer">{project.title}<ArrowUpRight size={19} /></a></h3></div>
      <div className="lab-description"><p>{project.description}</p><ul className="lab-tags" aria-label={`${project.title} topics`}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>
    </article>)}
  </div>;
}

export function PortfolioQuestions() {
  return <div className="container portfolio-questions">
    <div><p className="eyebrow">A FEW USEFUL DETAILS</p><h3>Before you say hello.</h3></div>
    <div className="question-list">
      <details><summary>What kind of opportunities interest you?<span aria-hidden="true">+</span></summary><p>I’m interested in machine learning and software engineering opportunities where I can learn with a team and contribute to practical projects. Computer vision, model evaluation, and useful web applications are areas I enjoy exploring.</p></details>
      <details><summary>Where can I explore the code?<span aria-hidden="true">+</span></summary><p>Each featured project and Lab entry links to its GitHub repository. Start with the README for the setup, technical approach, and known limitations. Some projects also include a separate demo link.</p></details>
      <details><summary>Are the research demos production tools?<span aria-hidden="true">+</span></summary><p>They are learning and research projects with different levels of completeness. The project notes describe their scope; medical-image and health-modeling experiments are demonstrations and are not intended for clinical use.</p></details>
    </div>
  </div>;
}
