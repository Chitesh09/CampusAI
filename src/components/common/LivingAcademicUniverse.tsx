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

export const LivingAcademicUniverse: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Mouse parallax tracking
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Low-opacity academic particle nodes
    const numParticles = 40;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 1,
      alpha: Math.random() * 0.15 + 0.05,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle network
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Subtle mouse parallax pull
        const dx = mouseX - p1.x;
        const dy = mouseY - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p1.x += dx * 0.002;
          p1.y += dy * 0.002;
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 252, ${p1.alpha})`;
        ctx.fill();

        // Connect nearby nodes with hairline beams
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pdx = p1.x - p2.x;
          const pdy = p1.y - p2.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pdist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.06 * (1 - pdist / 110)})`;
            ctx.lineWidth = 1;
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
  }, []);

  // 7 Floating Holographic Objects
  const holographicObjects = [
    { id: 'pdf', icon: <FileText className="w-4 h-4 text-indigo-400" />, top: '15%', left: '8%' },
    { id: 'book', icon: <BookOpen className="w-4 h-4 text-purple-400" />, top: '25%', right: '10%' },
    { id: 'notes', icon: <Bookmark className="w-4 h-4 text-emerald-400" />, top: '65%', left: '6%' },
    { id: 'flashcards', icon: <Layers className="w-4 h-4 text-cyan-400" />, top: '80%', right: '12%' },
    { id: 'calendar', icon: <Calendar className="w-4 h-4 text-amber-400" />, top: '45%', right: '5%' },
    { id: 'sparks', icon: <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />, top: '40%', left: '5%' },
    { id: 'assignment', icon: <CheckSquare className="w-4 h-4 text-rose-400" />, top: '85%', left: '18%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Particle Canvas Network */}
      <canvas ref={canvasRef} className="w-full h-full opacity-60 dark:opacity-80" />

      {/* Floating Holographic Icons */}
      {holographicObjects.map((obj) => (
        <div
          key={obj.id}
          style={{ top: obj.top, left: obj.left, right: obj.right }}
          className="absolute p-2 rounded-xl bg-slate-900/10 dark:bg-zinc-900/40 border border-slate-200/20 dark:border-white/[0.04] backdrop-blur-2xs opacity-30 dark:opacity-40 transition-transform duration-700 hover:scale-110"
        >
          {obj.icon}
        </div>
      ))}
    </div>
  );
};
