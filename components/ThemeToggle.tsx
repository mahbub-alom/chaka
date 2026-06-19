import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle"
      onClick={onToggle}
      className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full p-0.5 transition-all duration-300 focus:outline-none select-none border ${
        isDarkMode 
          ? 'bg-gradient-to-r from-slate-950 to-indigo-950 border-slate-800 shadow-inner' 
          : 'bg-gradient-to-r from-amber-50 to-orange-100 border-amber-200 shadow-inner'
      }`}
      aria-label="Toggle Layout Theme"
    >
      <span className="sr-only">Toggle theme mode</span>

      {/* Background Micro Stars/Clouds indicator */}
      <div className="absolute inset-0 flex justify-between items-center px-1.5 pointer-events-none text-slate-400">
        <Sun className={`w-3.5 h-3.5 transition-all duration-300 ${!isDarkMode ? 'text-amber-500 scale-100 drop-shadow' : 'text-slate-700 opacity-20 scale-95'}`} />
        <Moon className={`w-3.5 h-3.5 transition-all duration-300 ${isDarkMode ? 'text-indigo-400 scale-100 drop-shadow-glow' : 'text-slate-400 opacity-20 scale-95'}`} />
      </div>

      {/* Floating Active Handle Knob */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        className={`pointer-events-none z-10 inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-lg flex items-center justify-center border ${
          isDarkMode 
            ? 'translate-x-7 bg-gradient-to-tr from-slate-900 to-indigo-900 border-indigo-500/30' 
            : 'translate-x-0 bg-white border-amber-100'
        }`}
      >
        {isDarkMode ? (
          <Moon className="w-2.5 h-2.5 text-indigo-400" />
        ) : (
          <Sun className="w-2.5 h-2.5 text-amber-500" />
        )}
      </motion.div>
    </button>
  );
}
export {};
