export interface LabService {
  id: string;
  name: string;
  description: string;
  category: 'smart-home' | 'infrastructure' | 'media' | 'monitoring' | 'storage';
  url: string;
  port?: number;
  iconName: string;
  isPrimary?: boolean;
  status: 'online' | 'standby' | 'external';
  customizable?: boolean;
}

export interface NetworkStatus {
  online: boolean;
  localTime: string;
  pingMs: number;
  activeNodes: number;
}
