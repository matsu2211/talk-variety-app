import React, { useState, useCallback } from 'react';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (isCopied) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }, [textToCopy, isCopied]);

  return (
    <button
      onClick={handleCopy}
      className={`text-sm md:text-base font-bold py-3 px-6 md:px-8 rounded-2xl border-2 transition-all duration-300 active:scale-95 flex items-center gap-2 ${
        isCopied
          ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100'
          : 'bg-white border-stone-200/80 text-stone-500 hover:border-stone-300 hover:text-stone-700 hover:bg-stone-50 hover:shadow-sm'
      }`}
      disabled={isCopied}
    >
      <span>{isCopied ? '✅' : '📋'}</span>
      <span>{isCopied ? 'コピーしました！' : 'お題をコピー'}</span>
    </button>
  );
};

export default CopyButton;