import { create } from 'zustand';
import { EmployeeWorkload } from '../types';
import { mockEmployeeWorkloads } from '../data/mockData';
import { useNotificationStore } from './notificationStore';

interface WorkforceStore {
  employees: EmployeeWorkload[];
  setEmployees: (employees: EmployeeWorkload[]) => void;
  importWorkforceData: (data: any[]) => void;
  updateEmployee: (id: string, updates: Partial<EmployeeWorkload>) => void;
  calculatePerformanceMetrics: (employeeId: string) => {
    efficiency: number;
    taskCompletionRate: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  };
}

export const useWorkforceStore = create<WorkforceStore>((set, get) => ({
  employees: mockEmployeeWorkloads,

  setEmployees: (employees) => set({ employees }),

  updateEmployee: (id, updates) => {
    const { addNotification } = useNotificationStore.getState();
    const currentEmployee = get().employees.find(emp => emp.id === id);
    
    if (!currentEmployee) return;

    const newWorkload = updates.workload ?? currentEmployee.workload;
    const newTasks = updates.tasks ?? currentEmployee.tasks;

    // Calculate new trend based on workload change
    let trend: 'increasing' | 'decreasing' | 'stable' = currentEmployee.trend;
    if (newWorkload > currentEmployee.workload) {
      trend = 'increasing';
    } else if (newWorkload < currentEmployee.workload) {
      trend = 'decreasing';
    }

    // Calculate new status
    let status = {
      status: newWorkload > 80 ? 'Overloaded' : newWorkload < 50 ? 'Underutilized' : 'Balanced',
      color: newWorkload > 80 ? 'border-red-500' : newWorkload < 50 ? 'border-yellow-500' : 'border-green-500',
      recommendation: newWorkload > 80 ? 'Reduce workload' : newWorkload < 50 ? 'Can take more tasks' : 'Maintain current workload'
    };

    // Generate recommendations based on new status
    const recommendations = [];
    if (newWorkload > 80) {
      recommendations.push(
        'Redistribute tasks to reduce workload',
        'Schedule workload review meeting',
        'Consider postponing non-critical tasks'
      );
    } else if (newWorkload < 50) {
      recommendations.push(
        'Available for additional tasks',
        'Consider skill development opportunities',
        'Review task allocation strategy'
      );
    } else {
      recommendations.push(
        'Maintain current workload balance',
        'Regular check-ins scheduled',
        'Monitor for changes in capacity'
      );
    }

    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? {
          ...emp,
          ...updates,
          trend,
          status,
          recommendations
        } : emp
      ),
    }));

    // Send notifications for significant changes
    if (newWorkload > 80) {
      addNotification({
        title: 'High Workload Alert',
        message: `${currentEmployee.name}'s workload has increased to ${newWorkload}%`,
        type: 'workload',
        priority: 'high'
      });
    }

    if (trend !== currentEmployee.trend) {
      addNotification({
        title: 'Performance Trend Change',
        message: `${currentEmployee.name}'s performance trend has changed to ${trend}`,
        type: 'performance',
        priority: 'medium'
      });
    }
  },

  calculatePerformanceMetrics: (employeeId) => {
    const employee = get().employees.find(emp => emp.id === employeeId);
    if (!employee) {
      return {
        efficiency: 0,
        taskCompletionRate: 0,
        trend: 'stable' as const
      };
    }

    // Calculate efficiency based on workload and tasks
    const efficiency = Math.min(100, Math.round((employee.tasks / (employee.workload / 40)) * 100));

    // Calculate task completion rate (simplified example)
    const taskCompletionRate = Math.min(100, Math.round((employee.tasks / 10) * 100));

    return {
      efficiency,
      taskCompletionRate,
      trend: employee.trend
    };
  },

  importWorkforceData: (data) => {
    const processedData = data.map((item, index) => {
      // Calculate status based on workload
      const workload = Number(item.workload);
      let status = {
        status: workload > 80 ? 'Overloaded' : workload < 50 ? 'Underutilized' : 'Balanced',
        color: workload > 80 ? 'border-red-500' : workload < 50 ? 'border-yellow-500' : 'border-green-500',
        recommendation: workload > 80 ? 'Reduce workload' : workload < 50 ? 'Can take more tasks' : 'Maintain current workload'
      };

      // Generate recommendations based on status
      const defaultRecommendations = [];
      if (workload > 80) {
        defaultRecommendations.push(
          'Consider redistributing tasks',
          'Schedule a workload review',
          'Prioritize critical tasks'
        );
      } else if (workload < 50) {
        defaultRecommendations.push(
          'Available for additional projects',
          'Consider skill development opportunities',
          'Review task allocation'
        );
      } else {
        defaultRecommendations.push(
          'Maintain current workload balance',
          'Monitor for changes in capacity',
          'Regular check-ins scheduled'
        );
      }

      return {
        id: item.id || String(index + 1),
        name: item.name,
        role: item.role,
        avatar: item.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}`,
        workload: workload,
        tasks: Number(item.tasks),
        status: item.status || status,
        trend: item.trend || (workload > 75 ? 'increasing' : workload < 40 ? 'decreasing' : 'stable'),
        recommendations: item.recommendations || defaultRecommendations
      };
    });

    set({ employees: processedData });

    // Update notifications based on workload changes
    const { addNotification } = useNotificationStore.getState();
    processedData.forEach(employee => {
      if (employee.workload > 80) {
        addNotification({
          title: 'High Workload Alert',
          message: `${employee.name} has a high workload of ${employee.workload}%`,
          type: 'workload',
          priority: 'high'
        });
      }
    });
  },
}));