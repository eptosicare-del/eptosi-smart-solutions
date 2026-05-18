'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Scale, Activity, GraduationCap, Zap, Shield } from 'lucide-react';

const REASONS = [
  {
    icon: Cpu,
    title: 'Smart Engineering',
    description: 'Every solution we build is engineered for performance, reliability, and longevity — not just proof-of-concept.',
    color: '#0ea5e9',
    gradient: 'from-sky-500/20 to-sky-500/5',
  },
  {
    icon: Scale,
    title: 'Scalable Solutions',
    description: 'Our architecture scales from a single device to thousands of nodes without a redesign.',
    color: '#22c55e',
    gradient: 'from-green-500/20 to-green-500/5',
  },
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description: 'Live dashboards with sub-second data refresh — know exactly what\'s happening across your entire system.',
    color: '#06b6d4',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
  },
  {
    icon: GraduationCap,
    title: 'Deep IoT Expertise',
    description: 'Years of hands-on experience in embedded systems, wireless protocols, cloud IoT, and industrial automation.',
    color: '#a78bfa',
    gradient: 'from-violet-500/20 to-violet-500/5',
  },
  {
    icon: Zap,
    title: 'Automation First',
    description: 'We eliminate manual workflows by replacing them with intelligent, self-managing automated systems.',
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-amber-500/5',
  },
  {
    icon: Shield,
    title: 'Future-Ready Systems',
    description: 'OTA updates, modular firmware, and cloud-native design ensure your system evolves with technology.',
    color: '#f43f5e',
    gradient: 'from-rose-500/20 to-rose-500/5',
  },
];

export default function WhyChooseUs() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="why-us" ref={ref} className="py-16 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(14,165,233,0.07) 0%, transparent 60%)',
      }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag mb-4 inline-block"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            Built for the{' '}
            <span className="gradient-text-blue">Long Term</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto text-center"
          >
            We don't just build products — we engineer partnerships. Here's why clients
            trust Eptosi Smart Solutions with their most critical automation needs.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map(({ icon: Icon, title, description, color, gradient }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-7 rounded-2xl border border-white/10 bg-gradient-to-br ${gradient} hover:border-opacity-50 transition-all duration-400 group overflow-hidden`}
              style={{ '--hover-color': color } as React.CSSProperties}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon size={22} style={{ color }} />
              </div>

              <h3 className="text-white font-semibold text-lg mb-3">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>

              {/* Number */}
              <div
                className="absolute bottom-5 right-5 text-6xl font-black opacity-5 group-hover:opacity-10 transition-opacity select-none"
                style={{ color }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Corner glow */}
              <div
                className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                style={{ background: color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 md:mt-20 rounded-2xl border border-sky-500/20 p-6 sm:p-10 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(6,182,212,0.04) 100%)' }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(14,165,233,0.15) 0%, transparent 60%)',
          }} />
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Automate Your World?
            </h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Whether you're a startup, an enterprise, or an individual with a vision —
              we have a solution that fits. Let's build something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                <span>Start Your Project</span>
              </a>
              <a href="#eptoflow" className="btn-secondary inline-flex items-center gap-2">
                See eptoFlow in Action
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
