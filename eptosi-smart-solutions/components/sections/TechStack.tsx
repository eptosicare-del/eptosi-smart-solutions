'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TECH_CATEGORIES = [
  {
    category: 'Hardware & Firmware',
    items: [
      { name: 'ESP32', icon: '⚡' },
      { name: 'Arduino', icon: '🔌' },
      { name: 'Raspberry Pi', icon: '🍓' },
      { name: 'RTOS', icon: '⏱️' },
      { name: 'C/C++', icon: '⚙️' },
    ],
  },
  {
    category: 'Connectivity',
    items: [
      { name: 'MQTT', icon: '📡' },
      { name: 'LoRaWAN', icon: '📶' },
      { name: 'Zigbee', icon: '🔗' },
      { name: 'Wi-Fi / BLE', icon: '🛜' },
      { name: 'REST APIs', icon: '🌐' },
    ],
  },
  {
    category: 'Cloud & Backend',
    items: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Python', icon: '🐍' },
      { name: 'Supabase', icon: '⚡' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'Docker', icon: '🐳' },
    ],
  },
  {
    category: 'Frontend & Apps',
    items: [
      { name: 'Next.js', icon: '▲' },
      { name: 'React', icon: '⚛️' },
      { name: 'React Native', icon: '📱' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'TypeScript', icon: '💙' },
    ],
  },
];

export default function TechStack() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="tech" ref={ref} className="py-24 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag mb-4 inline-block"
          >
            Technology Stack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Built with{' '}
            <span className="gradient-text-blue">Industry-Leading</span> Tech
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_CATEGORIES.map(({ category, items }, ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.12 }}
              className="p-6 rounded-2xl border border-white/10"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <h4 className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-5">{category}</h4>
              <div className="space-y-3">
                {items.map(({ name, icon }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: ci * 0.12 + i * 0.06 }}
                    className="flex items-center gap-3 group"
                  >
                    <span className="text-xl w-7 text-center">{icon}</span>
                    <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
