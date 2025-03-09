import React from 'react';
import { Lightbulb, TrendingUp, Award } from 'lucide-react';
import { AIRecommendation } from '../../types';

interface AIInsightsProps {
  recommendations: AIRecommendation[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ recommendations }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'workload_balance': return <TrendingUp className="h-5 w-5" />;
      case 'skill_development': return <Award className="h-5 w-5" />;
      default: return <Lightbulb className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">AI Insights & Recommendations</h3>
      <div className="space-y-6">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div className="flex items-start gap-4">
              <div className={`${getPriorityColor(rec.priority)} mt-1`}>
                {getTypeIcon(rec.type)}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{rec.description}</h4>
                <p className="text-sm text-gray-500 mt-1">Impact: {rec.impact}</p>
                
                <div className="mt-3">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Suggested Actions:</h5>
                  <ul className="space-y-1">
                    {rec.suggestedActions.map((action, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;