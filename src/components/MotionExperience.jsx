import { useEffect, useRef } from "react";

export function CursorExperience({ enabled }) {
  const haloRef = useRef(null),
    ringRef = useRef(null),
    progressRef = useRef(null);
  useEffect(() => {
    const progress = () => {
      const travel = document.documentElement.scrollHeight - innerHeight;
      progressRef.current.style.transform = `scaleX(${travel > 0 ? scrollY / travel : 0})`;
    };
    let scrollFrame;
    const scroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(progress);
    };
    progress();
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    return () => {
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
      cancelAnimationFrame(scrollFrame);
    };
  }, []);
  useEffect(() => {
    const query = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const halo = haloRef.current,
      ring = ringRef.current;
    let frame = 0,
      x = 0,
      y = 0,
      tx = 0,
      ty = 0,
      seen = false,
      activeCard = null;
    const resetCard = () => {
      if (activeCard) {
        activeCard.style.removeProperty("--tilt-x");
        activeCard.style.removeProperty("--tilt-y");
        activeCard.style.removeProperty("--shine-x");
        activeCard.style.removeProperty("--shine-y");
        activeCard.classList.remove("pointer-lit");
        activeCard = null;
      }
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      seen = false;
      halo.style.opacity = "0";
      ring.style.opacity = "0";
      halo.style.transform = "translate3d(0,0,0)";
      ring.style.transform = "translate3d(0,0,0)";
      resetCard();
    };
    const draw = () => {
      x += (tx - x) * 0.17;
      y += (ty - y) * 0.17;
      halo.style.transform = `translate3d(${x}px,${y}px,0)`;
      ring.style.transform = `translate3d(${tx}px,${ty}px,0)`;
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.3)
        frame = requestAnimationFrame(draw);
      else frame = 0;
    };
    const move = (e) => {
      if (
        !enabled ||
        !query.matches ||
        document.hidden ||
        e.pointerType === "touch"
      )
        return;
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        x = tx;
        y = ty;
        seen = true;
      }
      halo.style.opacity = "1";
      ring.style.opacity = "1";
      const interactive = e.target.closest("a,button,summary,input,textarea");
      ring.classList.toggle("is-link", !!interactive);
      if (!frame) frame = requestAnimationFrame(draw);
      const card = e.target.closest(".project-image-link");
      if (card !== activeCard) {
        resetCard();
        activeCard = card;
      }
      if (card) {
        const box = card.getBoundingClientRect(),
          px = (e.clientX - box.left) / box.width,
          py = (e.clientY - box.top) / box.height;
        card.style.setProperty("--tilt-x", `${(py - 0.5) * -6}deg`);
        card.style.setProperty("--tilt-y", `${(px - 0.5) * 6}deg`);
        card.style.setProperty("--shine-x", `${px * 100}%`);
        card.style.setProperty("--shine-y", `${py * 100}%`);
        card.classList.add("pointer-lit");
      }
    };
    const visibility = () => {
      if (document.hidden) stop();
    };
    const out = (e) => {
      if (!e.relatedTarget) stop();
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", out);
    document.addEventListener("focusin", resetCard);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("blur", stop);
    window.addEventListener("resize", stop);
    query.addEventListener("change", stop);
    return () => {
      stop();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", out);
      document.removeEventListener("focusin", resetCard);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("blur", stop);
      window.removeEventListener("resize", stop);
      query.removeEventListener("change", stop);
    };
  }, [enabled]);
  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
      <div className="cursor-layer" aria-hidden="true">
        <div className="cursor-halo" ref={haloRef} />
        <div className="cursor-ring" ref={ringRef} />
      </div>
    </>
  );
}

export function HeroAtmosphere({ enabled }) {
  const canvasRef = useRef(null),
    fieldRef = useRef(null);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const canvas = canvasRef.current,
      ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0,
      width = 0,
      height = 0,
      inView = false,
      phase = 0,
      last = 0,
      lastPaint = 0;
    const pointer = { x: 0, y: 0 };
    const points = Array.from({ length: 38 }, (_, i) => ({
      x: ((i * 73 + 11) % 101) / 100,
      y: ((i * 37 + 7) % 97) / 100,
      speed: 0.45 + (i % 4) * 0.15,
    }));
    const resize = () => {
      const box = fieldRef.current.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (now) => {
      frame = 0;
      if (!enabled || query.matches || !inView || document.hidden) return;
      if (now - lastPaint < 32) {
        frame = requestAnimationFrame(draw);
        return;
      }
      phase += Math.min(now - (last || now), 60) / 1000;
      last = now;
      lastPaint = now;
      ctx.clearRect(0, 0, width, height);
      const positions = points.map((p, i) => ({
        x:
          p.x * width +
          Math.sin(phase * 0.3 + p.x * 6) * 14 +
          pointer.x * p.speed,
        y:
          p.y * height +
          Math.cos(phase * 0.25 + p.y * 6) * 10 +
          pointer.y * p.speed,
      }));
      positions.forEach((p, i) => {
        ctx.fillStyle = i % 3 ? "rgba(70,111,194,.28)" : "rgba(142,101,206,.3)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, i % 4 === 0 ? 2.3 : 1.4, 0, Math.PI * 2);
        ctx.fill();
        positions.slice(i + 1).forEach((q) => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 100) {
            ctx.strokeStyle = `rgba(91,128,193,${(1 - d / 100) * 0.12})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        });
      });
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      const running = enabled && !query.matches && inView && !document.hidden;
      fieldRef.current.classList.toggle("is-resting", !running);
      fieldRef.current.parentElement.dataset.heroVisible = running
        ? "true"
        : "false";
      if (running) frame = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, width, height);
    };
    const move = (e) => {
      if (e.pointerType === "touch") return;
      const box = fieldRef.current.getBoundingClientRect();
      pointer.x = ((e.clientX - box.left) / box.width - 0.5) * 16;
      pointer.y = ((e.clientY - box.top) / box.height - 0.5) * 16;
    };
    resize();
    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(fieldRef.current);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(fieldRef.current);
    const hero = fieldRef.current.parentElement;
    hero.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", sync);
    query.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      hero.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", sync);
      query.removeEventListener("change", sync);
      ctx.clearRect(0, 0, width, height);
    };
  }, [enabled]);
  return (
    <div ref={fieldRef} className="hero-atmosphere" aria-hidden="true">
      <div className="aurora aurora-blue" />
      <div className="aurora aurora-violet" />
      <div className="aurora aurora-peach" />
      <div className="hero-grid" />
      <canvas ref={canvasRef} />
    </div>
  );
}
