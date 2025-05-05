import React from 'react';
import { BarChart2, Calendar, Database, GitBranch, Home, Layers, Settings, Sliders } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:translate-x-0`}
    >
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center px-4 border-b border-gray-700">
          <span className="text-xl font-bold">DataPipe</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            <a
              href="#"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-gray-900 text-white"
            >
              <Home className="mr-3 h-6 w-6" />
              Dashboard
            </a>
            <a
              href="#"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <GitBranch className="mr-3 h-6 w-6" />
              Pipelines
            </a>
            <a
              href="#"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Layers className="mr-3 h-6 w-6" />
              dbt Models
            </a>
            <a
              href="#"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Database className="mr-3 h-6 w-6" />
              Snowflake
            </a>
            <a
              href="#"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <BarChart2 className="mr-3 h-6 w-6" />
              Metrics
            </a>
            <a
              href="#"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Calendar className="mr-3 h-6 w-6" />
              Schedule
            </a>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <a
            href="#"
            className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Settings className="mr-3 h-6 w-6" />
            Settings
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;