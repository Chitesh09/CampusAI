import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  CheckSquare,
  BookOpen,
  Calendar,
  BarChart2,
  Briefcase,
  FolderGit2,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export const LivingAICore: React.FC = () => {
  const { setCurrentView, assignments, attendanceRecords } = useApp();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [orbitAngle, setOrbitAngle] = useState(0);

  const pendingCount = assignments.filter((a) => a.status !== 'completed').length;
  const lowAttCount = attendanceRecords.filter((a) => a.percentage < 75).length;

  // 8 Workspace Cards
  const workspaceCards = [
    {
      id: 'study-planner',
      title: 'Study Workspace',
      subtitle: 'AI Revision Strategy',
      badge: '14 Days to DBMS',
      icon: <Layers className="w-4 h-4 text-indigo-400" />,
      targetView: 'study-planner',
    },
    {
      id: 'assignments',
      title: 'Assignments',
      subtitle: `${pendingCount} Pending Tasks`,
      badge: 'B+ Tree Due Aug 4',
      icon: <CheckSquare className="w-4 h-4 text-purple-400" />,
      targetView: 'assignments',
    },
    {
      id: 'smart-notes',
      title: 'Smart Notes',
      subtitle: 'Mind Maps & Summaries',
      badge: 'DBMS_Module3.pdf',
      icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
      targetView: 'smart-notes',
    },
    {
      id: 'timetable',
      title: 'Academic Calendar',
      subtitle: 'Classes & Exam Venues',
      badge: 'CS601 @ 09:00 AM',
      icon: <Calendar className="w-4 h-4 text-amber-400" />,
      targetView: 'timetable',
    },
    {
      id: 'attendance',
      title: 'Attendance Engine',
      subtitle: lowAttCount > 0 ? `${lowAttCount} Subject Warning` : '75.0% Target Safe',
      badge: 'Safe Bunk Calc',
      icon: <BarChart2 className="w-4 h-4 text-rose-400" />,
      targetView: 'attendance',
    },
    {
      id: 'doc-intelligence',
      title: 'Course Projects',
      subtitle: 'Document Intelligence',
      badge: 'PDF AI Parser',
      icon: <FolderGit2 className="w-4 h-4 text-blue-400" />,
      targetView: 'doc-intelligence',
    },
    {
      id: 'career',
      title: 'Career Assistant',
      subtitle: 'ATS Resume & Mock AI',
      badge: 'ATS Score 88/100',
      icon: <Briefcase className="w-4 h-4 text-cyan-400" />,
      targetView: 'career',
    },
    {
      id: 'quiz',
      title: 'Resources & Quizzes',
      subtitle: 'Auto MCQs & Viva Qs',
      badge: 'Speed Practice',
      icon: <HelpCircle className="w-4 h-4 text-pink-400" />,
      targetView: 'quiz',
    },
  ];

  // 3D Canvas Energy Core with Rotating Rings & Flowing Inward Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 460);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const centerX = width / 2;
    const centerY = height / 2;

    // Inward flowing particles
    const particles = Array.from({ length: 65 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 130 + Math.random() * 190;
      return {
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        speed: 0.5 + Math.random() * 0.7,
        size: 1 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.6,
      };
    });

    let breathTime = 0;
    let ringAngle1 = 0;
    let ringAngle2 = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      breathTime += 0.025;
      ringAngle1 += 0.015;
      ringAngle2 -= 0.012;

      const breathScale = 1 + Math.sin(breathTime) * 0.06;
      const orbRadius = 44 * breathScale;

      // Rotating Energy Ring 1
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(ringAngle1);
      ctx.beginPath();
      ctx.ellipse(0, 0, orbRadius * 2.0, orbRadius * 0.9, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Rotating Energy Ring 2
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(ringAngle2);
      ctx.beginPath();
      ctx.ellipse(0, 0, orbRadius * 1.6, orbRadius * 2.2, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Outer glow pulse
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbRadius * 2.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.04)';
      ctx.fill();

      // Core Orb Radial Gradient
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, orbRadius);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.35, '#818cf8');
      grad.addColorStop(0.75, '#4f46e5');
      grad.addColorStop(1, 'rgba(79, 70, 229, 0.15)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, orbRadius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Draw inward flowing particles
      particles.forEach((p) => {
        const dx = centerX - p.x;
        const dy = centerY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < orbRadius) {
          const angle = Math.random() * Math.PI * 2;
          const newDist = 150 + Math.random() * 170;
          p.x = centerX + Math.cos(angle) * newDist;
          p.y = centerY + Math.sin(angle) * newDist;
        } else {
          p.x += (dx / dist) * p.speed;
          p.y += (dy / dist) * p.speed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 252, ${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Orbital Rotation Timer
  useEffect(() => {
    if (hoveredCardId) return;
    const interval = setInterval(() => {
      setOrbitAngle((prev) => (prev + 0.005) % (Math.PI * 2));
    }, 16);
    return () => clearInterval(interval);
  }, [hoveredCardId]);

  return (
    <div className="relative w-full h-[460px] rounded-3xl bg-[#08080a] border border-white/[0.06] overflow-hidden select-none flex items-center justify-center shadow-2xl">
      {/* 3D Canvas Energy Core */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Core AI Label */}
      <div className="absolute z-10 text-center pointer-events-none mt-28">
        <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase">
          Gemini 2.5 AI Core
        </span>
        <h2 className="text-sm font-extrabold text-white">Living Academic Engine</h2>
      </div>

      {/* 8 Connected Orbiting Workspace Cards */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        {workspaceCards.map((card, idx) => {
          const cardOffset = (idx * (Math.PI * 2)) / workspaceCards.length;
          const currentAngle = orbitAngle + cardOffset;

          // 3D Orbital Projection Math
          const radiusX = 280;
          const radiusY = 90;
          const x = Math.cos(currentAngle) * radiusX;
          const y = Math.sin(currentAngle) * radiusY;

          const depthScale = 0.85 + ((y + radiusY) / (radiusY * 2)) * 0.25;
          const depthZIndex = Math.round((y + radiusY) * 10);
          const isHovered = hoveredCardId === card.id;

          return (
            <div
              key={card.id}
              style={{
                transform: `translate(${x}px, ${y}px) scale(${isHovered ? 1.12 : depthScale})`,
                zIndex: isHovered ? 100 : depthZIndex,
                transition: 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)',
              }}
              onMouseEnter={() => setHoveredCardId(card.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              onClick={() => setCurrentView(card.targetView)}
              className="absolute pointer-events-auto cursor-pointer"
            >
              <div
                className={`p-3 rounded-2xl backdrop-blur-xl border transition-all ${
                  isHovered
                    ? 'bg-zinc-900/95 border-indigo-500 shadow-2xl scale-105'
                    : 'bg-[#121215]/80 border-white/[0.08] hover:border-zinc-700 shadow-lg'
                } w-48 space-y-1.5`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-zinc-800 text-zinc-200">
                    {card.icon}
                  </div>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                    {card.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white tracking-tight flex items-center justify-between">
                    <span>{card.title}</span>
                    <ArrowRight className={`w-3 h-3 text-indigo-400 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                  </h3>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{card.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
