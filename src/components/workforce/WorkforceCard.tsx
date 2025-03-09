import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '../../types';
import { AlertTriangle, Smile, Frown, TrendingUp, TrendingDown, Minus, Info, Clock, CheckCircle } from 'lucide-react';
import { useWorkforceStore } from '../../store/workforceStore';
import { useTaskStore } from '../../store/taskStore';
import DetailModal from '../shared/DetailModal';

interface WorkforceCardProps {
  user: User;
}

const WorkforceCard: React.FC<WorkforceCardProps> = ({ user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { calculatePerformanceMetrics } = useWorkforceStore();
  const { tasks } = useTaskStore();
  const metrics = calculatePerformanceMetrics(user.id);

  // Get active tasks for the user
  const userTasks = tasks.filter(task => task.assignee === user.name);

  const getWorkloadStatus = (workload: number) => {
    if (workload >= 80) return { icon: AlertTriangle, color: 'text-red-500', text: 'High Risk' };
    if (workload >= 50) return { icon: Frown, color: 'text-yellow-500', text: 'Moderate' };
    return { icon: Smile, color: 'text-green-500', text: 'Healthy' };
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const status = getWorkloadStatus(user.workload);
  const StatusIcon = status.icon;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 dark:text-white">{user.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
          </div>
          <StatusIcon className={`h-5 w-5 ${status.color}`} />
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Workload</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{user.workload}%</span>
              {getTrendIcon(metrics.trend)}
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                user.workload >= 80
                  ? 'bg-red-500'
                  : user.workload >= 50
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${user.workload}%` }}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Efficiency</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {metrics.efficiency}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Task Completion</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {metrics.taskCompletionRate}%
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowDetails(true)}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 
                     text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
        >
          <Info className="h-4 w-4" />
          View Details
        </motion.button>
      </motion.div>

      <DetailModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title={`${user.name}'s Details`}
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Work Statistics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Work Hours</p>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">{user.workHours}h</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Engagement Score</p>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">{user.engagementScore}%</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Performance Metrics</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{metrics.efficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${metrics.efficiency}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Task Completion</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{metrics.taskCompletionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${metrics.taskCompletionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              Active Tasks ({userTasks.length})
            </h4>
            <div className="space-y-3">
              {userTasks.length > 0 ? (
                userTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          <h5 className="font-medium text-gray-800 dark:text-white">
                            {task.title}
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {task.description}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600 dark:text-gray-400">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          Est: {task.estimatedHours}h
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {task.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                  No active tasks assigned
                </p>
              )}
            </div>
          </div>
        </div>
      </DetailModal>
    </>
  );
};

export default WorkforceCard;