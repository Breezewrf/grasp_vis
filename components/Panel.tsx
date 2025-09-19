
import React from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  controls?: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ title, children, className, controls }) => {
  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-lg flex flex-col overflow-hidden ${className}`}>
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex justify-between items-center flex-shrink-0">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">{title}</h2>
        {controls && <div>{controls}</div>}
      </div>
      <div className="p-4 flex-grow overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Panel;
