
import React from 'react';
import Panel from './Panel';
import { ComponentStatus } from '../types';

interface CurrentActionStatusPanelProps {
  cameraStatus: ComponentStatus;
  robotStatus: ComponentStatus;
  conveyorStatus: ComponentStatus;
  currentAction: string;
  throughput: number;
  nextGraspTarget: string;
}

const StatusField: React.FC<{ label: string; status: ComponentStatus }> = ({ label, status }) => {
  const isError = status === ComponentStatus.ERROR || status === ComponentStatus.DISCONNECTED;
  const isOnline = [ComponentStatus.ONLINE, ComponentStatus.READY, ComponentStatus.ACTIVE, ComponentStatus.MOVING, ComponentStatus.GRASPING].includes(status);
  
  const dotColor = isError ? 'bg-red-500' : isOnline ? 'bg-green-500' : 'bg-gray-500';

  return (
    <div className="flex justify-between items-center text-sm py-1.5 border-b border-gray-700/50">
      <span className="text-gray-400">{label}:</span>
      <div className="flex items-center gap-2">
        <span className="font-mono font-bold">{status}</span>
        <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></div>
      </div>
    </div>
  );
};


const CurrentActionStatusPanel: React.FC<CurrentActionStatusPanelProps> = (props) => {
  return (
    <Panel title="Current Status">
      <div className="space-y-2 text-sm">
        <StatusField label="Camera Status" status={props.cameraStatus} />
        <StatusField label="Robot Arm Status" status={props.robotStatus} />
        <StatusField label="Conveyor Status" status={props.conveyorStatus} />

        <div className="pt-2">
            <div className="flex justify-between items-center py-1.5">
                <span className="text-gray-400">Throughput:</span>
                <span className="font-mono font-bold">{props.throughput} units/hr</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
                <span className="text-gray-400">Next Target:</span>
                <span className="font-mono font-bold">{props.nextGraspTarget}</span>
            </div>
        </div>
      </div>
    </Panel>
  );
};

export default CurrentActionStatusPanel;
