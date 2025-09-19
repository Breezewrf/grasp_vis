
import React from 'react';
import Panel from './Panel';
import { type Package, PackageStatus } from '../types';

interface ActionQueuePanelProps {
  queue: Package[];
  onSelect: (id: string) => void;
  selectedPackageId: string | null;
}

const statusColors: { [key in PackageStatus]: string } = {
  [PackageStatus.WAITING]: 'bg-blue-500',
  [PackageStatus.GRASPING]: 'bg-yellow-500 animate-pulse',
  [PackageStatus.GRASPED]: 'bg-green-500',
  [PackageStatus.MISSED]: 'bg-red-500',
};

const ActionQueuePanel: React.FC<ActionQueuePanelProps> = ({ queue, onSelect, selectedPackageId }) => {
  return (
    <Panel title="Action Queue" className="flex-1">
      <div className="h-full overflow-y-auto pr-1">
        {queue.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No packages in queue.
          </div>
        ) : (
          <ul className="space-y-1">
            {queue.map(pkg => (
              <li
                key={pkg.id}
                onClick={() => onSelect(pkg.id)}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${selectedPackageId === pkg.id ? 'bg-blue-800/50' : 'hover:bg-gray-700/50'}`}
              >
                <span className="font-mono font-bold">{pkg.id}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{pkg.status}</span>
                  <div className={`w-3 h-3 rounded-full ${statusColors[pkg.status]}`}></div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Panel>
  );
};

export default ActionQueuePanel;
