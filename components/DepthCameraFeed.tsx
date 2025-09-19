
import React from 'react';
import Panel from './Panel';

const DepthCameraFeed: React.FC = () => {
  return (
    <Panel title="Depth Camera Feed" className="flex-1">
      <div className="relative w-full h-full bg-black rounded-md overflow-hidden">
        <img src="https://picsum.photos/seed/depthmap/600/400?grayscale&blur=2" alt="Depth Camera Feed" className="w-full h-full object-cover" />
         {/* Overlays can be added here similar to RGBCameraFeed */}
         <div className="absolute top-[35%] left-[10%] w-[30%] h-[30%] border-2 border-cyan-400/70 rounded"></div>
         <div className="absolute top-[45%] left-[55%] w-[25%] h-[25%] border-2 border-cyan-400/70 rounded"></div>
      </div>
    </Panel>
  );
};

export default DepthCameraFeed;
