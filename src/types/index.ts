export interface PipelineComponent {
  id: string;
  name: string;
  type: 'airflow' | 'dbt' | 'snowflake' | 'other';
  status: 'running' | 'success' | 'failed' | 'pending' | 'warning';
  lastRun?: string;
  nextRun?: string;
  description?: string;
}

export interface DAG {
  id: string;
  name: string;
  schedule: string;
  status: 'running' | 'success' | 'failed' | 'pending';
  lastRun?: string;
  nextRun?: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  name: string;
  status: 'running' | 'success' | 'failed' | 'pending';
  duration?: number;
  dependsOn: string[];
}

export interface DbtModel {
  id: string;
  name: string;
  path: string;
  type: 'staging' | 'marts' | 'snapshots';
  lastRun?: string;
  status: 'success' | 'failed' | 'pending';
  dependsOn: string[];
}

export interface PipelineRun {
  id: string;
  startTime: string;
  endTime?: string;
  status: 'running' | 'success' | 'failed';
  components: {
    id: string;
    name: string;
    type: 'airflow' | 'dbt' | 'snowflake';
    status: 'running' | 'success' | 'failed' | 'pending';
    startTime: string;
    endTime?: string;
  }[];
}

export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change?: number;
}