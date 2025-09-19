
import React from 'react';
import Panel from './Panel';
import { SystemStatus } from '../types';

interface SystemControlPanelProps {
  status: SystemStatus;
  statusText: string;
  onStartPause: () => void;
  onEmergencyStop: () => void;
  onReset: () => void;
}

const StatusIndicator: React.FC<{ status: SystemStatus }> = ({ status }) => {
  const baseClasses = "w-5 h-5 rounded-full mr-3";
  const statusConfig = {
    [SystemStatus.RUNNING]: { color: 'bg-green-500 animate-pulse', text: 'RUNNING' },
    [SystemStatus.PAUSED]: { color: 'bg-yellow-500', text: 'PAUSED' },
    [SystemStatus.ERROR]: { color: 'bg-red-500 animate-ping', text: 'ERROR' },
    [SystemStatus.INITIALIZING]: { color: 'bg-blue-500 animate-pulse', text: 'INITIALIZING' },
    [SystemStatus.STOPPED]: { color: 'bg-gray-500', text: 'STOPPED' },
  };

  const config = statusConfig[status] || statusConfig[SystemStatus.STOPPED];

  return (
    <div className="flex items-center p-3 bg-gray-900 rounded-lg mb-4">
      <div className={`${baseClasses} ${config.color}`}></div>
      <span className="font-mono font-bold text-lg tracking-wider">{config.text}</span>
    </div>
  );
};

const SystemControlPanel: React.FC<SystemControlPanelProps> = ({ status, statusText, onStartPause, onEmergencyStop, onReset }) => {
  return (
    <Panel title="System Control">
      <div className="flex flex-col h-full">
        <StatusIndicator status={status} />
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={onStartPause}
            disabled={status === SystemStatus.ERROR}
            className={`w-full py-3 rounded font-bold text-white transition-colors ${status === SystemStatus.RUNNING ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} disabled:bg-gray-600 disabled:cursor-not-allowed`}
          >
            {status === SystemStatus.RUNNING ? 'PAUSE' : 'START'}
          </button>
          <button
            onClick={onReset}
            className="w-full py-3 rounded font-bold bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            RESET SYSTEM
          </button>
        </div>
        <button
            onClick={onEmergencyStop}
            className="w-full py-4 rounded font-bold text-xl uppercase bg-red-700 hover:bg-red-800 transition-colors"
        >
            EMERGENCY STOP
        </button>
        <div className="mt-4 p-2 bg-gray-900 rounded text-center text-sm text-gray-300 flex-grow min-h-[40px]">
          <span>{statusText}</span>
        </div>
      </div>
    </Panel>
  );
};

export default SystemControlPanel;
