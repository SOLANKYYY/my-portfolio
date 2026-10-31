import { useEffect, useRef } from "react";

// A six-second particle convergence and name reveal; no external animation runtime.
export default function Intro({ onDone }) {
  const canvasRef = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      doneRef.current();
      return;
    }
    const canvas = canvasRef.current,
      ctx = canvas.getContext("2d");
    if (!ctx) {
      doneRef.current();
      return;
    }
    let width,
      height,
      frame,
      previous = performance.now(),
      elapsed = 0;
    const particles = Array.from({ length: 96 }, (_, i) => ({
      angle: i * 2.39996,
      radius: 0.22 + ((i * 37) % 80) / 100,
      size: 1 + (i % 3) * 0.6,
      hue: [211, 215, 220][i % 3],
    }));
    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const draw = (now) => {
      elapsed += now - previous;
      previous = now;
      ctx.clearRect(0, 0, width, height);
      const t = elapsed / 1000,
        radius = Math.min(width * 0.36, height * 0.3, 250),
        convergence = Math.min(1, t / 2),
        exit = Math.max(0, (t - 5.3) / 0.9);
      const alpha = Math.min(1, t / 0.7) * (1 - exit);
      particles.forEach((p, i) => {
        const angle = p.angle + t * (i % 2 ? 0.12 : -0.1),
          distant = Math.max(width, height) * p.radius;
        const r =
          distant * (1 - convergence) +
          radius * (0.9 + (i % 5) * 0.07) * convergence +
          exit * 180;
        const x = width / 2 + Math.cos(angle) * r,
          y = height / 2 + Math.sin(angle) * r * 0.72;
        ctx.fillStyle = `hsla(${p.hue},18%,48%,${alpha * (0.3 + (i % 4) * 0.13)})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (i % 4 === 0) {
          ctx.strokeStyle = `hsla(${p.hue},16%,55%,${alpha * 0.16})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            width / 2 + Math.cos(angle + 0.18) * r,
            height / 2 + Math.sin(angle + 0.18) * r * 0.72,
          );
          ctx.stroke();
        }
      });
      if (elapsed >= 6200) {
        doneRef.current();
        return;
      }
      frame = requestAnimationFrame(draw);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      canvas.parentElement.classList.toggle("is-paused", document.hidden);
      if (!document.hidden) {
        previous = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };
    frame = requestAnimationFrame(draw);
    const skip = (e) => {
        if (e.key === "Escape") doneRef.current();
      },
      reduce = () => {
        if (media.matches) doneRef.current();
      };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", skip);
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", reduce);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = overflow;
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", skip);
      document.removeEventListener("visibilitychange", visibility);
      media.removeEventListener("change", reduce);
    };
  }, []);
  return (
    <div
      className="intro intro-spectra"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome animation"
    >
      <div className="intro-lights" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="intro-name">
        <span>WELCOME TO MY LITTLE CORNER OF THE INTERNET</span>
        <strong>
          Om Solanki<span>.</span>
        </strong>
        <p>Ideas. Experiments. Possibilities.</p>
        <div className="intro-disciplines" aria-hidden="true">
          <span>AI & ML</span>
          <i />
          <span>CODE</span>
          <i />
          <span>CURIOSITY</span>
        </div>
      </div>
      <button autoFocus onClick={() => doneRef.current()}>
        Skip intro ↗
      </button>
      <span className="intro-bottom">SOLANKYY.TECH</span>
      <span className="intro-message" aria-hidden="true">
        A little curiosity goes a long way.
      </span>
      <div className="intro-progress" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
