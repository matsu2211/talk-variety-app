import React from 'react';
import { parseRuby } from '../utils';

interface HeaderProps {
    title: string;
    mode?: 'quiz' | 'moshimo' | 'theme' | 'menu' | 'profile' | 'kimochi' | 'yesno' | 'saikin' | 'teiban';
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
      case 'teiban': return 'text-cyan-500';
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
      case 'teiban': return 'border-cyan-100';
      default: return 'border-orange-100';
    }
  };

  return (
    <header className="pt-8 pb-4 md:pt-12 md:pb-6 px-4 mb-4 md:mb-6 relative overflow-hidden">
      {/* Soft decorative blur backgrounds */}
      <div className="absolute top-[-30%] left-[-10%] w-72 h-72 bg-orange-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-30%] right-[-10%] w-72 h-72 bg-rose-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 md:gap-5 relative z-10">
        <div className={`px-6 md:px-10 py-3 md:py-4 rounded-2xl md:rounded-[2rem] bg-white/80 backdrop-blur-md border border-stone-200/50 shadow-sm shadow-orange-100/20`}>
          <h1 className={`text-2xl md:text-4xl lg:text-5xl font-black ${getColorClass()} tracking-tight text-center leading-normal md:leading-normal`}>
            {parseRuby(title, showRuby)}
          </h1>
        </div>
        
        <button 
          onClick={onToggleRuby}
          className="text-xs md:text-sm font-bold px-5 py-2 rounded-full bg-white/90 border border-stone-200/80 text-stone-500 hover:text-stone-700 hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm transition-all active:scale-95 shadow-sm"
        >
          📖 ふりがな：{showRuby ? 'ON' : 'OFF'}
        </button>
      </div>
    </header>
  );
};

export default Header;