/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#0ea5e9',
        'neon-green': '#22c55e',
        'cyber-cyan': '#06b6d4',
        'deep-space': '#030712',
        'space-800': '#0f172a',
        'space-700': '#1e293b',
        'glass': 'rgba(255,255,255,0.05)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #030712 0%, #0f172a 50%, #030712 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(6,182,212,0.05) 100%)',
        'glow-blue': 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)',
        'glow-green': 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'data-flow': 'dataFlow 4s linear infinite',
        'orbit': 'orbit 10s linear infinite',
        'orbit-reverse': 'orbit 15s linear infinite reverse',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px rgba(14,165,233,0.5), 0 0 20px rgba(14,165,233,0.3)' },
          to: { boxShadow: '0 0 20px rgba(14,165,233,0.8), 0 0 40px rgba(14,165,233,0.5), 0 0 60px rgba(14,165,233,0.3)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        dataFlow: {
          '0%': { transform: 'translateY(0) scaleY(1)', opacity: '1' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-100%) scaleY(0.5)', opacity: '0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(14,165,233,0.4)',
        'glow-green': '0 0 30px rgba(34,197,94,0.4)',
        'glow-cyan': '0 0 30px rgba(6,182,212,0.4)',
        'card': '0 8px 32px rgba(0,0,0,0.4)',
        'card-hover': '0 20px 60px rgba(14,165,233,0.2)',
      },
    },
  },
  plugins: [],
};
