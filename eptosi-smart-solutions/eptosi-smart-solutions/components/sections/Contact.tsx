'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import type { ContactFormData } from '@/types';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-32 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 100%, rgba(14,165,233,0.08) 0%, transparent 60%)',
      }} />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag mb-4 inline-block"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            Let's Build{' '}
            <span className="gradient-text-blue">Together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto text-center"
          >
            Tell us about your project and we'll get back to you within 24–48 hours.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Contact Details</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Reach out through the form or contact us directly. We respond to all inquiries within one business day.
              </p>
            </div>

            {[
              { icon: Mail, label: 'Email', value: 'contact@eptosismartsolutions.com', href: 'mailto:contact@eptosismartsolutions.com' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
              { icon: MapPin, label: 'Address', value: 'Chennai, Tamil Nadu, India', href: '#' },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500/20 transition-colors">
                  <Icon size={16} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-slate-200 text-sm group-hover:text-sky-400 transition-colors">{value}</p>
                </div>
              </a>
            ))}

            {/* Response time */}
            <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-semibold">We're currently accepting new projects</span>
              </div>
              <p className="text-slate-400 text-xs">Average response time: under 24 hours</p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-white/10 p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle size={32} className="text-green-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">Inquiry Sent!</h3>
                    <p className="text-slate-400 text-sm">
                      Thank you! Our team will reach out within 24–48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Name + Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          placeholder="John Doe"
                          className="input-field"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                          Phone Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          {...register('phone', { required: 'Phone is required' })}
                          placeholder="+91 98765 43210"
                          className="input-field"
                        />
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>

                    {/* Email + Company */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                          })}
                          type="email"
                          placeholder="john@company.com"
                          className="input-field"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                          Company / Organization
                        </label>
                        <input
                          {...register('company')}
                          placeholder="Acme Corp (optional)"
                          className="input-field"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                        Your Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Please provide more detail' } })}
                        rows={5}
                        placeholder="Describe your project, the problem you're trying to solve, and any specific requirements..."
                        className="input-field resize-none"
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    {/* Error */}
                    {status === 'error' && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        <AlertCircle size={16} />
                        Something went wrong. Please try again or email us directly.
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span>
                        {status === 'loading' ? (
                          <Loader2 size={18} className="animate-spin inline mr-1" />
                        ) : (
                          <Send size={16} className="inline mr-1" />
                        )}
                        {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                      </span>
                    </button>

                    <p className="text-center text-xs text-slate-500">
                      By submitting, you agree to our Privacy Policy. We never share your data.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
