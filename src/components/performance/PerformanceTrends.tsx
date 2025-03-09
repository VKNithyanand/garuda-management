import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { PerformanceData } from '../../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface PerformanceTrendsProps {
  data: PerformanceData[];
}

const PerformanceTrends: React.FC<PerformanceTrendsProps> = ({ data }) => {
  const { isDarkMode } = useThemeStore();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'decreasing':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-gray-500" />;
    }
  };

  const chartData = useMemo(() => {
    const dateMap = new Map();
    
    // Sort data by timestamp first
    const sortedData = [...data].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // Process data into the map
    sortedData.forEach(item => {
      const date = new Date(item.timestamp).toISOString().split('T')[0];
      if (!dateMap.has(date)) {
        dateMap.set(date, {
          date,
          efficiency: null,
          engagement: null,
          quality: null,
          leadership: null
        });
      }
      dateMap.get(date)[item.metric] = item.value;
    });

    // Convert map to array and ensure dates are sorted
    return Array.from(dateMap.values())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  const getLatestMetric = (metricName: string) => {
    const metricData = data
      .filter(d => d.metric === metricName)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return metricData[0] || { value: 0, trend: 'stable' };
  };

  const metrics = ['efficiency', 'engagement', 'quality', 'leadership'];
  const colors = {
    efficiency: '#3B82F6',
    engagement: '#10B981',
    quality: '#F59E0B',
    leadership: '#8B5CF6'
  };

  const themeColors = {
    background: isDarkMode ? '#1F2937' : '#FFFFFF',
    text: isDarkMode ? '#F3F4F6' : '#1F2937',
    grid: isDarkMode ? '#374151' : '#E5E7EB',
    tooltip: {
      background: isDarkMode ? '#374151' : '#FFFFFF',
      text: isDarkMode ? '#F3F4F6' : '#1F2937'
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Performance Trends
      </h2>

      {data.length === 0 ? (
        <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
          No performance data available. Import data to see trends.
        </div>
      ) : (
        <div className="h-80 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={themeColors.grid}
                opacity={0.5}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke={themeColors.text}
                tick={{ fill: themeColors.text }}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                minTickGap={30}
              />
              <YAxis
                stroke={themeColors.text}
                tick={{ fill: themeColors.text }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: themeColors.tooltip.background,
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: themeColors.tooltip.text,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [`${value}%`]}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{
                  paddingBottom: '20px'
                }}
              />
              {metrics.map(metric => (
                <Bar
                  key={metric}
                  dataKey={metric}
                  name={metric.charAt(0).toUpperCase() + metric.slice(1)}
                  fill={colors[metric as keyof typeof colors]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(metric => {
          const metricData = getLatestMetric(metric);
          return (
            <motion.div
              key={metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {metric}
                </h3>
                {getTrendIcon(metricData.trend)}
              </div>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                {metricData.value}%
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceTrends;