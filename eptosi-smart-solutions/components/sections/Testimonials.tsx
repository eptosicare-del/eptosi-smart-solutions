'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    role: 'Farm Owner',
    company: 'GreenFields Agriculture, Tamil Nadu',
    message: 'eptoFlow transformed our farming operations. Water consumption dropped by 40% in the first month, and our yields improved significantly. The remote monitoring dashboard is a game-changer.',
    rating: 5,
    avatar: 'RK',
    gradient: 'from-green-500 to-cyan-500',
  },
  {
    name: 'Priya Sharma',
    role: 'Operations Director',
    company: 'TechManufacture Pvt. Ltd.',
    message: 'The industrial IoT monitoring system from Eptosi cut our downtime by 60%. Their team\'s expertise in embedded systems and cloud integration is exceptional.',
    rating: 5,
    avatar: 'PS',
    gradient: 'from-sky-500 to-violet-500',
  },
  {
    name: 'Arjun Nair',
    role: 'CTO',
    company: 'SmartHome Solutions',
    message: 'Working with Eptosi Smart Solutions was one of the best decisions we made. The team delivered a scalable IoT platform on time, on budget, and beyond our expectations.',
    rating: 5,
    avatar: 'AN',
    gradient: 'from-orange-500 to-rose-500',
  },
  {
    name: 'Meena Krishnan',
    role: 'Research Lead',
    company: 'AgriTech Institute, Chennai',
    message: 'The smart irrigation system they built for our research facility handles over 200 sensor nodes flawlessly. Real-time data accuracy and system reliability have been outstanding.',
    rating: 5,
    avatar: 'MK',
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
                  {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
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
