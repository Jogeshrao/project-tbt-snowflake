import React from 'react';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { Metric } from '../../types';
import Card from './Card';

interface MetricCardProps {
  metric: Metric;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, className = '' }) => {
  const renderTrend = () => {
    if (metric.trend === 'up') {
      return (
        <div className="flex items-center text-green-600 dark:text-green-400">
          <ArrowUp size={16} className="mr-1" />
          <span>{metric.change}%</span>
        </div>
      );
    } else if (metric.trend === 'down') {
      const isPositive = metric.name.toLowerCase().includes('fail') || 
                        metric.name.toLowerCase().includes('error');
      
      return (
        <div className={`flex items-center ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          <ArrowDown size={16} className="mr-1" />
          <span>{metric.change}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Minus size={16} className="mr-1" />
          <span>0%</span>
        </div>
      );
    }
  };

  return (
    <Card className={className}>
      <div className="flex flex-col">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.name}</div>
        <div className="mt-1 flex items-baseline justify-between">
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {metric.value}
            {metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}
          </div>
          {renderTrend()}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;