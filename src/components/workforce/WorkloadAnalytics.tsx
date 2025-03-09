import React from 'react';
import { AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { WorkloadAnalysis } from '../../types';

interface WorkloadAnalyticsProps {
  analysis: WorkloadAnalysis;
}

const WorkloadAnalytics: React.FC<WorkloadAnalyticsProps> = ({ analysis }) => {
  const getBurnoutRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Workload Analysis</h3>
        <div className={`flex items-center gap-2 ${getBurnoutRiskColor(analysis.burnoutRisk)}`}>
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium capitalize">{analysis.burnoutRisk} Risk</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Current Workload</span>
          <span className="text-sm font-medium text-gray-800">{analysis.currentWorkload}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              analysis.currentWorkload >= 80
                ? 'bg-red-500'
                : analysis.currentWorkload >= 50
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${analysis.currentWorkload}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Task Distribution</h4>
        <div className="space-y-3">
          {analysis.taskDistribution.map((dist, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{dist.category}</span>
              <span className="text-sm font-medium text-gray-800">{dist.hours}h</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">AI Recommendations</h4>
        <ul className="space-y-2">
          {analysis.recommendations.map((rec, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-blue-500">•</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkloadAnalytics;