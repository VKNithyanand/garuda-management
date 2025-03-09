import React from 'react';
import WorkforceOptimization from '../components/workforce/WorkforceOptimization';

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Workforce Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor and optimize team performance</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Workforce Optimization</h2>
        <WorkforceOptimization />
      </div>
    </div>
  );
};

export default Dashboard;