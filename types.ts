
export enum SystemStatus {
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  ERROR = 'ERROR',
  INITIALIZING = 'INITIALIZING',
  STOPPED = 'STOPPED',
}

export enum ComponentStatus {
  ONLINE = 'ONLINE',
  READY = 'READY',
  ACTIVE = 'ACTIVE',
  MOVING = 'MOVING',
  GRASPING = 'GRASPING',
  STOPPED = 'STOPPED',
  DISCONNECTED = 'DISCONNECTED',
  ERROR = 'ERROR',
}

export enum PackageStatus {
  WAITING = 'Waiting',
  GRASPING = 'Grasping',
  MISSED = 'Missed',
  GRASPED = 'Grasped',
}

export interface Package {
  id: string;
  status: PackageStatus;
  objectClass: string;
  confidence: number;
  position: [number, number, number];
  orientation: [number, number, number, number]; // Quaternion w, x, y, z
  graspStrategy: string;
  queueTime: Date;
}

export enum LogLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

export interface LogEntry {
  id: number;
  timestamp: Date;
  level: LogLevel;
  message: string;
}
