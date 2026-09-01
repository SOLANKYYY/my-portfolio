import { useMemo, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'
import {
  ShieldAlert,
  ScanFace,
  Activity,
  MailWarning,
  GitCompare,
  Code2,
  ArrowUpRight,
} from 'lucide-react'
import { projects } from '../data/portfolio'

const icons = {
  'shield-alert': ShieldAlert,
  'scan-face': ScanFace,
  activity: Activity,
  'mail-warning': MailWarning,
  'git-compare': GitCompare,
  'code-2': Code2,
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// transform/opacity only — no layout-triggering properties — keeps this on
// the compositor thread instead of forcing style recalculation each frame.
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

function ProjectCard({ project }) {
  const Icon = icons[project.icon]
  const ref = useRef(null)

  // Pointer position normalized to 0–1 within the card, driving both the
  // tilt and the glow — a single mousemove handler, two derived effects.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const springConfig = { stiffness: 300, damping: 22, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), springConfig)
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), springConfig)
  const glowX = useTransform(px, (v) => `${v * 100}%`)
  const glowY = useTransform(py, (v) => `${v * 100}%`)
  const glowBackground = useMotionTemplate`radial-gradient(280px circle at ${glowX} ${glowY}, rgba(197, 160, 89, 0.28), transparent 65%)`

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const handleMouseLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, willChange: 'transform' }}
      className="group glass-panel relative flex flex-col overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-gold/50 hover:shadow-glow"
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glowBackground }}
      />

      <div className="relative z-10 flex h-36 items-center justify-center border-b border-gold/15 bg-gold/5">
        <Icon className="h-10 w-10 text-gold-dark drop-shadow-sm" />
      </div>
      <div className="relative z-10 flex flex-grow flex-col p-6">
        <h3 className="mb-2 font-heading text-xl font-bold leading-tight text-charcoalDark">
          {project.title}
        </h3>
        <p className="mb-6 flex-grow text-sm text-charcoal/70">{project.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-gold/30 bg-gold/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-dark"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-charcoalDark transition-colors hover:text-gold-dark"
        >
          GitHub Repo <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const allTags = useMemo(() => {
    const tags = new Set()
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)))
    return ['All', ...Array.from(tags)]
  }, [])

  const [filter, setFilter] = useState('All')

  const visible = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter((p) => p.tags.includes(filter))
  }, [filter])

  return (
    <section id="projects" className="section-shell py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-10 text-center"
      >
        <span className="eyebrow">03 — Development</span>
        <h2 className="mt-3 font-heading text-4xl font-bold text-charcoalDark sm:text-5xl">
          Featured <span className="brand-text">Projects</span>
        </h2>
      </motion.div>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setFilter(tag)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${
              filter === tag
                ? 'border-transparent bg-brand-gradient text-white'
                : 'border-gold/25 text-charcoal/60 hover:border-gold/60 hover:text-charcoalDark'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <motion.div
        layout
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
