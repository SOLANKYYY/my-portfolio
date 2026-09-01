import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, CornerDownLeft, X } from 'lucide-react'
import { navLinks, skillGroups, projects, experience, hackathons } from '../data/portfolio'

// Flattened, searchable index built once from the same content the rest of
// the site renders — nothing here is new copy, it's just a lookup layer
// over sections, skills, and projects that already exist on the page.
function buildIndex() {
  const entries = []

  navLinks.forEach((l) =>
    entries.push({ type: 'Section', label: l.label, sub: 'Jump to section', href: l.href }),
  )

  skillGroups.forEach((group) => {
    group.skills.forEach((skill) =>
      entries.push({ type: 'Skill', label: skill, sub: group.title, href: '#arsenal' }),
    )
  })

  projects.forEach((p) =>
    entries.push({ type: 'Project', label: p.title, sub: p.tags.join(' · '), href: '#projects' }),
  )

  experience.forEach((e) =>
    entries.push({ type: 'Experience', label: e.title, sub: e.org, href: '#experience' }),
  )

  hackathons.forEach((h) =>
    entries.push({ type: 'Hackathon', label: h.title, sub: h.period, href: '#experience' }),
  )

  return entries
}

const INDEX = buildIndex()

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return INDEX.slice(0, 8)
    return INDEX.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.sub?.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q),
    ).slice(0, 10)
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      // Wait a frame so the entrance animation doesn't fight the focus call
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setActiveIndex(0), [query])

  const navigate = (href) => {
    onClose()
    requestAnimationFrame(() => {
      const el = document.querySelector(href)
      if (!el) return
      const y = el.getBoundingClientRect().top + window.scrollY - 84
      window.scrollTo({ top: y, behavior: 'smooth' })
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[activeIndex]) {
      navigate(results[activeIndex].href)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-charcoalDark/40 px-4 pt-24 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-gold/25 bg-white shadow-glow-lg"
          >
            <div className="flex items-center gap-3 border-b border-gold/15 px-5 py-4">
              <Search className="h-4.5 w-4.5 flex-shrink-0 text-gold-dark" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search sections, skills, projects…"
                className="w-full bg-transparent text-sm font-medium text-charcoalDark placeholder-charcoal/35 outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-charcoal/40 hover:bg-gold/10 hover:text-charcoalDark"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-charcoal/40">
                  No matches for &ldquo;{query}&rdquo;
                </p>
              )}
              {results.map((item, i) => (
                <button
                  key={`${item.type}-${item.label}`}
                  type="button"
                  onClick={() => navigate(item.href)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                    i === activeIndex ? 'bg-brand-gradient-soft' : ''
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-charcoalDark">
                      {item.label}
                    </span>
                    {item.sub && (
                      <span className="block truncate text-xs text-charcoal/50">{item.sub}</span>
                    )}
                  </span>
                  <span className="ml-3 flex-shrink-0 rounded border border-gold/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-dark">
                    {item.type}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-gold/15 bg-gold/5 px-5 py-2.5 text-[11px] text-charcoal/45">
              <span className="flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" /> to select
              </span>
              <span>Esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
