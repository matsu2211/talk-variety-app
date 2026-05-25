import React from 'react';
import { parseRuby } from '../utils';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-rose-50 border-2 border-rose-200 rounded-3xl text-center shadow-sm">
      <div className="text-5xl mb-4">😵</div>
      <h3 className="text-xl font-bold text-rose-600 mb-2">
        {parseRuby("エラーが起《お》きました")}
      </h3>
      <p className="text-rose-500 mb-6 font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-rose-500 text-white px-8 py-3 rounded-full font-bold hover:bg-rose-600 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          {parseRuby("もう一度《いちど》ためす")}
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
