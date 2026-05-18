'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Droplets, Smartphone, Clock, Wifi, BarChart2, Settings, ArrowRight } from 'lucide-react';

const FEATURES = [
  { icon: Droplets, title: 'Automated Watering', desc: 'Sensor-based triggers control water flow with zero manual intervention.' },
  { icon: Clock, title: 'Smart Scheduling', desc: 'Set custom watering schedules based on time, moisture, or weather data.' },
  { icon: Smartphone, title: 'Remote Access', desc: 'Monitor and control your system from anywhere via mobile or web.' },
  { icon: BarChart2, title: 'Live Monitoring', desc: 'Real-time sensor data, flow rates, and usage analytics.' },
  { icon: Wifi, title: 'IoT Connected', desc: 'Seamless device-to-cloud communication with MQTT and REST APIs.' },
  { icon: Settings, title: 'Device Management', desc: 'Manage multiple devices, configure zones, and update firmware OTA.' },
];

export default function EptoFlow() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="eptoflow" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(14,165,233,0.06) 0%, transparent 60%)',
      }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-green-500/30 bg-green-500/10 text-green-300">
              <Droplets size={14} className="text-green-400" />
              Flagship Product
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            Introducing{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #22c55e, #06b6d4)' }}
            >
              eptoFlow
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto text-center"
          >
            A complete smart plant watering automation ecosystem — from IoT hardware
            sensors to a real-time web dashboard.
          </motion.p>
        </div>

        {/* Main showcase */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Dashboard card */}
            <div
              className="rounded-2xl border border-green-500/20 overflow-hidden shadow-2xl"
              style={{ background: '#0a1628' }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-[11px] text-slate-400 font-mono">eptoflow.app — Dashboard</span>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-5 space-y-4">
                {/* Status bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-green-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-green-400 text-xs font-medium">System Active</span>
                  </div>
                  <span className="text-slate-400 text-xs">3 devices online</span>
                </div>

                {/* Sensor cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Moisture', value: '68%', color: '#22c55e', bar: 68 },
                    { label: 'Flow Rate', value: '2.4 L/m', color: '#0ea5e9', bar: 45 },
                    { label: 'Tank Level', value: '82%', color: '#06b6d4', bar: 82 },
                  ].map(({ label, value, color, bar }) => (
                    <div
                      key={label}
                      className="rounded-xl p-3 border border-white/5"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <p className="text-[10px] text-slate-400 mb-1">{label}</p>
                      <p className="text-white font-bold text-sm mb-2" style={{ color }}>{value}</p>
                      <div className="h-1 rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: color, width: `${bar}%` }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${bar}%` } : {}}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Watering schedule */}
                <div className="rounded-xl border border-white/5 p-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <p className="text-[10px] text-slate-400 mb-3 uppercase tracking-wider">Watering Schedule</p>
                  <div className="space-y-2">
                    {[
                      { zone: 'Zone A — Garden', time: '06:00 AM', status: 'completed', color: '#22c55e' },
                      { zone: 'Zone B — Crops', time: '12:00 PM', status: 'active', color: '#0ea5e9' },
                      { zone: 'Zone C — Greenhouse', time: '06:00 PM', status: 'scheduled', color: '#94a3b8' },
                    ].map(({ zone, time, status, color }) => (
                      <div key={zone} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                          <span className="text-slate-300 text-xs">{zone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 text-[10px] font-mono">{time}</span>
                          <span
                            className="text-[9px] px-1.5 py-0.5 rounded-full font-medium capitalize"
                            style={{ background: `${color}20`, color }}
                          >{status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Animated flow visualization */}
                <div className="relative h-10 rounded-xl border border-white/5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="absolute inset-0 flex items-center px-4 gap-2">
                    <Droplets size={12} className="text-sky-400" />
                    <span className="text-[10px] text-slate-400">Water Flow — Live</span>
                    <div className="flex-1 h-0.5 rounded-full overflow-hidden bg-white/5">
                      <motion.div
                        className="h-full"
                        style={{ background: 'linear-gradient(90deg, transparent, #0ea5e9, #22c55e, transparent)' }}
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                    <span className="text-[10px] text-green-400 font-mono font-bold">ON</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm"
            >
              <span className="text-green-400 text-xs font-semibold">🚀 Production-Ready</span>
            </motion.div>
          </motion.div>

          {/* Right: Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Complete Smart Watering Ecosystem
              </h3>
              <p className="text-slate-400 leading-relaxed">
                eptoFlow combines IoT hardware with a powerful cloud platform to deliver
                fully automated, remotely managed plant watering — for homes, greenhouses,
                and large-scale agriculture.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {FEATURES.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-white/8 hover:border-green-500/30 transition-all duration-300 group"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="w-9 h-9 rounded-lg bg-green-500/15 border border-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/25 transition-colors">
                    <Icon size={16} className="text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm mb-0.5">{title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="flex gap-3"
            >
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-green-500/30"
              >
                Request eptoFlow Demo
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Architecture flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-white/10 p-8"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <h4 className="text-white font-semibold text-center mb-8">How eptoFlow Works</h4>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
            {[
              { label: 'Soil Sensor', icon: '🌱', sub: 'Moisture & pH' },
              { label: 'Microcontroller', icon: '⚡', sub: 'ESP32 / Arduino' },
              { label: 'Cloud Platform', icon: '☁️', sub: 'MQTT + REST API' },
              { label: 'Web Dashboard', icon: '📊', sub: 'Real-time UI' },
              { label: 'Water Valve', icon: '💧', sub: 'Auto-controlled' },
            ].map((node, i) => (
              <div key={node.label} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-14 h-14 rounded-xl border border-white/10 flex items-center justify-center text-2xl mb-2"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    {node.icon}
                  </div>
                  <span className="text-white text-xs font-medium">{node.label}</span>
                  <span className="text-slate-500 text-[10px]">{node.sub}</span>
                </div>
                {i < 4 && (
                  <div className="hidden sm:flex items-center mx-3">
                    <motion.div
                      className="w-8 h-0.5"
                      style={{ background: 'linear-gradient(90deg, rgba(14,165,233,0.5), rgba(34,197,94,0.5))' }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    />
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
