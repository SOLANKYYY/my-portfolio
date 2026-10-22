import { useEffect, useRef } from "react";
// Original implementation of a numerical field → name reveal.
// Visual reference: https://github.com/CODING-DARSH/Portfolio
export default function Intro({ onDone }) {
  const canvasRef = useRef(null),
    doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      doneRef.current();
      return;
    }
    const canvas = canvasRef.current,
      context = canvas.getContext("2d");
    if (!context) {
      doneRef.current();
      return;
    }
    let frame, width, height, cells;
    const start = performance.now();
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(width / 86),
        rows = Math.ceil(height / 30);
      cells = Array.from({ length: cols * rows }, (_, i) => ({
        x: (i % cols) * 86 + 12,
        y: Math.floor(i / cols) * 30 + 20,
        delay: (((i % cols) + Math.floor(i / cols)) / (cols + rows)) * 600,
        value: (Math.sin(i * 127.1) * 2).toFixed(4),
      }));
    };
    resize();
    const draw = (now) => {
      const elapsed = now - start;
      context.clearRect(0, 0, width, height);
      context.font = "11px monospace";
      context.textAlign = "left";
      for (const cell of cells) {
        const distance =
          Math.hypot(cell.x - width / 2, cell.y - height / 2) /
          Math.hypot(width / 2, height / 2);
        const appear = Math.min(1, Math.max(0, (elapsed - cell.delay) / 250)),
          disappear = Math.min(
            1,
            Math.max(0, (elapsed - 700 - (1 - distance) * 400) / 350),
          );
        context.fillStyle = `rgba(66,103,160,${appear * (1 - disappear) * 0.23})`;
        context.fillText(cell.value, cell.x, cell.y);
      }
      if (elapsed >= 2200) {
        doneRef.current();
        return;
      }
      frame = requestAnimationFrame(draw);
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
    media.addEventListener("change", reduce);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = overflow;
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", skip);
      media.removeEventListener("change", reduce);
    };
  }, []);
  return (
    <div
      className="intro"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome animation"
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="intro-name">
        <span>HELLO, I’M</span>
        <strong>
          Om Solanki<span>.</span>
        </strong>
        <p>Curiosity, made tangible.</p>
      </div>
      <button autoFocus onClick={() => doneRef.current()}>
        Skip intro ↗
      </button>
      <span className="intro-bottom">SOLANKYY.TECH</span>
    </div>
  );
}
