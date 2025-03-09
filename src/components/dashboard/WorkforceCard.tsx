import React from 'react';
import { User } from '../../types';
import { AlertTriangle, Smile, Frown } from 'lucide-react';

interface WorkforceCardProps {
  user: User;
}

const WorkforceCard: React.FC<WorkforceCardProps> = ({ user }) => {
  const getWorkloadStatus = (workload: number) => {
    if (workload >= 80) return { icon: AlertTriangle, color: 'text-red-500', text: 'High Risk' };
    if (workload >= 50) return { icon: Frown, color: 'text-yellow-500', text: 'Moderate' };
    return { icon: Smile, color: 'text-green-500', text: 'Healthy' };
  };

  const status = getWorkloadStatus(user.workload);
  const StatusIcon = status.icon;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
        <StatusIcon className={`h-5 w-5 ${status.color}`} />
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Workload</span>
          <span className="text-sm font-medium text-gray-800">{user.workload}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
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
    </div>
  );
};

export default WorkforceCard;