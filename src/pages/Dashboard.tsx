import React from 'react';
import MetricsSection from '../components/dashboard/MetricsSection';
import PipelineStatus from '../components/dashboard/PipelineStatus';
import DagStatus from '../components/dashboard/DagStatus';
import TimelineView from '../components/dashboard/TimelineView';
import PipelineFlow from '../components/visualization/PipelineFlow';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Data Pipeline Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of your Airflow, dbt, and Snowflake data pipeline
        </p>
      </div>

      <MetricsSection />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PipelineFlow />
        <PipelineStatus />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DagStatus />
        <TimelineView />
      </div>
    </div>
  );
};

export default Dashboard;