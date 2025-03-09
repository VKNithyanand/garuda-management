import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload } from 'lucide-react';
import PerformanceMetrics from '../components/performance/PerformanceMetrics';
import PerformanceTrends from '../components/performance/PerformanceTrends';
import LeadershipInsights from '../components/performance/LeadershipInsights';
import PerformanceImport from '../components/performance/PerformanceImport';
import { useNotificationStore } from '../store/notificationStore';
import { usePerformanceStore } from '../store/performanceStore';

const Performance = () => {
  const [showImport, setShowImport] = useState(false);
  const { performanceData, addPerformanceData } = usePerformanceStore();
  const { addNotification } = useNotificationStore();

  const handleImport = (data: any[]) => {
    addPerformanceData(data);
    addNotification({
      title: 'Performance Data Updated',
      message: 'Performance metrics have been updated with new data',
      type: 'success',
      priority: 'medium'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Performance Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and analyze team performance metrics</p>
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

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Key Metrics</h2>
          <PerformanceMetrics />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Performance Trends</h2>
          <PerformanceTrends data={performanceData} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Leadership Insights</h2>
          <LeadershipInsights />
        </div>
      </div>

      <AnimatePresence>
        {showImport && (
          <PerformanceImport
            onClose={() => setShowImport(false)}
            onImport={handleImport}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Performance;