import { motion } from 'framer-motion'
import { Briefcase, Award } from 'lucide-react'
import { experience, hackathons } from '../data/portfolio'

function TimelineTrack({ title, icon: Icon, items, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      <h2 className="mb-10 flex items-center gap-3 border-b border-gold/15 pb-3 font-heading text-3xl font-bold text-charcoalDark">
        <Icon className="h-6 w-6 text-gold-dark" /> {title}
      </h2>
      <div className="ml-2 space-y-10 border-l-2 border-gold/20 pl-6">
        {items.map((item) => (
          <div key={item.title} className="relative">
            <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-page bg-brand-gradient" />
            <h3 className="text-xl font-bold text-charcoalDark">{item.title}</h3>
            <p className="mb-2 font-mono text-sm text-gold-dark">
              {item.org}
              {item.org && <span className="mx-1.5 text-charcoal/30">·</span>}
              <span className="font-normal text-charcoal/40">{item.period}</span>
            </p>
            <p className="text-sm font-medium text-charcoal/70">{item.detail}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const hackathonItems = hackathons.map((h) => ({ ...h, org: '' }))

  return (
    <section id="experience" className="section-shell py-28">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <TimelineTrack title="Professional Experience" icon={Briefcase} items={experience} />
        <TimelineTrack title="Hackathons" icon={Award} items={hackathonItems} delay={0.1} />
      </div>
    </section>
  )
}
