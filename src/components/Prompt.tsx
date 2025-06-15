// components/TextButtonRow.tsx
import React from 'react';

interface promptProps {
  text: string;
  btnText: string;
  func: () => void;
}

const Prompt: React.FC<promptProps> = ({ text, btnText, func }) => {
  return (
    <div className="flex items-center justify-between w-full p-1 bg-white/80 rounded-lg shadow-sm">
      <span className="text-gray-700 font-medium">{text}</span>
      <button
        onClick={func}
        className="px-2 py-2 rounded-lg font-semibold transition duration-150 bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
      >
        {btnText}
      </button>
    </div>
  );
};

export default Prompt;
