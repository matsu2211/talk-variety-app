import React from 'react';
import { parseRuby } from '../utils';

interface HeaderProps {
    title: string;
    mode?: 'quiz' | 'moshimo' | 'theme' | 'menu' | 'profile' | 'kimochi' | 'yesno' | 'saikin';
    showRuby: boolean;
    onToggleRuby: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, mode = 'menu', showRuby, onToggleRuby }) => {
  const getColorClass = () => {
    switch (mode) {
      case 'quiz': return 'text-rose-500';
      case 'moshimo': return 'text-amber-500';
      case 'theme': return 'text-orange-500';
      case 'saikin': return 'text-blue-500';
      case 'profile': return 'text-sky-500';
      case 'kimochi': return 'text-emerald-500';
      case 'yesno': return 'text-violet-500';
      default: return 'text-orange-800';
    }
  };

  const getBorderColor = () => {
    switch (mode) {
      case 'quiz': return 'border-rose-100';
      case 'moshimo': return 'border-amber-100';
      case 'theme': return 'border-orange-100';
      case 'saikin': return 'border-blue-100';
      case 'profile': return 'border-sky-100';
      case 'kimochi': return 'border-emerald-100';
      case 'yesno': return 'border-violet-100';
      default: return 'border-orange-100';
    }
  };

  return (
    <header className={`py-10 md:py-16 px-4 mb-8 relative overflow-hidden`}>
      {/* Soft decorative circles */}
      <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 relative z-10">
        <div className={`px-8 py-4 rounded-[2rem] bg-white/70 backdrop-blur-sm border-2 ${getBorderColor()} shadow-sm shadow-orange-100/50`}>
          <h1 className={`text-4xl md:text-6xl font-black ${getColorClass()} tracking-tight text-center`}>
            {parseRuby(title, showRuby)}
          </h1>
        </div>
        
        <button 
          onClick={onToggleRuby}
          className="text-sm font-bold px-6 py-2 rounded-full bg-white border border-orange-100 text-orange-400 hover:text-orange-500 hover:border-orange-200 hover:shadow-md transition-all active:scale-95 shadow-sm"
        >
          📖 ふりがな：{showRuby ? 'ON' : 'OFF'}
        </button>
      </div>
    </header>
  );
};

export default Header;