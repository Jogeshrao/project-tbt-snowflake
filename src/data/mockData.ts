import { PipelineComponent, DAG, DbtModel, PipelineRun, Metric, Task } from '../types';

// Pipeline Components
export const pipelineComponents: PipelineComponent[] = [
  {
    id: 'airflow-1',
    name: 'Airflow Orchestration',
    type: 'airflow',
    status: 'success',
    lastRun: '2025-05-15T08:30:00Z',
    nextRun: '2025-05-15T12:30:00Z',
    description: 'Main Airflow instance orchestrating all data pipelines'
  },
  {
    id: 'dbt-1',
    name: 'dbt Transformations',
    type: 'dbt',
    status: 'running',
    lastRun: '2025-05-15T08:32:00Z',
    description: 'dbt models for transforming raw data into business models'
  },
  {
    id: 'snowflake-1',
    name: 'Snowflake Data Warehouse',
    type: 'snowflake',
    status: 'success',
    lastRun: '2025-05-15T08:35:00Z',
    description: 'Main Snowflake instance storing all processed data'
  }
];

// Airflow DAGs
export const dags: DAG[] = [
  {
    id: 'dag-1',
    name: 'snowflake_dbt_pipeline',
    schedule: '0 */4 * * *',
    status: 'running',
    lastRun: '2025-05-15T08:30:00Z',
    nextRun: '2025-05-15T12:30:00Z',
    tasks: [
      {
        id: 'task-1',
        name: 'extract_orders_data',
        status: 'success',
        duration: 125,
        dependsOn: []
      },
      {
        id: 'task-2',
        name: 'load_to_snowflake',
        status: 'success',
        duration: 65,
        dependsOn: ['task-1']
      },
      {
        id: 'task-3',
        name: 'run_dbt_models',
        status: 'running',
        duration: 180,
        dependsOn: ['task-2']
      },
      {
        id: 'task-4',
        name: 'validate_data',
        status: 'pending',
        dependsOn: ['task-3']
      }
    ]
  },
  {
    id: 'dag-2',
    name: 'daily_sales_report',
    schedule: '0 1 * * *',
    status: 'success',
    lastRun: '2025-05-15T01:00:00Z',
    nextRun: '2025-05-16T01:00:00Z',
    tasks: [
      {
        id: 'task-5',
        name: 'extract_sales_data',
        status: 'success',
        duration: 85,
        dependsOn: []
      },
      {
        id: 'task-6',
        name: 'transform_sales_data',
        status: 'success',
        duration: 120,
        dependsOn: ['task-5']
      },
      {
        id: 'task-7',
        name: 'generate_report',
        status: 'success',
        duration: 45,
        dependsOn: ['task-6']
      }
    ]
  }
];

// dbt models
export const dbtModels: DbtModel[] = [
  {
    id: 'model-1',
    name: 'stg_orders',
    path: 'models/staging/stg_orders.sql',
    type: 'staging',
    lastRun: '2025-05-15T08:40:00Z',
    status: 'success',
    dependsOn: []
  },
  {
    id: 'model-2',
    name: 'stg_customers',
    path: 'models/staging/stg_customers.sql',
    type: 'staging',
    lastRun: '2025-05-15T08:41:00Z',
    status: 'success',
    dependsOn: []
  },
  {
    id: 'model-3',
    name: 'fct_sales',
    path: 'models/marts/fct_sales.sql',
    type: 'marts',
    lastRun: '2025-05-15T08:45:00Z',
    status: 'success',
    dependsOn: ['model-1', 'model-2']
  },
  {
    id: 'model-4',
    name: 'fct_customer_orders',
    path: 'models/marts/fct_customer_orders.sql',
    type: 'marts',
    lastRun: '2025-05-15T08:48:00Z',
    status: 'running',
    dependsOn: ['model-3']
  }
];

// Pipeline runs
export const pipelineRuns: PipelineRun[] = [
  {
    id: 'run-1',
    startTime: '2025-05-15T08:30:00Z',
    status: 'running',
    components: [
      {
        id: 'airflow-comp-1',
        name: 'Airflow Orchestration',
        type: 'airflow',
        status: 'success',
        startTime: '2025-05-15T08:30:00Z',
        endTime: '2025-05-15T08:32:00Z'
      },
      {
        id: 'dbt-comp-1',
        name: 'dbt Transformations',
        type: 'dbt',
        status: 'running',
        startTime: '2025-05-15T08:32:00Z'
      }
    ]
  },
  {
    id: 'run-2',
    startTime: '2025-05-15T04:30:00Z',
    endTime: '2025-05-15T04:55:00Z',
    status: 'success',
    components: [
      {
        id: 'airflow-comp-2',
        name: 'Airflow Orchestration',
        type: 'airflow',
        status: 'success',
        startTime: '2025-05-15T04:30:00Z',
        endTime: '2025-05-15T04:32:00Z'
      },
      {
        id: 'dbt-comp-2',
        name: 'dbt Transformations',
        type: 'dbt',
        status: 'success',
        startTime: '2025-05-15T04:32:00Z',
        endTime: '2025-05-15T04:45:00Z'
      },
      {
        id: 'snowflake-comp-2',
        name: 'Snowflake Data Warehouse',
        type: 'snowflake',
        status: 'success',
        startTime: '2025-05-15T04:45:00Z',
        endTime: '2025-05-15T04:55:00Z'
      }
    ]
  },
  {
    id: 'run-3',
    startTime: '2025-05-15T00:30:00Z',
    endTime: '2025-05-15T00:50:00Z',
    status: 'failed',
    components: [
      {
        id: 'airflow-comp-3',
        name: 'Airflow Orchestration',
        type: 'airflow',
        status: 'success',
        startTime: '2025-05-15T00:30:00Z',
        endTime: '2025-05-15T00:32:00Z'
      },
      {
        id: 'dbt-comp-3',
        name: 'dbt Transformations',
        type: 'dbt',
        status: 'failed',
        startTime: '2025-05-15T00:32:00Z',
        endTime: '2025-05-15T00:40:00Z'
      }
    ]
  }
];

// Metrics
export const metrics: Metric[] = [
  {
    id: 'metric-1',
    name: 'Pipeline Success Rate',
    value: 92,
    unit: '%',
    trend: 'up',
    change: 3.5
  },
  {
    id: 'metric-2',
    name: 'Average Runtime',
    value: 18.5,
    unit: 'min',
    trend: 'down',
    change: 2.1
  },
  {
    id: 'metric-3',
    name: 'Data Processed',
    value: 458,
    unit: 'GB',
    trend: 'up',
    change: 12.3
  },
  {
    id: 'metric-4',
    name: 'Failed Jobs',
    value: 2,
    unit: '',
    trend: 'down',
    change: 1
  }
];