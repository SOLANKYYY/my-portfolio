import { motion } from 'framer-motion'
import { GraduationCap, School } from 'lucide-react'
import { education } from '../data/portfolio'

const icons = { 'graduation-cap': GraduationCap, school: School }

export default function Education() {
  return (
    <section id="education" className="section-shell pb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-8 text-center"
      >
        <h2 className="font-heading text-3xl font-bold text-charcoalDark">Academic Roots</h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {education.map((edu, i) => {
          const Icon = icons[edu.icon]
          return (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: i === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="glass-panel glass-panel-hover p-8"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="rounded-xl border border-gold/25 bg-gold/10 p-3 text-gold-dark">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-charcoalDark">{edu.institution}</h3>
              </div>
              <p className="mb-4 font-semibold text-charcoal/70">
                {edu.degree}
                {edu.period && <span className="ml-2 text-sm font-normal text-charcoal/40">({edu.period})</span>}
              </p>
              <div className="border-l-2 border-gold/40 pl-4 text-sm font-medium text-charcoalDark">
                {edu.detail} <span className="ml-1 font-bold text-gold-dark">{edu.stat}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
