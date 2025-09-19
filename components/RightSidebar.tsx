
import React from 'react';
import { SystemStatus, ComponentStatus, type Package } from '../types';
import SystemControlPanel from './SystemControlPanel';
import CurrentActionStatusPanel from './CurrentActionStatusPanel';
import ActionQueuePanel from './ActionQueuePanel';
import SelectedPackageDetailsPanel from './SelectedPackageDetailsPanel';

interface RightSidebarProps {
  systemStatus: SystemStatus;
  cameraStatus: ComponentStatus;
  robotStatus: ComponentStatus;
  conveyorStatus: ComponentStatus;
  currentAction: string;
  actionQueue: Package[];
  selectedPackage: Package | null;
  onPackageSelect: (id: string) => void;
  onStartPause: () => void;
  onEmergencyStop: () => void;
  onReset: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = (props) => {
  return (
    <div className="h-full flex flex-col gap-2">
      <SystemControlPanel 
        status={props.systemStatus}
        statusText={props.currentAction}
        onStartPause={props.onStartPause}
        onEmergencyStop={props.onEmergencyStop}
        onReset={props.onReset}
      />
      <CurrentActionStatusPanel
        cameraStatus={props.cameraStatus}
        robotStatus={props.robotStatus}
        conveyorStatus={props.conveyorStatus}
        currentAction={props.currentAction}
        throughput={15} // Mock data
        nextGraspTarget={props.actionQueue.find(p => p.status === 'Waiting')?.id || 'None'}
      />
      <ActionQueuePanel
        queue={props.actionQueue}
        onSelect={props.onPackageSelect}
        selectedPackageId={props.selectedPackage?.id || null}
      />
      <SelectedPackageDetailsPanel pkg={props.selectedPackage} />
    </div>
  );
};

export default RightSidebar;
