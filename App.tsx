import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SystemStatus, ComponentStatus, PackageStatus, type Package, type LogEntry, LogLevel } from './types';
import MainVisualization from './components/MainVisualization';
import RightSidebar from './components/RightSidebar';
import SystemLogPanel from './components/SystemLogPanel';

const App: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>(SystemStatus.PAUSED);
  const [cameraStatus, setCameraStatus] = useState<ComponentStatus>(ComponentStatus.ONLINE);
  const [robotStatus, setRobotStatus] = useState<ComponentStatus>(ComponentStatus.READY);
  const [conveyorStatus, setConveyorStatus] = useState<ComponentStatus>(ComponentStatus.STOPPED);
  const [currentAction, setCurrentAction] = useState<string>('System Paused. Press START.');
  
  const [actionQueue, setActionQueue] = useState<Package[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logCounter = useRef(0);
  const packageCounter = useRef(0);

  const addLog = useCallback((level: LogLevel, message: string) => {
    setLogs(prevLogs => {
      const newLog: LogEntry = {
        id: logCounter.current++,
        timestamp: new Date(),
        level,
        message,
      };
      return [newLog, ...prevLogs].slice(0, 200); // Keep max 200 logs
    });
  }, []);

  const selectedPackage = actionQueue.find(p => p.id === selectedPackageId) || null;

  const handleStartPause = () => {
    if (systemStatus === SystemStatus.RUNNING) {
      setSystemStatus(SystemStatus.PAUSED);
      setCurrentAction('System Paused.');
      addLog(LogLevel.INFO, 'System paused by operator.');
    } else {
      setSystemStatus(SystemStatus.RUNNING);
      setCurrentAction('Awaiting packages...');
      addLog(LogLevel.INFO, 'System started by operator.');
    }
  };

  const handleEmergencyStop = () => {
    setSystemStatus(SystemStatus.ERROR);
    setRobotStatus(ComponentStatus.ERROR);
    setConveyorStatus(ComponentStatus.STOPPED);
    setCurrentAction('EMERGENCY STOP ACTIVATED.');
    addLog(LogLevel.CRITICAL, 'EMERGENCY STOP triggered by operator!');
  };

  const handleReset = () => {
    setSystemStatus(SystemStatus.PAUSED);
    setCameraStatus(ComponentStatus.ONLINE);
    setRobotStatus(ComponentStatus.READY);
    setConveyorStatus(ComponentStatus.STOPPED);
    setActionQueue([]);
    setSelectedPackageId(null);
    setLogs([]);
    logCounter.current = 0;
    packageCounter.current = 0;
    setCurrentAction('System Reset. Ready to start.');
    addLog(LogLevel.INFO, 'System has been reset.');
  };

  useEffect(() => {
    // FIX: Replace NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
    let interval: ReturnType<typeof setInterval> | undefined;

    if (systemStatus === SystemStatus.RUNNING) {
      interval = setInterval(() => {
        // Simulate new package detection
        if (Math.random() > 0.6 && actionQueue.length < 15) {
          packageCounter.current++;
          const newPackage: Package = {
            id: `PKG-${String(packageCounter.current).padStart(3, '0')}`,
            status: PackageStatus.WAITING,
            objectClass: ['Cardboard Box', 'Plastic Bag', 'Poly-mailer'][Math.floor(Math.random() * 3)],
            confidence: Math.random() * (0.99 - 0.90) + 0.90,
            position: [
              parseFloat((Math.random() * 2).toFixed(3)),
              parseFloat((Math.random() * 1).toFixed(3)),
              parseFloat((Math.random() * 0.5).toFixed(3))
            ],
            orientation: [
              parseFloat((Math.random()).toFixed(3)),
              parseFloat((Math.random()).toFixed(3)),
              parseFloat((Math.random()).toFixed(3)),
              parseFloat((Math.random()).toFixed(3))
            ],
            graspStrategy: ['Top-down pinch', 'Side grab'][Math.floor(Math.random() * 2)],
            queueTime: new Date(),
          };
          setActionQueue(prev => [newPackage, ...prev]);
          addLog(LogLevel.INFO, `Detected ${newPackage.id} (${newPackage.objectClass}).`);
        }

        // Simulate grasping process
        setActionQueue(prevQueue => {
          const graspingItem = prevQueue.find(p => p.status === PackageStatus.GRASPING);
          if (graspingItem) return prevQueue; // Only one item at a time

          const waitingItems = prevQueue.filter(p => p.status === PackageStatus.WAITING);
          if (waitingItems.length > 0) {
            const itemToGrasp = waitingItems[waitingItems.length - 1]; // FIFO
            
            // Mark as grasping
            const newQueue = prevQueue.map(p => p.id === itemToGrasp.id ? { ...p, status: PackageStatus.GRASPING } : p);
            setCurrentAction(`Approaching ${itemToGrasp.id}...`);
            setRobotStatus(ComponentStatus.MOVING);
            setSelectedPackageId(itemToGrasp.id);

            // Simulate grasp action
            setTimeout(() => {
              const success = Math.random() > 0.1; // 90% success rate
              if (success) {
                setActionQueue(q => q.map(p => p.id === itemToGrasp.id ? { ...p, status: PackageStatus.GRASPED } : p));
                setCurrentAction(`Successfully grasped ${itemToGrasp.id}. Moving to drop-off.`);
                addLog(LogLevel.INFO, `${itemToGrasp.id} grasped successfully.`);
                // Clean up grasped items after a delay
                setTimeout(() => setActionQueue(q => q.filter(p => p.id !== itemToGrasp.id)), 2000);
              } else {
                setActionQueue(q => q.map(p => p.id === itemToGrasp.id ? { ...p, status: PackageStatus.MISSED } : p));
                setCurrentAction(`Failed to grasp ${itemToGrasp.id}.`);
                addLog(LogLevel.ERROR, `Grasp failed for ${itemToGrasp.id}. Marking as missed.`);
              }
              setRobotStatus(ComponentStatus.READY);
            }, 3000);

            return newQueue;
          }
          return prevQueue;
        });

      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [systemStatus, actionQueue, addLog]);


  return (
    <div className="h-screen w-screen bg-gray-900 text-gray-200 font-sans flex flex-col p-2 gap-2">
      <div className="flex-grow flex gap-2 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-grow flex flex-col gap-2 w-3/5">
          <MainVisualization />
        </div>
        
        {/* Right Sidebar */}
        <div className="w-2/5 max-w-md lg:max-w-lg xl:max-w-xl flex-shrink-0">
          <RightSidebar
            systemStatus={systemStatus}
            cameraStatus={cameraStatus}
            robotStatus={robotStatus}
            conveyorStatus={conveyorStatus}
            currentAction={currentAction}
            actionQueue={actionQueue}
            selectedPackage={selectedPackage}
            onPackageSelect={setSelectedPackageId}
            onStartPause={handleStartPause}
            onEmergencyStop={handleEmergencyStop}
            onReset={handleReset}
          />
        </div>
      </div>
      
      {/* Bottom Log Panel */}
      <div className="h-1/3 max-h-60 flex-shrink-0">
        <SystemLogPanel logs={logs} onClear={() => setLogs([])} />
      </div>
    </div>
  );
};

export default App;