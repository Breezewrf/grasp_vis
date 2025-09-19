import React from 'react';
import RGBCameraFeed from './RGBCameraFeed';

const MainVisualization: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col">
      <RGBCameraFeed />
    </div>
  );
};

export default MainVisualization;