import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockCampusLocations } from '../../data/mockData';
import { CampusLocation } from '../../types';
import { MapPin, Navigation, Search, Footprints, Clock, ArrowRight, Cpu, BookOpen, Building2, Briefcase, Home, Coffee, Presentation } from 'lucide-react';
import { motion } from 'framer-motion';

export const CampusMap: React.FC = () => {
  const [originId, setOriginId] = useState<string>('loc_lib');
  const [destId, setDestId] = useState<string>('loc_lab5');
  const [selectedLoc, setSelectedLoc] = useState<CampusLocation>(mockCampusLocations[0]);

  const originLoc = mockCampusLocations.find((l) => l.id === originId) || mockCampusLocations[1];
  const destLoc = mockCampusLocations.find((l) => l.id === destId) || mockCampusLocations[0];

  // Calculate approximate distance
  const dx = destLoc.x - originLoc.x;
  const dy = destLoc.y - originLoc.y;
  const distUnits = Math.round(Math.sqrt(dx * dx + dy * dy) * 5); // meters
  const estWalkMins = Math.max(1, Math.round(distUnits / 80));

  const iconComponents: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-4 h-4 text-purple-400" />,
    BookOpen: <BookOpen className="w-4 h-4 text-indigo-400" />,
    Building2: <Building2 className="w-4 h-4 text-cyan-400" />,
    Briefcase: <Briefcase className="w-4 h-4 text-emerald-400" />,
    Home: <Home className="w-4 h-4 text-amber-400" />,
    Coffee: <Coffee className="w-4 h-4 text-rose-400" />,
    Presentation: <Presentation className="w-4 h-4 text-pink-400" />,
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-indigo-500" />
            <span>Interactive Campus Route Navigation</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Find shortest walking routes between labs, departments, library, hostels & cafeteria.
          </p>
        </div>
      </div>

      {/* Navigation Route Builder Input Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-5 flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 shrink-0">From:</span>
          <select
            value={originId}
            onChange={(e) => setOriginId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-800 dark:text-white"
          >
            {mockCampusLocations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} ({l.building})
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-5 flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 shrink-0">To:</span>
          <select
            value={destId}
            onChange={(e) => setDestId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-800 dark:text-white"
          >
            {mockCampusLocations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} ({l.building})
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <div className="px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold text-center flex items-center justify-center space-x-1">
            <Footprints className="w-4 h-4" />
            <span>{estWalkMins} min walk</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map Canvas (8 cols) & Route Details (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Map Canvas */}
        <div className="lg:col-span-8 p-4 rounded-3xl bg-slate-950 border border-zinc-800 shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 z-10">
            <span className="flex items-center space-x-1.5 text-indigo-400 font-bold">
              <Navigation className="w-4 h-4 animate-pulse" />
              <span>Campus Digital Twin Vector Map</span>
            </span>
            <span>Scale: 1:500m</span>
          </div>

          {/* Interactive SVG Campus Map Graphic */}
          <div className="relative w-full h-[360px]">
            <svg className="w-full h-full" viewBox="0 0 1000 600">
              {/* Background grid lines */}
              <defs>
                <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mapGrid)" />

              {/* Walking path line between origin and destination */}
              <line
                x1={originLoc.x * 10}
                y1={originLoc.y * 6}
                x2={destLoc.x * 10}
                y2={destLoc.y * 6}
                stroke="#6366f1"
                strokeWidth="4"
                strokeDasharray="8"
                className="animate-pulse"
              />

              {/* Render Map Nodes */}
              {mockCampusLocations.map((loc) => {
                const isOrigin = loc.id === originId;
                const isDest = loc.id === destId;
                const isSelected = selectedLoc.id === loc.id;
                const cx = loc.x * 10;
                const cy = loc.y * 6;

                return (
                  <g
                    key={loc.id}
                    transform={`translate(${cx}, ${cy})`}
                    onClick={() => setSelectedLoc(loc)}
                    className="cursor-pointer group"
                  >
                    {/* Outer glowing halo */}
                    <circle
                      r={isOrigin || isDest ? "24" : "18"}
                      fill={isOrigin ? '#4f46e5' : isDest ? '#10b981' : '#1e1b4b'}
                      opacity={isSelected ? "0.9" : "0.7"}
                      className="transition-all group-hover:scale-110"
                    />

                    <text
                      textAnchor="middle"
                      dy="4"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {loc.name.split(' ')[0]}
                    </text>

                    {/* Node label tooltip */}
                    <rect
                      x="-50"
                      y="-42"
                      width="100"
                      height="20"
                      rx="6"
                      fill="#090a0f"
                      stroke="#3f3f46"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <text
                      x="0"
                      y="-28"
                      textAnchor="middle"
                      fill="#e4e4e7"
                      fontSize="9"
                      fontWeight="600"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {loc.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Route Step-by-Step Instructions Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-100 dark:border-zinc-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                Turn-by-Turn Route
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {originLoc.name} $\rightarrow$ {destLoc.name}
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Total Distance: <strong>{distUnits} meters</strong> ({estWalkMins} mins)</span>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-slate-700 dark:text-zinc-300">Walking Steps:</p>
                <div className="space-y-2 pl-2 border-l-2 border-indigo-500/30">
                  <p className="text-slate-600 dark:text-zinc-400">
                    1. Exit <strong>{originLoc.name}</strong> and head past the main central walkway.
                  </p>
                  <p className="text-slate-600 dark:text-zinc-400">
                    2. Take the covered glass corridor towards <strong>{destLoc.building}</strong>.
                  </p>
                  <p className="text-slate-600 dark:text-zinc-400">
                    3. Arrive at <strong>{destLoc.name}</strong> ({destLoc.floor}).
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold text-[11px]">
                {destLoc.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
