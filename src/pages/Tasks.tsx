import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '../components/tasks/TaskCard';
import TaskDelegation from '../components/tasks/TaskDelegation';
import TaskForm from '../components/tasks/TaskForm';
import { Plus, Filter } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { Task } from '../types';

const Tasks = () => {
  const { tasks, setTasks } = useTaskStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showTaskForm, setShowTaskForm] = useState(false);

  const filteredTasks = tasks.filter(task => 
    filterStatus === 'all' ? true : task.status === filterStatus
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setTasks(arrayMove(
        tasks,
        tasks.findIndex((task) => task.id === active.id),
        tasks.findIndex((task) => task.id === over.id)
      ));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Task Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track team tasks</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowTaskForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Task
        </motion.button>
      </div>

      <div className="mb-8">
        <TaskDelegation />
      </div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6"
      >
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 
                     text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </motion.div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredTasks} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </AnimatePresence>
        </SortableContext>
      </DndContext>

      <AnimatePresence>
        {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default Tasks;