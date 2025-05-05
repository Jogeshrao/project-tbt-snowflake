import React from 'react';
import { dags } from '../../data/mockData';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import { Calendar, Clock } from 'lucide-react';

const DagStatus: React.FC = () => {
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
    <Card title="DAG Status">
      <div className="space-y-5">
        {dags.map((dag) => (
          <div key={dag.id} className="border-b border-gray-200 dark:border-gray-700 pb-5 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-base font-medium text-gray-900 dark:text-white">{dag.name}</h4>
              <StatusBadge status={dag.status} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Clock size={16} className="mr-1.5 text-gray-400" />
                <span className="mr-1">Last run:</span>
                <span className="font-medium">{formatDate(dag.lastRun)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Calendar size={16} className="mr-1.5 text-gray-400" />
                <span className="mr-1">Next run:</span>
                <span className="font-medium">{formatDate(dag.nextRun)}</span>
              </div>
            </div>
            
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tasks:</h5>
            <div className="space-y-2">
              {dag.tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 rounded p-2">
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0 
                      ${task.status === 'success' ? 'bg-green-500' : 
                        task.status === 'failed' ? 'bg-red-500' : 
                        task.status === 'running' ? 'bg-blue-500' : 'bg-gray-400'}"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{task.name}</span>
                  </div>
                  <div className="flex items-center">
                    {task.duration && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{task.duration}s</span>
                    )}
                    <StatusBadge status={task.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DagStatus;