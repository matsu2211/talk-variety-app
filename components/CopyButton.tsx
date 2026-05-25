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
      className={`text-base font-bold py-3 px-8 rounded-2xl border-2 transition-all duration-300 active:scale-95 flex items-center gap-2 ${
        isCopied
          ? 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-inner'
          : 'bg-white border-orange-100 text-orange-400 hover:border-orange-200 hover:text-orange-500 hover:shadow-md'
      }`}
      disabled={isCopied}
    >
      <span>{isCopied ? '✅' : '📋'}</span>
      <span>{isCopied ? 'コピーしました！' : 'お題をコピー'}</span>
    </button>
  );
};

export default CopyButton;