import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Github, Linkedin, Mail, ArrowDown } from 'lucide-react'
import NeuralBackground from './NeuralBackground'
import { profile } from '../data/portfolio'

const ROLES = [
  'Artificial Intelligence & Machine Learning Undergraduate',
  'Computer Vision Engineer',
  'Software Engineer',
]

function useTypewriter(words, { typingMs = 55, deletingMs = 30, holdMs = 1800 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setText(words[0])
      return
    }

    const current = words[index % words.length]
    let timeout

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingMs)
      } else {
        timeout = setTimeout(() => setPhase('holding'), holdMs)
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('deleting'), 100)
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingMs)
      } else {
        setIndex((i) => (i + 1) % words.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [text, phase, index, words, typingMs, deletingMs, holdMs])

  return text
}

const socialLinks = [
  { href: profile.socials.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: profile.socials.github, label: 'GitHub', Icon: Github },
  { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
]

export default function Hero() {
  const typedRole = useTypewriter(ROLES)

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-2 pb-20 pt-24"
    >
      <div className="absolute inset-0 opacity-75">
        <NeuralBackground />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-page/10 via-transparent to-page" />

      <div className="section-shell relative z-10 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="eyebrow mb-6 rounded-full border border-gold/25 bg-white/70 px-4 py-1.5 backdrop-blur"
        >
          Bengaluru, India · Open to opportunities
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-charcoalDark sm:text-6xl md:text-7xl"
        >
          {profile.name.split(' ')[0]}{' '}
          <span className="brand-text">{profile.name.split(' ').slice(1).join(' ')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-6 h-8 max-w-2xl font-mono text-base text-charcoal/70 sm:text-lg"
        >
          {typedRole}
          <span className="ml-0.5 inline-block h-5 w-[2px] animate-blink bg-gold-dark align-middle" />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={profile.resume}
            download="Solanki_Om_Narendra_CV.pdf"
            className="group flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-wider text-white shadow-glow transition-transform hover:-translate-y-0.5"
          >
            Download CV
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>

          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-white/80 text-charcoalDark backdrop-blur transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold-dark"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>

        <motion.a
          href="#about"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 flex flex-col items-center gap-2 text-charcoal/40 transition-colors hover:text-gold-dark"
          aria-label="Scroll to About section"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em]">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </motion.a>
      </div>
    </section>
  )
}
