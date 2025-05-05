import React from 'react';

type StatusType = 'running' | 'success' | 'failed' | 'pending' | 'warning';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'running':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-200',
          label: 'Running'
        };
      case 'success':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          label: 'Success'
        };
      case 'failed':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          label: 'Failed'
        };
      case 'pending':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          label: 'Pending'
        };
      case 'warning':
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-800',
          border: 'border-amber-200',
          label: 'Warning'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text} border ${config.border} ${className}`}
    >
      <span className="relative flex h-2 w-2 mr-1.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.status === 'running' ? 'bg-blue-400 opacity-75' : 'opacity-0'}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${status === 'success' ? 'bg-green-500' : status === 'failed' ? 'bg-red-500' : status === 'running' ? 'bg-blue-500' : status === 'warning' ? 'bg-amber-500' : 'bg-gray-500'}`}></span>
      </span>
      {config.label}
    </span>
  );
};

export default StatusBadge;