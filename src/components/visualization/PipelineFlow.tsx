import React, { useEffect, useRef } from 'react';
import { pipelineComponents, dags, dbtModels } from '../../data/mockData';
import Card from '../common/Card';

const PipelineFlow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ) => {
    const headLen = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    
    // Draw a curved line
    const cp1x = fromX + (toX - fromX) * 0.5;
    const cp1y = fromY;
    const cp2x = toX - (toX - fromX) * 0.5;
    const cp2y = toY;
    
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, toX, toY);
    ctx.stroke();
    
    // Draw the arrow head
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLen * Math.cos(angle - Math.PI / 6),
      toY - headLen * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      toX - headLen * Math.cos(angle + Math.PI / 6),
      toY - headLen * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  };
  
  const drawComponent = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    label: string,
    type: string,
    status: string
  ) => {
    // Set color based on component type
    let bgColor;
    switch (type) {
      case 'airflow':
        bgColor = '#1d4ed8'; // blue-700
        break;
      case 'dbt':
        bgColor = '#0f766e'; // teal-700
        break;
      case 'snowflake':
        bgColor = '#0369a1'; // sky-700
        break;
      default:
        bgColor = '#4b5563'; // gray-600
    }
    
    // Adjust opacity based on status
    let statusColor;
    switch (status) {
      case 'success':
        statusColor = '#22c55e'; // green-500
        break;
      case 'failed':
        statusColor = '#ef4444'; // red-500
        break;
      case 'running':
        statusColor = '#3b82f6'; // blue-500
        break;
      default:
        statusColor = '#9ca3af'; // gray-400
    }
    
    // Draw component rectangle with rounded corners
    const radius = 8;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    
    // Fill component
    ctx.fillStyle = bgColor;
    ctx.fill();
    
    // Draw status indicator
    ctx.beginPath();
    ctx.arc(x + width - 15, y + 15, 5, 0, Math.PI * 2);
    ctx.fillStyle = statusColor;
    ctx.fill();
    
    // Draw label
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x + width / 2, y + height / 2);
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas dimensions based on container
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Get components
    const airflow = pipelineComponents.find(c => c.type === 'airflow');
    const dbt = pipelineComponents.find(c => c.type === 'dbt');
    const snowflake = pipelineComponents.find(c => c.type === 'snowflake');
    
    // Draw connections
    if (airflow && dbt && snowflake) {
      const componentWidth = 150;
      const componentHeight = 70;
      
      // Position components
      const airflowX = 50;
      const airflowY = canvas.height / 2 - componentHeight / 2;
      
      const dbtX = canvas.width / 2 - componentWidth / 2;
      const dbtY = canvas.height / 2 - componentHeight / 2;
      
      const snowflakeX = canvas.width - componentWidth - 50;
      const snowflakeY = canvas.height / 2 - componentHeight / 2;
      
      // Draw connections
      ctx.strokeStyle = '#d1d5db'; // gray-300
      ctx.lineWidth = 2;
      ctx.fillStyle = '#d1d5db';
      
      // Airflow to dbt
      drawArrow(
        ctx,
        airflowX + componentWidth,
        airflowY + componentHeight / 2,
        dbtX,
        dbtY + componentHeight / 2
      );
      
      // dbt to Snowflake
      drawArrow(
        ctx,
        dbtX + componentWidth,
        dbtY + componentHeight / 2,
        snowflakeX,
        snowflakeY + componentHeight / 2
      );
      
      // Draw components
      drawComponent(
        ctx,
        airflowX,
        airflowY,
        componentWidth,
        componentHeight,
        'Airflow',
        'airflow',
        airflow.status
      );
      
      drawComponent(
        ctx,
        dbtX,
        dbtY,
        componentWidth,
        componentHeight,
        'dbt',
        'dbt',
        dbt.status
      );
      
      drawComponent(
        ctx,
        snowflakeX,
        snowflakeY,
        componentWidth,
        componentHeight,
        'Snowflake',
        'snowflake',
        snowflake.status
      );
      
      // Add Labels
      ctx.fillStyle = '#6b7280'; // gray-500
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      
      // Label between Airflow and dbt
      ctx.fillText(
        'Orchestrates',
        (airflowX + componentWidth + dbtX) / 2,
        airflowY + componentHeight / 2 - 15
      );
      
      // Label between dbt and Snowflake
      ctx.fillText(
        'Transforms',
        (dbtX + componentWidth + snowflakeX) / 2,
        dbtY + componentHeight / 2 - 15
      );
    }
  }, []);
  
  return (
    <Card title="Pipeline Workflow Visualization">
      <div className="h-64 w-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>
      <div className="mt-4 flex justify-center gap-6">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-700 mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Airflow</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-teal-700 mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">dbt</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-sky-700 mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Snowflake</span>
        </div>
      </div>
    </Card>
  );
};

export default PipelineFlow;