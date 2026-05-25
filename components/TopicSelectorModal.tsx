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
  showRuby: boolean;
}

const TopicSelectorModal: React.FC<TopicSelectorModalProps> = ({
  isOpen,
  onClose,
  title,
  items,
  onSelect,
  displayKey,
  colorClass,
  showRuby
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-orange-900/10 backdrop-blur-[4px] animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-4 border-white relative animate-in zoom-in-95 duration-300">
        <div className={`p-6 md:p-8 border-b flex justify-between items-center ${colorClass} text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <h3 className="text-xl md:text-2xl font-black relative z-10">{parseRuby(title, showRuby)}</h3>
          <button 
            onClick={onClose} 
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all hover:rotate-90 relative z-10"
          >
            <span className="text-2xl block leading-none">×</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 bg-orange-50/30">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
              className="w-full text-left p-4 md:p-5 rounded-2xl bg-white border-2 border-orange-50 hover:border-orange-100 hover:shadow-md transition-all active:scale-[0.98] group flex items-start gap-4"
            >
              <span className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl font-black text-sm ${colorClass} text-white opacity-80 group-hover:opacity-100 transition-opacity`}>
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-stone-700 font-bold group-hover:text-stone-900 transition-colors pt-1.5 leading-relaxed">
                {parseRuby(item[displayKey], showRuby)}
              </span>
            </button>
          ))}
        </div>
        
        <div className="p-6 bg-white border-t border-orange-50 text-center">
          <button
            onClick={onClose}
            className="text-orange-300 font-black hover:text-orange-500 transition-colors text-lg underline decoration-2 underline-offset-4"
          >
            とじる
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicSelectorModal;