import React from 'react';
import Panel from './Panel';

const RGBCameraFeed: React.FC = () => {
  return (
    <Panel title="RGB Camera Feed" className="flex-1">
      <div className="relative w-full h-full bg-black rounded-md overflow-hidden flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg">ROS2 Camera Stream</p>
          <p className="font-mono text-sm">/camera/rgb/image_raw</p>
          <p className="text-xs mt-2">(Live feed placeholder)</p>
        </div>
        
        {/* Conveyor Belt ROI */}
        <div className="absolute top-1/4 left-0 right-0 h-1/2 border-2 border-dashed border-blue-500/50"></div>

        {/* Detected Package 1 */}
        <div className="absolute top-[35%] left-[10%] w-[30%] h-[30%] border-2 border-green-400 rounded">
          <span className="absolute -top-6 left-0 text-xs bg-green-400 text-black px-1 rounded">PKG-003: 0.98</span>
          {/* Grasping Point */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
            <div className="absolute top-1/2 -translate-y-1/2 h-px w-full bg-red-500"></div>
            <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-red-500"></div>
          </div>
        </div>

        {/* Detected Package 2 */}
        <div className="absolute top-[45%] left-[55%] w-[25%] h-[25%] border-2 border-yellow-400 rounded">
          <span className="absolute -top-6 left-0 text-xs bg-yellow-400 text-black px-1 rounded">PKG-004: 0.92</span>
        </div>
      </div>
    </Panel>
  );
};

export default RGBCameraFeed;