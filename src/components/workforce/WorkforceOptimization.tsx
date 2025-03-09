import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Upload, Brain, Users, Clock } from 'lucide-react';
import { useWorkforceStore } from '../../store/workforceStore';
import WorkforceImport from './WorkforceImport';

const WorkforceOptimization = () => {
  const { employees } = useWorkforceStore();
  const [showImport, setShowImport] = useState(false);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-5 w-5 text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="h-5 w-5 text-green-500" />;
      default:
        return <Minus className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAIInsightColor = (workload: number) => {
    if (workload > 80) return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
    if (workload > 60) return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
    return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
  };

  const getWorkloadDistribution = () => {
    const distribution = {
      overloaded: employees.filter(emp => emp.workload > 80).length,
      optimal: employees.filter(emp => emp.workload >= 50 && emp.workload <= 80).length,
      underutilized: employees.filter(emp => emp.workload < 50).length
    };

    return {
      ...distribution,
      total: employees.length,
      overloadedPercentage: Math.round((distribution.overloaded / employees.length) * 100),
      optimalPercentage: Math.round((distribution.optimal / employees.length) * 100),
      underutilizedPercentage: Math.round((distribution.underutilized / employees.length) * 100)
    };
  };

  const getTeamInsights = () => {
    const avgWorkload = employees.reduce((sum, emp) => sum + emp.workload, 0) / employees.length;
    const workloadTrend = employees.filter(emp => emp.trend === 'increasing').length > employees.length / 2
      ? 'increasing'
      : 'stable';

    return {
      avgWorkload: Math.round(avgWorkload),
      workloadTrend,
      riskLevel: avgWorkload > 75 ? 'high' : avgWorkload > 60 ? 'medium' : 'low',
      recommendations: [
        'Consider hiring additional team members',
        'Redistribute tasks among team members',
        'Review project timelines and deadlines',
        'Implement automation for repetitive tasks'
      ]
    };
  };

  const distribution = getWorkloadDistribution();
  const teamInsights = getTeamInsights();

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-500" />
              AI Workforce Analysis
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Real-time insights and recommendations for team optimization
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowImport(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Upload className="h-5 w-5" />
            Import Data
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-purple-500" />
              <h3 className="font-medium text-gray-800 dark:text-white">Team Distribution</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Overloaded</span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {distribution.overloadedPercentage}% ({distribution.overloaded})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Optimal</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {distribution.optimalPercentage}% ({distribution.optimal})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Underutilized</span>
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  {distribution.underutilizedPercentage}% ({distribution.underutilized})
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-blue-500" />
              <h3 className="font-medium text-gray-800 dark:text-white">Workload Metrics</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Average Workload</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {teamInsights.avgWorkload}%
                  </span>
                  {getTrendIcon(teamInsights.workloadTrend)}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Risk Level</span>
                <span className={`text-sm font-medium capitalize ${
                  teamInsights.riskLevel === 'high' ? 'text-red-600 dark:text-red-400' :
                  teamInsights.riskLevel === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-green-600 dark:text-green-400'
                }`}>
                  {teamInsights.riskLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-5 w-5 text-green-500" />
              <h3 className="font-medium text-gray-800 dark:text-white">AI Recommendations</h3>
            </div>
            <ul className="space-y-2">
              {teamInsights.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg border-l-4 ${employee.status.color}`}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {employee.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{employee.role}</p>
                </div>
                {getTrendIcon(employee.trend)}
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Workload</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {employee.workload}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      employee.workload > 80
                        ? 'bg-red-500'
                        : employee.workload > 60
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${employee.workload}%` }}
                  />
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AI Insights
                </h4>
                <div className={`p-3 rounded-lg ${getAIInsightColor(employee.workload)}`}>
                  <p className="text-sm">{employee.status.recommendation}</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recommendations
                </h4>
                <ul className="space-y-1">
                  {employee.recommendations.map((rec, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2"
                    >
                      <span className="text-blue-500">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Active Tasks: {employee.tasks}
                  </span>
                  <span className={`text-sm font-medium ${
                    employee.workload > 80 ? 'text-red-500' :
                    employee.workload > 60 ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    {employee.status.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showImport && (
          <WorkforceImport onClose={() => setShowImport(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default WorkforceOptimization;