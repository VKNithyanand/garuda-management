import { create } from 'zustand';
import { Task, User } from '../types';
import { mockTasks, mockUsers } from '../data/mockData';

interface TaskStore {
  tasks: Task[];
  users: User[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  assignTask: (taskId: string, userId: string) => void;
  detectAutomation: (task: Task) => boolean;
  getOptimalAssignee: (task: Task) => string;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: mockTasks,
  users: mockUsers,

  addTask: (task: Task) => {
    set((state) => ({
      tasks: [...state.tasks, task],
    }));
  },

  updateTask: (taskId: string, updates: Partial<Task>) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    }));
  },

  deleteTask: (taskId: string) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },

  assignTask: (taskId: string, userId: string) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, assignee: state.users.find((u) => u.id === userId)?.name || task.assignee }
          : task
      ),
    }));
  },

  detectAutomation: (task: Task) => {
    // Simple automation detection based on task properties
    const automationKeywords = ['report', 'generate', 'update', 'sync', 'backup'];
    const isRepetitive = task.tags.includes('recurring') || task.tags.includes('automated');
    const hasAutomationKeyword = automationKeywords.some(
      (keyword) =>
        task.title.toLowerCase().includes(keyword) ||
        task.description.toLowerCase().includes(keyword)
    );

    return isRepetitive || hasAutomationKeyword;
  },

  getOptimalAssignee: (task: Task) => {
    const users = get().users;
    let bestMatch = users[0];
    let bestScore = -1;

    for (const user of users) {
      let score = 0;

      // Check skill match
      const skillMatch = user.skills.some((skill) =>
        task.tags.some((tag) => tag.toLowerCase().includes(skill.toLowerCase()))
      );
      if (skillMatch) score += 3;

      // Check workload (lower is better)
      const workloadScore = (100 - user.workload) / 20; // 0-5 points
      score += workloadScore;

      // Check efficiency
      score += user.efficiency / 20; // 0-5 points

      if (score > bestScore) {
        bestScore = score;
        bestMatch = user;
      }
    }

    return bestMatch.name;
  },

  setTasks: (tasks: Task[]) => {
    set({ tasks });
  },
}));