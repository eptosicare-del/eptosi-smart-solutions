'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Deep layered background ── */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Central glow — large, soft */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(14,165,233,0.13) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Bottom green accent */}
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)' }}
        animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* ── Main content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-custom text-center pt-40 pb-24 max-w-5xl mx-auto"
      >
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1 className="font-bold leading-[1.08] tracking-tight mb-7">
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-[82px] text-white mb-2"
              style={{ letterSpacing: '-0.02em' }}
            >
              Engineering
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-[82px] mb-2"
              style={{
                letterSpacing: '-0.02em',
                backgroundImage: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 40%, #06b6d4 70%, #22c55e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Smarter Futures
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-[82px] text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              with{' '}
              <TypeAnimation
                sequence={['IoT', 1800, 'Automation', 1800, 'AI Systems', 1800, 'Smart Farming', 1800]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
                style={{ color: '#38bdf8' }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12 max-w-xl mx-auto"
        >
          We build intelligent automation ecosystems for homes,
          agriculture and industries — from embedded hardware to cloud dashboards.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <a
            href="#solutions"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-[15px] transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              boxShadow: '0 0 0 0 rgba(14,165,233,0)',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 30px rgba(14,165,233,0.35)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 0 rgba(14,165,233,0)')}
          >
            Explore Solutions
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-slate-300 text-[15px] border border-white/15 hover:border-white/30 hover:text-white transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            Contact Us
          </a>
        </motion.div>

        {/* ── Premium stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-0 max-w-2xl mx-auto rounded-2xl border border-white/[0.08] overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(12px)' }}
        >
          {[
            { val: '50+', label: 'Projects Delivered' },
            { val: '10+', label: 'IoT Products' },
            { val: '99%', label: 'Uptime SLA' },
            { val: '5+', label: 'Industries' },
          ].map((s, i) => (
            <div
              key={s.label}
              className="flex-1 min-w-[100px] px-6 py-5 text-center relative"
            >
              {i > 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10" />
              )}
              <p className="text-2xl font-bold text-white mb-0.5">{s.val}</p>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Trusted by strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <p className="text-slate-600 text-xs uppercase tracking-[0.2em] font-medium">Trusted for</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Smart Agriculture', 'Industrial IoT', 'Water Automation', 'Embedded Systems', 'AI Automation'].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-400 border border-white/[0.07]"
                style={{ background: 'rgba(255,255,255,0.025)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-slate-600 tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
