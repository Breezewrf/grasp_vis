
import React, { useRef, useEffect } from 'react';
import Panel from './Panel';
import { type LogEntry, LogLevel } from '../types';

interface SystemLogPanelProps {
  logs: LogEntry[];
  onClear: () => void;
}

const logLevelColors: { [key in LogLevel]: string } = {
  [LogLevel.INFO]: 'text-gray-400',
  [LogLevel.WARNING]: 'text-yellow-400',
  [LogLevel.ERROR]: 'text-red-500',
  [LogLevel.CRITICAL]: 'text-red-500 font-bold bg-red-900/50',
};

const SystemLogPanel: React.FC<SystemLogPanelProps> = ({ logs, onClear }) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = 0;
    }
  }, [logs]);

  const controls = (
    <div className="space-x-2">
      <button onClick={onClear} className="text-xs text-gray-400 hover:text-white transition-colors">CLEAR</button>
      <button onClick={() => alert("Save log functionality not implemented.")} className="text-xs text-gray-400 hover:text-white transition-colors">SAVE</button>
    </div>
  );

  return (
    <Panel title="System Log" className="h-full" controls={controls}>
      <div ref={logContainerRef} className="h-full overflow-y-auto font-mono text-xs pr-2">
        {logs.map((log) => (
          <div key={log.id} className={`flex gap-4 whitespace-pre-wrap ${logLevelColors[log.level]}`}>
            <span className="text-gray-500 flex-shrink-0">{log.timestamp.toLocaleTimeString('en-US', { hour12: false })}</span>
            <span className="font-bold w-16 flex-shrink-0">[{log.level}]</span>
            <span className="flex-grow">{log.message}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
};

export default SystemLogPanel;
