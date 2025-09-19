
import React from 'react';
import Panel from './Panel';

const SimulationView: React.FC = () => {
  return (
    <Panel title="3D Simulation & Visualization" className="w-1/2">
      <div className="w-full h-full bg-black rounded-md overflow-hidden">
        <img src="https://i.imgur.com/uQy0f6d.png" alt="3D Simulation" className="w-full h-full object-cover" />
      </div>
    </Panel>
  );
};

export default SimulationView;
