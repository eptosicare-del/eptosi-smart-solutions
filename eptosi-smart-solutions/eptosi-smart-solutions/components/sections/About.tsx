'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Layers, Globe, Rocket } from 'lucide-react';
import CountUp from 'react-countup';

const PILLARS = [
  { icon: Target, title: 'Innovation-Driven', desc: 'Every product we ship is built around solving real-world problems with breakthrough technology.' },
  { icon: Layers, title: 'IoT-Focused Engineering', desc: 'Deep expertise in embedded systems, microcontrollers, sensors, and cloud connectivity.' },
  { icon: Globe, title: 'Scalable Smart Systems', desc: 'Architecture designed to grow from a single device to thousands of connected nodes.' },
  { icon: Rocket, title: 'Automation-First', desc: 'We replace manual processes with intelligent, self-managing automated workflows.' },
];

const STATS = [
  { end: 50, suffix: '+', label: 'Projects Delivered' },
  { end: 10, suffix: '+', label: 'IoT Products Built' },
  { end: 5, suffix: '+', label: 'Industries Served' },
  { end: 99, suffix: '%', label: 'Client Satisfaction' },
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(14,165,233,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34,197,94,0.06) 0%, transparent 40%)',
      }} />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-tag mb-4 inline-block"
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title mb-6"
          >
            Building the{' '}
            <span className="gradient-text-blue">Intelligence</span>
            <br />
            Behind Smart Systems
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-subtitle mx-auto text-center"
          >
            Eptosi Smart Solutions — part of the{' '}
            <span className="text-sky-400 font-semibold">Eptosi Group of Companies</span> — is an
            innovation-driven IoT engineering firm building scalable automation ecosystems that
            reshape how industries operate.
          </motion.p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Animated IoT diagram */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Central hub */}
              <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-sky-500/30 to-cyan-500/30 border border-sky-500/40 flex items-center justify-center backdrop-blur-sm z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[-8px] rounded-full border border-dashed border-sky-500/20"
                />
                <div className="text-center">
                  <span className="text-sky-400 font-bold text-xs block">EPTOSI</span>
                  <span className="text-slate-400 text-[10px]">IoT Hub</span>
                </div>
              </div>

              {/* Orbit rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[15%] rounded-full border border-sky-500/15"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-cyan-500/10"
              />

              {/* Orbiting nodes */}
              {[
                { label: '🌾', name: 'Agriculture', angle: 0 },
                { label: '🏭', name: 'Industrial', angle: 72 },
                { label: '💧', name: 'Water', angle: 144 },
                { label: '🏠', name: 'Smart Home', angle: 216 },
                { label: '📡', name: 'Monitoring', angle: 288 },
              ].map(({ label, name, angle }) => (
                <motion.div
                  key={name}
                  className="absolute"
                  style={{
                    top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 42}% - 20px)`,
                    left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 42}% - 20px)`,
                  }}
                  animate={{
                    top: [
                      `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 42}% - 20px)`,
                      `calc(50% + ${Math.sin(((angle + 360) * Math.PI) / 180) * 42}% - 20px)`,
                    ],
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-lg">
                    <span className="text-lg">{label}</span>
                  </div>
                  <span className="block text-center text-[9px] text-slate-400 mt-1 whitespace-nowrap">{name}</span>
                </motion.div>
              ))}

              {/* Data flow lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                {[0, 72, 144, 216, 288].map((angle) => (
                  <motion.line
                    key={angle}
                    x1="200"
                    y1="200"
                    x2={200 + Math.cos((angle * Math.PI) / 180) * 168}
                    y2={200 + Math.sin((angle * Math.PI) / 180) * 168}
                    stroke="rgba(14,165,233,0.15)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>

          {/* Right: Text content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <p className="text-slate-300 text-lg leading-relaxed">
                Founded as part of the <span className="text-sky-400 font-semibold">Eptosi Group</span>,
                we specialize in building end-to-end IoT solutions — from hardware design and firmware
                development to cloud platforms and mobile dashboards.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Our flagship product <span className="text-green-400 font-semibold">eptoFlow</span> demonstrates
                our capability to deliver production-ready, market-proven IoT ecosystems that solve
                real problems for real users.
              </p>
            </motion.div>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PILLARS.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="p-4 rounded-xl border border-white/10 hover:border-sky-500/30 transition-all duration-300 group"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-500/15 flex items-center justify-center mb-3 group-hover:bg-sky-500/25 transition-colors">
                    <Icon size={16} className="text-sky-400" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10"
          style={{ background: 'rgba(14,165,233,0.05)' }}
        >
          {STATS.map(({ end, suffix, label }) => (
            <div
              key={label}
              className="px-8 py-8 text-center"
              style={{ background: 'rgba(3,7,18,0.6)' }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <span className="text-white">
                  {inView ? <CountUp end={end} duration={2.5} /> : '0'}
                </span>
                <span className="text-sky-400">{suffix}</span>
              </div>
              <p className="text-slate-400 text-sm">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
