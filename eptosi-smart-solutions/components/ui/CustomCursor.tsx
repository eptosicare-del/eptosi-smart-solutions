'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { damping: 20, stiffness: 800 });
  const dotY = useSpring(mouseY, { damping: 20, stiffness: 800 });
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 1024) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);

    window.addEventListener('mousemove', moveCursor);

    const els = document.querySelectorAll('a, button, [role="button"]');
    els.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      els.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small dot — follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 6 : 5,
          height: isHovered ? 6 : 5,
          background: isHovered ? '#22c55e' : '#38bdf8',
          transition: 'width 0.2s, height 0.2s, background 0.2s',
        }}
      />
      {/* Outer ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 44 : 28,
          height: isHovered ? 44 : 28,
          border: `1.5px solid ${isHovered ? 'rgba(34,197,94,0.6)' : 'rgba(56,189,248,0.4)'}`,
          background: isHovered ? 'rgba(34,197,94,0.05)' : 'transparent',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s, background 0.3s',
        }}
      />
    </>
  );
}
