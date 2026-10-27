import { useEffect, useRef } from "react";
import { ArrowUpRight, Expand, Github, X } from "lucide-react";

export function ProjectThumbnail({ project, onPreview, compact = false }) {
  return <button type="button" className={`project-image-link project-media media-${project.art || "lab"}${compact ? " compact-media" : ""}`} onClick={onPreview} aria-label={`Preview ${project.title} screenshot`}>
    <span className="browser-preview">
      <span className="browser-chrome" aria-hidden="true"><span className="browser-dots"><i /><i /><i /></span><span>{project.title}</span><ArrowUpRight size={11} /></span>
      <img className="project-screenshot" src={project.image.src} alt={project.image.alt} width="1360" height="900" loading="lazy" decoding="async" />
    </span>
    <span className="screenshot-caption">{project.image.caption}</span>
    <span className="project-open" aria-hidden="true"><Expand size={17} /></span>
  </button>;
}

export function ProjectPreview({ project, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!project) return;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
    };
  }, [project]);
  return <dialog className="project-preview-dialog" ref={dialogRef} aria-labelledby="project-preview-title" onClose={onClose} onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
    {project && <div className="project-preview-content">
      <div className="preview-heading"><div><p className="eyebrow">A CLOSER LOOK / {project.image.caption}</p><h2 id="project-preview-title">{project.title}</h2></div><button type="button" className="preview-close" aria-label="Close project preview" onClick={() => dialogRef.current.close()} autoFocus><X size={23} /></button></div>
      <div className="preview-image-scroll" tabIndex={0} role="region" aria-label={`${project.title} screenshot`}><img src={project.image.src} alt={project.image.alt} /></div>
      <div className="preview-footer"><p>{project.art === "lung" ? "Screenshot of the interactive research interface; model inference requires the local Python service." : "An actual interface from this project. Explore the source for its approach and scope."}</p><div><a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={16} /> Source</a>{project.demo && <a className="button primary" href={project.demo} target="_blank" rel="noopener noreferrer">Explore demo <ArrowUpRight size={16} /></a>}</div></div>
    </div>}
  </dialog>;
}
