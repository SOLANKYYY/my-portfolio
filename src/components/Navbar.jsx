import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Download, Search } from 'lucide-react'
import { navLinks, profile } from '../data/portfolio'
import SearchModal from './SearchModal'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Ctrl+K / Cmd+K opens the command-style search from anywhere on the page.
  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  const handleNavClick = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 84
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="section-shell">
          <div
            className={`gpu flex h-14 items-center justify-between rounded-full border border-gold/20 bg-white/75 px-5 backdrop-blur-md transition-shadow duration-300 ${
              scrolled ? 'shadow-glow' : 'shadow-sm'
            }`}
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#hero')
              }}
              className="font-heading text-sm font-bold tracking-tight text-charcoalDark"
            >
              S<span className="text-gold-dark">.</span>O
              <span className="text-gold">N</span>
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    active === link.href
                      ? 'text-charcoalDark'
                      : 'text-charcoal/60 hover:text-charcoalDark'
                  }`}
                >
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-gold/30 bg-brand-gradient-soft"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search (Ctrl+K)"
                className="hidden items-center gap-2 rounded-full border border-gold/20 bg-white/60 px-3 py-2 text-xs font-medium text-charcoal/60 transition-colors hover:border-gold/50 hover:text-charcoalDark sm:flex"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="rounded border border-gold/25 bg-gold/10 px-1.5 py-0.5 font-mono text-[10px] text-gold-dark">
                  Ctrl K
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="flex h-9 w-9 items-center justify-center rounded-full text-charcoalDark transition-colors hover:bg-gold/10 sm:hidden"
              >
                <Search className="h-4.5 w-4.5" />
              </button>

              <a
                href={profile.resume}
                download
                className="hidden items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-transform hover:-translate-y-0.5 sm:flex"
              >
                Résumé <Download className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-charcoalDark transition-colors hover:bg-gold/10 md:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-charcoalDark/40 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="mx-4 mt-24 flex flex-col gap-1 rounded-2xl border border-gold/20 bg-white p-3 shadow-glow-lg"
            >
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setSearchOpen(true)
                }}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-charcoal/70 hover:bg-gold/10 hover:text-charcoalDark"
              >
                <Search className="h-4 w-4" /> Search
                <span className="ml-auto rounded border border-gold/25 bg-gold/10 px-1.5 py-0.5 font-mono text-[10px] text-gold-dark">
                  Ctrl K
                </span>
              </button>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    active === link.href
                      ? 'bg-brand-gradient-soft text-charcoalDark'
                      : 'text-charcoal/70 hover:bg-gold/10 hover:text-charcoalDark'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={profile.resume}
                download
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-4 py-3 text-sm font-bold uppercase tracking-wider text-white"
              >
                Download Résumé <Download className="h-4 w-4" />
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
