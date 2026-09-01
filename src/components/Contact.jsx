import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, XCircle } from 'lucide-react'
import { contact } from '../data/portfolio'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    setStatus('sending')
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-shell py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass-panel glass-panel-hover mx-auto max-w-2xl p-8 text-center md:p-12"
      >
        <h2 className="mb-3 font-heading text-3xl font-bold text-charcoalDark">
          Initiate <span className="brand-text">Contact</span>
        </h2>
        <p className="mb-8 text-sm font-medium text-charcoal/70">{contact.tagline}</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your Name"
            className="w-full rounded-lg border border-gold/20 bg-white/70 px-4 py-3 text-sm text-charcoalDark placeholder-charcoal/35 outline-none transition-colors focus:border-gold"
          />
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="w-full rounded-lg border border-gold/20 bg-white/70 px-4 py-3 text-sm text-charcoalDark placeholder-charcoal/35 outline-none transition-colors focus:border-gold"
          />
          <textarea
            id="message"
            name="message"
            required
            placeholder="How can we collaborate?"
            className="h-28 w-full resize-none rounded-lg border border-gold/20 bg-white/70 px-4 py-3 text-sm text-charcoalDark placeholder-charcoal/35 outline-none transition-colors focus:border-gold"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-gradient px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
            {status !== 'sending' && <Send className="h-4 w-4" />}
          </button>

          {status === 'success' && (
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-gold-dark">
              <CheckCircle2 className="h-4 w-4" /> Message sent — I will get back to you shortly.
            </p>
          )}
          {status === 'error' && (
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-red-500">
              <XCircle className="h-4 w-4" /> Network error — please try again.
            </p>
          )}
        </form>
      </motion.div>
    </section>
  )
}
