import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../../types';
import { Clock, AlertCircle, CheckCircle, ArrowRight, Trash2, Edit2 } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { useNotificationStore } from '../../store/notificationStore';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const { addNotification } = useNotificationStore();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress': return <ArrowRight className="h-5 w-5 text-blue-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleStatusChange = () => {
    const newStatus = task.status === 'todo' ? 'in-progress' : 
                     task.status === 'in-progress' ? 'completed' : 'todo';
    
    updateTask(task.id, { status: newStatus });
    
    addNotification({
      title: 'Task Status Updated',
      message: `Task "${task.title}" moved to ${newStatus.replace('-', ' ')}`,
      type: 'info',
      priority: 'low'
    });
  };

  const handleDelete = () => {
    deleteTask(task.id);
    addNotification({
      title: 'Task Deleted',
      message: `Task "${task.title}" has been deleted`,
      type: 'warning',
      priority: 'medium'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">{task.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.description}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleStatusChange}
        >
          {getStatusIcon(task.status)}
        </motion.button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className={`h-4 w-4 ${getPriorityColor(task.priority)}`} />
          <span className="text-sm capitalize dark:text-gray-300">{task.priority} Priority</span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Assignee:</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{task.assignee}</span>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;