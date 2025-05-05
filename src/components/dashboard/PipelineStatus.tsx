import React from 'react';
import { pipelineComponents } from '../../data/mockData';
import StatusBadge from '../common/StatusBadge';
import Card from '../common/Card';
import { Activity, Calendar, Clock } from 'lucide-react';

const PipelineStatus: React.FC = () => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card title="Pipeline Status">
      <div className="space-y-4">
        {pipelineComponents.map((component) => (
          <div key={component.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-base font-medium text-gray-900 dark:text-white">{component.name}</h4>
              <StatusBadge status={component.status} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{component.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Clock size={16} className="mr-1.5 text-gray-400" />
                <span className="mr-1">Last run:</span>
                <span className="font-medium">{formatDate(component.lastRun)}</span>
              </div>
              {component.nextRun && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Calendar size={16} className="mr-1.5 text-gray-400" />
                  <span className="mr-1">Next run:</span>
                  <span className="font-medium">{formatDate(component.nextRun)}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PipelineStatus;