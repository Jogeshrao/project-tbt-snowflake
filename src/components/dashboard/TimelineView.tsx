import React from 'react';
import { pipelineRuns } from '../../data/mockData';
import Card from '../common/Card';
import Timeline from '../common/Timeline';

const TimelineView: React.FC = () => {
  return (
    <Card title="Recent Pipeline Runs">
      <Timeline runs={pipelineRuns} />
    </Card>
  );
};

export default TimelineView;