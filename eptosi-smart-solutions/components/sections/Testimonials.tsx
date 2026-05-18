'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Suresh Babu',
    role: 'Farm Owner',
    company: 'Suresh Organic Farms, Coimbatore',
    message: 'Honestly, I was skeptical at first. But after using eptoFlow for two months, my water bill dropped noticeably and I stopped worrying about manually watering. The app is simple enough that even my farm workers figured it out quickly. A few minor bugs in the early days but the team fixed them fast.',
    rating: 4,
    avatar: 'SB',
    gradient: 'from-green-500 to-cyan-500',
  },
  {
    name: 'Divya Raghunathan',
    role: 'Production Manager',
    company: 'Precision Components Pvt. Ltd., Chennai',
    message: 'We needed machine uptime monitoring for our factory floor. Eptosi built us a custom dashboard that tracks 12 machines in real time. Setup took longer than expected — about 3 weeks — but the end result works reliably. The team was always responsive on WhatsApp whenever we had questions.',
    rating: 4,
    avatar: 'DR',
    gradient: 'from-sky-500 to-violet-500',
  },
  {
    name: 'Mohammed Imran',
    role: 'Co-founder',
    company: 'GreenGrow Hydroponics, Bengaluru',
    message: 'We\'re a small startup and needed an affordable automation solution for our hydroponic setup. Eptosi worked within our budget and didn\'t oversell. The sensor integration and scheduling features work exactly as described. Would definitely recommend for small agri-tech businesses.',
    rating: 5,
    avatar: 'MI',
    gradient: 'from-orange-500 to-rose-500',
  },
  {
    name: 'Kavitha Sundaram',
    role: 'Department Head — R&D',
    company: 'Tamil Nadu Agricultural University',
    message: 'We deployed their irrigation automation system across our experimental plots. The data logging and remote monitoring features have been genuinely useful for our research. One request: the export format for sensor data could be improved. Overall, solid product and helpful support.',
    rating: 4,
    avatar: 'KS',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section id="testimonials" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(14,165,233,0.1) 0%, transparent 50%)',
      }} />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag mb-4 inline-block"
          >
            Client Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            Trusted by{' '}
            <span className="gradient-text-blue">Innovators</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Card */}
          <div
            className="relative rounded-2xl border border-white/10 p-8 md:p-12"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <Quote size={40} className="text-sky-500/20 absolute top-6 left-8" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < TESTIMONIALS[current].rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700 fill-slate-700'}
                    />
                  ))}
                </div>

                <blockquote className="text-slate-200 text-lg leading-relaxed mb-8 italic">
                  "{TESTIMONIALS[current].message}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${TESTIMONIALS[current].gradient} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {TESTIMONIALS[current].avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{TESTIMONIALS[current].name}</p>
                    <p className="text-slate-400 text-sm">{TESTIMONIALS[current].role}</p>
                    <p className="text-sky-400 text-xs">{TESTIMONIALS[current].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="p-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-sky-500/40 hover:bg-sky-500/10 transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-6 h-2 bg-sky-400'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-sky-500/40 hover:bg-sky-500/10 transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
