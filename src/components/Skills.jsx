import { motion } from 'framer-motion'
import { BrainCircuit, Server, Code2, LayoutTemplate } from 'lucide-react'
import { skillGroups } from '../data/portfolio'

const icons = {
  'brain-circuit': BrainCircuit,
  server: Server,
  'code-2': Code2,
  'layout-template': LayoutTemplate,
}

export default function Skills() {
  return (
    <section id="arsenal" className="section-shell py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-12 text-center"
      >
        <span className="eyebrow">02 — Stack</span>
        <h2 className="mt-3 font-heading text-4xl font-bold text-charcoalDark sm:text-5xl">
          Technical <span className="brand-text">Arsenal</span>
        </h2>
      </motion.div>

      <div className="space-y-6">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.icon]
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="glass-panel p-6 sm:p-7"
            >
              <h3 className="mb-5 flex items-center gap-3 border-b border-gold/15 pb-3 font-heading text-xl font-bold text-charcoalDark">
                <Icon className="h-6 w-6 text-gold-dark" /> {group.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ y: -3, scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="pill"
                  >
                    {skill}
                    {group.badgeMap?.[skill] && (
                      <span className="rounded bg-brand-gradient px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                        {group.badgeMap[skill]}
                      </span>
                    )}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
