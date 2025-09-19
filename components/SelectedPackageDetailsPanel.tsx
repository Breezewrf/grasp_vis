
import React from 'react';
import Panel from './Panel';
import { type Package } from '../types';

interface SelectedPackageDetailsPanelProps {
  pkg: Package | null;
}

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="grid grid-cols-2 gap-2 text-xs py-1.5 border-b border-gray-700/50">
    <span className="text-gray-400">{label}:</span>
    <span className="font-mono text-right truncate">{value}</span>
  </div>
);

const SelectedPackageDetailsPanel: React.FC<SelectedPackageDetailsPanelProps> = ({ pkg }) => {
  return (
    <Panel title="Selected Package Details" className="flex-1">
      {pkg ? (
        <div className="space-y-1">
          <DetailRow label="Package ID" value={pkg.id} />
          <DetailRow label="Object Class" value={pkg.objectClass} />
          <DetailRow label="Confidence" value={pkg.confidence.toFixed(3)} />
          <DetailRow label="Position (m)" value={`[${pkg.position.join(', ')}]`} />
          <DetailRow label="Orientation (Quat)" value={`[${pkg.orientation.join(', ')}]`} />
          <DetailRow label="Grasp Strategy" value={pkg.graspStrategy} />
          <DetailRow label="Queue Time" value={pkg.queueTime.toLocaleTimeString()} />
          <DetailRow label="Status" value={pkg.status} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a package from the queue to see details.
        </div>
      )}
    </Panel>
  );
};

export default SelectedPackageDetailsPanel;
