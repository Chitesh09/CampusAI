import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface HolographicCardProps {
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const HolographicCard: React.FC<HolographicCardProps> = ({
  title,
  subtitle,
  badge,
  icon,
  onClick,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      style={{
        perspective: 1000,
      }}
      className="cursor-pointer select-none"
      onClick={onClick}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="p-4 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 hover:border-indigo-500/50 shadow-2xl space-y-2.5 transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-zinc-800 text-zinc-200 group-hover:text-indigo-400 transition-colors">
            {icon}
          </div>
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            {badge}
          </span>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-white tracking-tight">{title}</h3>
          <p className="text-[11px] text-zinc-400 mt-0.5 truncate">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};
