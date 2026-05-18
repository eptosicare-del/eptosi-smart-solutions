'use client';

import { motion } from 'framer-motion';
import { Zap, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const SOLUTIONS = [
  'eptoFlow', 'Smart Irrigation', 'Water Automation',
  'IoT Monitoring', 'Smart Agriculture', 'Industrial IoT',
];
const COMPANY = [
  { label: 'About Us', href: '#about' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'eptoFlow', href: '#eptoflow' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
  { label: 'Admin', href: '/admin/login' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 pt-20 pb-10 mt-0">
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(14,165,233,0.08) 0%, transparent 70%)' }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center">
                <Zap size={18} className="text-white" fill="currentColor" />
              </div>
              <div>
                <span className="block text-base font-bold text-white leading-none">EPTOSI</span>
                <span className="block text-[10px] text-sky-400 font-semibold tracking-widest uppercase leading-none mt-0.5">Smart Solutions</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Smart IoT & Automation Solutions for the Future. Part of Eptosi Group of Companies.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-sky-300 font-medium">Eptosi Group Company</span>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-3">
              {SOLUTIONS.map((s) => (
                <li key={s}>
                  <a href="#solutions" className="text-slate-400 hover:text-sky-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-sky-500/50 group-hover:bg-sky-400 transition-colors" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {COMPANY.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="text-slate-400 hover:text-sky-400 text-sm transition-colors duration-200 flex items-center gap-1 group">
                    {c.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={13} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:enquries@eptosismartsolutions.com" className="text-slate-300 hover:text-sky-400 text-sm transition-colors">
                    enquries@eptosismartsolutions.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={13} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                  <a href="tel:+916369129995" className="text-slate-300 hover:text-sky-400 text-sm transition-colors">
                    +91 63691 29995
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={13} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Location</p>
                  <span className="text-slate-300 text-sm">No.2 Janaki Nagar, Maduravoyal,<br />Chennai — 600 095</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Eptosi Smart Solutions. All rights reserved. · Part of{' '}
            <span className="text-sky-400">Eptosi Group</span>
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
