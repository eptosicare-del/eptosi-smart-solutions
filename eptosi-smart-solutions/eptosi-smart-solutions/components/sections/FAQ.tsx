'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    question: 'What industries do you serve?',
    answer: 'We serve agriculture, manufacturing, smart home, water management, healthcare, and industrial automation sectors. Our IoT solutions are adaptable to virtually any industry requiring intelligent monitoring or automation.',
  },
  {
    question: 'What is eptoFlow and how does it work?',
    answer: 'eptoFlow is our flagship smart plant watering automation system. It uses soil moisture sensors connected to a microcontroller (ESP32/Arduino) that communicates with our cloud platform via MQTT. Users can monitor sensor data and control water flow remotely through a web dashboard.',
  },
  {
    question: 'Do you build custom IoT solutions?',
    answer: 'Yes — custom IoT development is our core business. We handle the entire stack: hardware design, firmware development, cloud platform integration, and the user-facing dashboard. Submit an inquiry and our team will scope your project.',
  },
  {
    question: 'What communication protocols do you support?',
    answer: 'We work with MQTT, HTTP/REST, WebSockets, LoRaWAN, Zigbee, BLE, and Wi-Fi. Protocol choice depends on your range, power, and data-rate requirements — we recommend the best fit for your use case.',
  },
  {
    question: 'How scalable are your IoT platforms?',
    answer: 'Our cloud architecture is designed from day one to scale. We use message brokers and cloud-native services that can handle thousands of concurrent device connections. We\'ve tested platforms up to 10,000+ nodes.',
  },
  {
    question: 'Do you offer maintenance and support after delivery?',
    answer: 'Yes. We offer post-delivery support packages including OTA firmware updates, bug fixes, platform monitoring, and feature enhancements. We treat every client as a long-term partner.',
  },
  {
    question: 'Can I see a live demo of eptoFlow?',
    answer: 'Absolutely! Contact us through the form below and mention you\'re interested in an eptoFlow demo. Our team will schedule a live walkthrough of the hardware and web dashboard.',
  },
  {
    question: 'Where is Eptosi Smart Solutions based?',
    answer: 'We\'re headquartered in Chennai, Tamil Nadu, India — and part of the Eptosi Group of Companies. We serve clients across India and internationally through remote collaboration.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="faq" ref={ref} className="py-32 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag mb-4 inline-block"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            Frequently Asked{' '}
            <span className="gradient-text-blue">Questions</span>
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map(({ question, answer }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                open === i ? 'border-sky-500/30' : 'border-white/10 hover:border-white/20'
              }`}
              style={{ background: open === i ? 'rgba(14,165,233,0.05)' : 'rgba(255,255,255,0.02)' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className={`font-medium text-sm md:text-base transition-colors ${open === i ? 'text-white' : 'text-slate-200'}`}>
                  {question}
                </span>
                <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                  open === i ? 'bg-sky-500 text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  {open === i ? <Minus size={12} /> : <Plus size={12} />}
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">
                      {answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
