import React, { useEffect, useRef } from 'react';
import {
  FileText,
  BookOpen,
  Calendar,
  Sparkles,
  CheckSquare,
  Bookmark,
  Layers,
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const LivingAcademicUniverse: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Motion Values for mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Springs to smooth out mouse movement
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  // Transforms for each hover element declared at top level
  const pdfX = useTransform(springX, (val) => val * 0.03);
  const pdfY = useTransform(springY, (val) => val * 0.03);

  const bookX = useTransform(springX, (val) => val * -0.02);
  const bookY = useTransform(springY, (val) => val * -0.02);

  const notesX = useTransform(springX, (val) => val * 0.04);
  const notesY = useTransform(springY, (val) => val * 0.04);

  const flashcardsX = useTransform(springX, (val) => val * -0.035);
  const flashcardsY = useTransform(springY, (val) => val * -0.035);

  const calendarX = useTransform(springX, (val) => val * -0.015);
  const calendarY = useTransform(springY, (val) => val * -0.015);

  const sparksX = useTransform(springX, (val) => val * 0.025);
  const sparksY = useTransform(springY, (val) => val * 0.025);

  const assignmentX = useTransform(springX, (val) => val * 0.035);
  const assignmentY = useTransform(springY, (val) => val * 0.035);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track mouse position
    let rawMouseX = width / 2;
    let rawMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX = e.clientX;
      rawMouseY = e.clientY;
      
      // Update motion values normalized to center
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
      
      // Update global CSS custom properties for spotlight effects
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle nodes config
    const numParticles = 45;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.5 + 0.8,
      alpha: Math.random() * 0.12 + 0.04,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle network with high-performance drawing commands
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Subtle mouse parallax attraction
        const dx = rawMouseX - p1.x;
        const dy = rawMouseY - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p1.x += dx * 0.0015;
          p1.y += dy * 0.0015;
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 252, ${p1.alpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pdx = p1.x - p2.x;
          const pdy = p1.y - p2.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pdist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.05 * (1 - pdist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [mouseX, mouseY]);

  // 7 Floating holographic objects mapping
  const holographicObjects = [
    { id: 'pdf', icon: <FileText className="w-4 h-4 text-indigo-400" />, top: '15%', left: '8%', x: pdfX, y: pdfY },
    { id: 'book', icon: <BookOpen className="w-4 h-4 text-purple-400" />, top: '25%', right: '10%', x: bookX, y: bookY },
    { id: 'notes', icon: <Bookmark className="w-4 h-4 text-emerald-400" />, top: '65%', left: '6%', x: notesX, y: notesY },
    { id: 'flashcards', icon: <Layers className="w-4 h-4 text-cyan-400" />, top: '80%', right: '12%', x: flashcardsX, y: flashcardsY },
    { id: 'calendar', icon: <Calendar className="w-4 h-4 text-amber-400" />, top: '45%', right: '5%', x: calendarX, y: calendarY },
    { id: 'sparks', icon: <Sparkles className="w-4 h-4 text-indigo-400" />, top: '40%', left: '5%', x: sparksX, y: sparksY },
    { id: 'assignment', icon: <CheckSquare className="w-4 h-4 text-rose-400" />, top: '85%', left: '18%', x: assignmentX, y: assignmentY },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-slate-50 dark:bg-[#08080a]">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 bg-radial-at-t from-indigo-500/5 via-transparent to-transparent opacity-60 dark:opacity-40" />
      
      {/* Animated Light Blobs */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 dark:bg-indigo-600/5 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-[10%] -right-[10%] w-[45%] h-[45%] rounded-full bg-purple-500/5 dark:bg-purple-600/5 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Particle Canvas Network */}
      <canvas ref={canvasRef} className="w-full h-full opacity-60 dark:opacity-80" />

      {/* Floating Holographic Icons with Spring Mouse Parallax */}
      {holographicObjects.map((obj) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          top: obj.top,
          left: obj.left,
          right: obj.right,
          transform: 'translate(-50%, -50%)',
        };

        return (
          <motion.div
            key={obj.id}
            style={{
              ...style,
              x: obj.x,
              y: obj.y,
            }}
            className="p-2.5 rounded-xl bg-white/40 dark:bg-zinc-900/30 border border-slate-200/20 dark:border-white/[0.04] shadow-2xs backdrop-blur-xs opacity-35 dark:opacity-40 transition-shadow duration-300 hover:opacity-100 hover:shadow-md"
          >
            {obj.icon}
          </motion.div>
        );
      })}

      {/* Animated Spotlight Overlay */}
      <div 
        className="absolute inset-0 opacity-100 dark:opacity-60 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 280px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.05), transparent 80%)`
        }}
      />
    </div>
  );
};
