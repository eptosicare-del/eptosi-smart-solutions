'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, ChevronDown, Cpu, Wifi, Droplets, BarChart3 } from 'lucide-react';

const FLOATING_ICONS = [
  { icon: Cpu, label: 'IoT Core', x: '8%', y: '25%', delay: 0, color: '#0ea5e9' },
  { icon: Wifi, label: 'Connected', x: '88%', y: '20%', delay: 0.3, color: '#06b6d4' },
  { icon: Droplets, label: 'eptoFlow', x: '5%', y: '70%', delay: 0.6, color: '#22c55e' },
  { icon: BarChart3, label: 'Analytics', x: '90%', y: '68%', delay: 0.9, color: '#a78bfa' },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, rgba(6,182,212,0.06) 40%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Floating IoT device icons */}
      {FLOATING_ICONS.map(({ icon: Icon, label, x, y: yPos, delay, color }) => (
        <motion.div
          key={label}
          className="absolute hidden lg:flex flex-col items-center gap-1.5"
          style={{ left: x, top: yPos }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.8, duration: 0.6, ease: 'backOut' }}
        >
          <motion.div
            className="w-12 h-12 rounded-xl backdrop-blur-md border border-white/10 flex items-center justify-center"
            style={{ background: `${color}15`, borderColor: `${color}30` }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon size={20} style={{ color }} />
          </motion.div>
          <span className="text-[10px] text-slate-400 font-medium">{label}</span>
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-custom text-center pt-28 pb-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Part of Eptosi Group of Companies
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-white">Engineering</span>
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 35%, #06b6d4 65%, #22c55e 100%)',
              backgroundSize: '200% auto',
            }}
          >
            Smarter Futures
          </span>
          <br />
          <span className="text-white">with </span>
          <TypeAnimation
            sequence={[
              'IoT', 1500,
              'Automation', 1500,
              'AI Systems', 1500,
              'Smart Farming', 1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-sky-400"
          />
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          We build intelligent automation ecosystems for homes, agriculture and industries.
          From embedded systems to cloud dashboards — end-to-end IoT solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a href="#solutions" className="btn-primary group">
            <span className="flex items-center gap-2">
              Explore Solutions
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a href="#contact" className="btn-secondary flex items-center justify-center gap-2">
            Contact Us
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {[
            { val: '50+', label: 'Projects Delivered' },
            { val: '10+', label: 'IoT Products' },
            { val: '99%', label: 'Uptime SLA' },
            { val: '5+', label: 'Industries Served' },
          ].map((s) => (
            <div
              key={s.label}
              className="px-4 py-3 rounded-xl border border-white/10 backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <p className="text-2xl font-bold text-white mb-0.5">{s.val}</p>
              <p className="text-xs text-slate-400 leading-tight">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} className="text-sky-400 opacity-60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
