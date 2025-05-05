import React from 'react';
import { metrics } from '../../data/mockData';
import MetricCard from '../common/MetricCard';

const MetricsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
};

export default MetricsSection;