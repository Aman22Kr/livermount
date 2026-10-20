import React from 'react';

interface BlankVideoSquareProps {
  className?: string;
  label?: string;
}

export const BlankVideoSquare: React.FC<BlankVideoSquareProps> = ({
  className = '',
  label = 'Video Showcase Area',
}) => {
  return (
    <div
      className={`aspect-square w-full bg-stone-100 border border-stone-200 flex flex-col items-center justify-center text-center p-4 rounded-lg select-none ${className}`}
      aria-label={label}
    >
      <div className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center mb-2 text-stone-400">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">{label}</span>
      <span className="text-[11px] text-stone-400 mt-0.5">Media demonstration space</span>
    </div>
  );
};
