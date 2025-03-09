import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Award, Brain, MessageSquare } from 'lucide-react';
import { usePerformanceStore } from '../../store/performanceStore';

const LeadershipInsights = () => {
  const { leadershipMetrics, performanceInsights } = usePerformanceStore();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'communication':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'initiative':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'mentorship':
        return <Award className="h-5 w-5 text-purple-500" />;
      case 'innovation':
        return <Brain className="h-5 w-5 text-yellow-500" />;
      default:
        return <Star className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Leadership Potential Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
            Leadership Metrics
          </h3>
          <div className="space-y-4">
            {leadershipMetrics.map((metric) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(metric.category)}
                    <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {metric.category.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {metric.score}/10
                  </span>
                </div>
                <div className="space-y-2">
                  {metric.evidence.map((evidence, index) => (
                    <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                      • {evidence}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
            Development Insights
          </h3>
          <div className="space-y-4">
            {performanceInsights.map((insight) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`border-l-4 ${
                  insight.type === 'strength'
                    ? 'border-l-green-500'
                    : insight.type === 'improvement'
                    ? 'border-l-yellow-500'
                    : 'border-l-blue-500'
                } rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm`}
              >
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                  {insight.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {insight.description}
                </p>
                <div className="space-y-2">
                  {insight.recommendations.map((rec, index) => (
                    <p key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {rec}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipInsights;