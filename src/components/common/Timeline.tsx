import React from 'react';
import { PipelineRun } from '../../types';
import StatusBadge from './StatusBadge';

interface TimelineProps {
  runs: PipelineRun[];
}

const Timeline: React.FC<TimelineProps> = ({ runs }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const calculateDuration = (startTime: string, endTime?: string) => {
    if (!endTime) return 'In progress';
    
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const durationMs = end - start;
    
    const minutes = Math.floor(durationMs / 1000 / 60);
    const seconds = Math.floor((durationMs / 1000) % 60);
    
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {runs.map((run, runIdx) => (
          <li key={run.id}>
            <div className="relative pb-8">
              {runIdx !== runs.length - 1 ? (
                <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-900 ${
                    run.status === 'success' ? 'bg-green-100 dark:bg-green-900' : 
                    run.status === 'failed' ? 'bg-red-100 dark:bg-red-900' : 
                    'bg-blue-100 dark:bg-blue-900'
                  }`}>
                    <span className={`h-5 w-5 rounded-full ${
                      run.status === 'success' ? 'bg-green-500' : 
                      run.status === 'failed' ? 'bg-red-500' : 
                      'bg-blue-500'
                    }`} />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                      Pipeline Run #{run.id.split('-')[1]}
                      <span className="ml-2">
                        <StatusBadge status={run.status} />
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Started at {formatDate(run.startTime)}
                      {run.endTime && ` • Completed at ${formatDate(run.endTime)}`}
                      {' • '}
                      {calculateDuration(run.startTime, run.endTime)}
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="space-y-3">
                      {run.components.map((component) => (
                        <div key={component.id} className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {component.type === 'airflow' ? 'AF' : 
                               component.type === 'dbt' ? 'DBT' : 'SF'}
                            </span>
                          </div>
                          <div className="ml-3 flex flex-col">
                            <span className="text-sm font-medium">{component.name}</span>
                            <span className="text-xs text-gray-500">
                              {calculateDuration(component.startTime, component.endTime)}
                              {' • '}
                              <StatusBadge status={component.status} className="ml-1" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;