
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
      className={`font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out hover:scale-105 ${
        isCopied
          ? 'bg-green-500 text-white cursor-not-allowed'
          : 'bg-gray-200 hover:bg-gray-300 text-stone-700'
      }`}
      disabled={isCopied}
      aria-live="polite"
    >
      {isCopied ? 'コピーしました！' : 'お題をコピー'}
    </button>
  );
};

export default CopyButton;
