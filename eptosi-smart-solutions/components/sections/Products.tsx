'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Droplets, Wifi, Cpu, BarChart3, Leaf, Factory, Brain, Radio } from 'lucide-react';

const PRODUCTS = [
  {
    icon: Droplets,
    title: 'eptoFlow',
    description: 'Smart plant watering automation ecosystem with IoT hardware, automated scheduling, and a web dashboard for remote control.',
    gradient: 'from-green-500/20 to-cyan-500/10',
    border: 'border-green-500/30',
    iconColor: '#22c55e',
    tag: 'LIVE PRODUCT',
    tagColor: '#22c55e',
  },
  {
    icon: Leaf,
    title: 'Smart Agriculture',
    description: 'Precision farming solutions using sensors, automation, and AI to optimize crop yields and reduce water consumption.',
    gradient: 'from-emerald-500/15 to-teal-500/10',
    border: 'border-emerald-500/20',
    iconColor: '#10b981',
    tag: 'IN DEVELOPMENT',
    tagColor: '#0ea5e9',
  },
  {
    icon: Droplets,
    title: 'Water Automation',
    description: 'Intelligent water flow management systems with real-time monitoring, leak detection, and automated control valves.',
    gradient: 'from-sky-500/15 to-blue-500/10',
    border: 'border-sky-500/20',
    iconColor: '#0ea5e9',
  },
  {
    icon: Wifi,
    title: 'IoT Monitoring',
    description: 'End-to-end monitoring platforms for remote assets — real-time data, alerts, dashboards, and predictive insights.',
    gradient: 'from-violet-500/15 to-purple-500/10',
    border: 'border-violet-500/20',
    iconColor: '#8b5cf6',
  },
  {
    icon: Factory,
    title: 'Industrial IoT',
    description: 'Industrial-grade automation for manufacturing plants — machine monitoring, process control, and OEE optimization.',
    gradient: 'from-orange-500/15 to-amber-500/10',
    border: 'border-orange-500/20',
    iconColor: '#f97316',
  },
  {
    icon: Cpu,
    title: 'Embedded Systems',
    description: 'Custom firmware and hardware design using microcontrollers, RTOS, and edge computing for any application.',
    gradient: 'from-rose-500/15 to-pink-500/10',
    border: 'border-rose-500/20',
    iconColor: '#f43f5e',
  },
  {
    icon: Brain,
    title: 'AI Automation',
    description: 'Machine learning models integrated into automation pipelines for predictive maintenance and intelligent decision-making.',
    gradient: 'from-cyan-500/15 to-sky-500/10',
    border: 'border-cyan-500/20',
    iconColor: '#06b6d4',
  },
  {
    icon: BarChart3,
    title: 'Monitoring Platforms',
    description: 'Cloud-native dashboards and analytics platforms with real-time telemetry, custom alerts, and historical trends.',
    gradient: 'from-indigo-500/15 to-blue-500/10',
    border: 'border-indigo-500/20',
    iconColor: '#6366f1',
  },
];

export default function Products() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="solutions" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(14,165,233,0.15) 0%, transparent 50%)',
      }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag mb-4 inline-block"
          >
            Products & Solutions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            What We{' '}
            <span className="gradient-text-blue">Build</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto text-center"
          >
            From a single sensor to an enterprise-scale IoT deployment — we engineer
            intelligent solutions across every vertical.
          </motion.p>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PRODUCTS.map(({ icon: Icon, title, description, gradient, border, iconColor, tag, tagColor }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`relative p-6 rounded-2xl border ${border} bg-gradient-to-br ${gradient} hover:scale-[1.02] hover:shadow-2xl transition-all duration-400 group backdrop-blur-sm`}
            >
              {/* Tag */}
              {tag && (
                <div
                  className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase"
                  style={{ background: `${tagColor}20`, color: tagColor, border: `1px solid ${tagColor}40` }}
                >
                  {tag}
                </div>
              )}

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${iconColor}15`, border: `1px solid ${iconColor}30` }}
              >
                <Icon size={22} style={{ color: iconColor }} />
              </div>

              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>

              {/* Hover shimmer */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${iconColor}08, transparent 70%)` }} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-14"
        >
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            <span>Discuss Your Project</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
