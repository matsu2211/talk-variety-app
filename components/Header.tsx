import React from 'react';
import { parseRuby } from '../utils';

interface HeaderProps {
    title: string;
    mode?: 'quiz' | 'moshimo' | 'theme' | 'menu' | 'profile' | 'kimochi' | 'yesno';
}

const Header: React.FC<HeaderProps> = ({ title, mode = 'menu' }) => {
  const getColorClass = () => {
    switch (mode) {
      case 'quiz':
        return 'text-rose-500';
      case 'moshimo':
        return 'text-amber-500';
      case 'theme':
        return 'text-orange-500';
      case 'profile':
        return 'text-sky-500';
      case 'kimochi':
        return 'text-emerald-500';
      case 'yesno':
        return 'text-violet-500';
      default:
        return 'text-stone-800';
    }
  };

  return (
    <header className="text-center py-6 md:py-8">
      <h1 className={`text-4xl md:text-6xl font-extrabold transition-colors duration-300 ${getColorClass()}`}>
        {parseRuby(title)}
      </h1>
    </header>
  );
};

export default Header;