import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import { profile } from '../data/portfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  return (
    <section id="about" className="section-shell pb-28 pt-32 sm:pt-40 lg:pt-48">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-12 text-center"
      >
        <span className="eyebrow">01 — Identity</span>
        <h2 className="mt-3 font-heading text-4xl font-bold text-charcoalDark">About Me</h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="glass-panel glass-panel-hover flex flex-col items-center gap-10 p-8 md:flex-row md:p-12"
      >
        <div className="flex w-full flex-shrink-0 justify-center md:w-1/3">
          <div className="relative h-64 w-52 overflow-hidden rounded-2xl border border-gold/25 shadow-glow sm:h-72 sm:w-56">
            <img
              src={profile.photo}
              alt={profile.name}
              className="h-full w-full object-cover transition-all duration-500"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <p className="text-lg font-medium leading-relaxed text-charcoal/80">{profile.bio}</p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gold/15 bg-white/60 p-5">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-gold-dark">Identity</h4>
              <ul className="space-y-2 text-sm font-semibold text-charcoalDark">
                <li className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gold" /> DOB: {profile.dob}
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gold" /> Location: {profile.location}
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-gold/15 bg-white/60 p-5">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-gold-dark">Languages</h4>
              <ul className="space-y-2 text-sm font-semibold text-charcoalDark">
                {profile.languages.map((lang) => (
                  <li key={lang.name} className="flex items-center justify-between">
                    <span>{lang.name}</span>
                    <span
                      className={`rounded border px-2 py-0.5 text-[10px] uppercase ${
                        lang.level === 'Native'
                          ? 'border-gold/40 bg-gold/10 text-gold-dark'
                          : 'border-gold/15 text-charcoal/60'
                      }`}
                    >
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
