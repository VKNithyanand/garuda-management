import React from 'react';
import { BarChart2, TrendingUp, Users, Clock } from 'lucide-react';
import { usePerformanceStore } from '../../store/performanceStore';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mt-1">{value}</h3>
      </div>
      <div className={`h-12 w-12 rounded-full flex items-center justify-center bg-blue-50 dark:bg-blue-900/20`}>
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? '+' : ''}{change}%
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
    </div>
  </motion.div>
);

const PerformanceMetrics: React.FC = () => {
  const { getLatestMetrics } = usePerformanceStore();
  const metrics = getLatestMetrics();

  const metricConfigs = [
    {
      title: 'Team Productivity',
      value: `${metrics.productivity.value}%`,
      change: metrics.productivity.change,
      icon: <BarChart2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    },
    {
      title: 'Growth Rate',
      value: `${metrics.growth.value}%`,
      change: metrics.growth.change,
      icon: <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    },
    {
      title: 'Team Capacity',
      value: `${metrics.capacity.value}%`,
      change: metrics.capacity.change,
      icon: <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    },
    {
      title: 'Response Time',
      value: `${metrics.response.value}%`,
      change: metrics.response.change,
      icon: <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricConfigs.map((metric, index) => (
        <MetricCard key={`${metric.title}-${index}`} {...metric} />
      ))}
    </div>
  );
};

export default PerformanceMetrics;