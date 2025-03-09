import React from 'react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../../store/taskStore';
import { useNotificationStore } from '../../store/notificationStore';
import { Task } from '../../types';
import { Notebook as Robot, Users, AlertTriangle } from 'lucide-react';

const TaskDelegation: React.FC = () => {
  const { tasks, users, detectAutomation, getOptimalAssignee, assignTask } = useTaskStore();
  const { addNotification } = useNotificationStore();

  const handleAssignment = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const optimalAssignee = users.find((u) => u.name === getOptimalAssignee(task));
    if (optimalAssignee) {
      assignTask(taskId, optimalAssignee.id);
      
      addNotification({
        title: 'Task Reassigned',
        message: `Task "${task.title}" has been assigned to ${optimalAssignee.name}`,
        type: 'success',
        priority: 'medium'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Smart Task Delegation
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Robot className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {tasks.filter((t) => detectAutomation(t)).length} Automatable
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {users.length} Team Members
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{task.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {task.description}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {detectAutomation(task) && (
                <div className="flex items-center space-x-2 text-purple-500">
                  <Robot className="h-5 w-5" />
                  <span className="text-sm">Automatable</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Current Assignee: {task.assignee}
                </span>
                {task.assignee !== getOptimalAssignee(task) && (
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs">Suboptimal Assignment</span>
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAssignment(task.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Optimize Assignment
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TaskDelegation;