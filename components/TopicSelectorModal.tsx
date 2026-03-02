import React from 'react';
import { parseRuby } from '../utils';

interface TopicSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: any[];
  onSelect: (item: any) => void;
  displayKey: string;
  colorClass: string;
}

const TopicSelectorModal: React.FC<TopicSelectorModalProps> = ({
  isOpen,
  onClose,
  title,
  items,
  onSelect,
  displayKey,
  colorClass
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl max-h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className={`p-6 border-b flex justify-between items-center ${colorClass} text-white`}>
          <h3 className="text-xl font-bold">{parseRuby(title)}</h3>
          <button onClick={onClose} className="text-2xl hover:scale-110 transition-transform">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
              className="w-full text-left p-4 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-200 transition-all group"
            >
              <span className="text-stone-400 text-sm mr-3 font-mono">{(index + 1).toString().padStart(2, '0')}</span>
              <span className="text-stone-700 group-hover:text-black transition-colors">
                {parseRuby(item[displayKey])}
              </span>
            </button>
          ))}
        </div>
        <div className="p-4 bg-stone-50 border-t text-center">
          <button
            onClick={onClose}
            className="text-stone-500 font-bold hover:text-stone-800 transition-colors"
          >
            とじる
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicSelectorModal;