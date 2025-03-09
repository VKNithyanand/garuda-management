import { create } from 'zustand';
import { PerformanceData, LeadershipMetric, PerformanceInsight } from '../types';

interface PerformanceStore {
  performanceData: PerformanceData[];
  leadershipMetrics: LeadershipMetric[];
  performanceInsights: PerformanceInsight[];
  setPerformanceData: (data: PerformanceData[]) => void;
  addPerformanceData: (data: PerformanceData[]) => void;
  updateLeadershipMetrics: (data: PerformanceData[]) => void;
  generatePerformanceInsights: () => void;
  getLatestMetrics: () => {
    productivity: { value: number; change: number };
    growth: { value: number; change: number };
    capacity: { value: number; change: number };
    response: { value: number; change: number };
  };
}

export const usePerformanceStore = create<PerformanceStore>((set, get) => ({
  performanceData: [],
  leadershipMetrics: [],
  performanceInsights: [],

  setPerformanceData: (data) => {
    const processedData = data.map(item => ({
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: item.timestamp || new Date().toISOString(),
      trend: item.trend || 'stable'
    }));
    set({ performanceData: processedData });
    get().updateLeadershipMetrics(processedData);
    get().generatePerformanceInsights();
  },

  addPerformanceData: (newData) => {
    const processedData = newData.map(data => ({
      ...data, // Fixed: Changed 'item' to 'data'
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: data.timestamp || new Date().toISOString(),
      trend: data.trend || 'stable'
    }));

    set((state) => {
      const dataMap = new Map();
      [...state.performanceData, ...processedData].forEach(item => {
        const key = `${item.timestamp}-${item.metric}`;
        if (!dataMap.has(key) || new Date(item.timestamp) > new Date(dataMap.get(key).timestamp)) {
          dataMap.set(key, item);
        }
      });
      
      const updatedData = Array.from(dataMap.values()).sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      get().updateLeadershipMetrics(updatedData);
      get().generatePerformanceInsights();
      
      return { performanceData: updatedData };
    });
  },

  updateLeadershipMetrics: (data) => {
    const calculateMetricScore = (metric: string) => {
      const metricData = data.filter(d => d.metric === metric);
      if (metricData.length === 0) return 0;
      
      const average = metricData.reduce((sum, item) => sum + item.value, 0) / metricData.length;
      return Math.min(10, Math.round((average / 100) * 10));
    };

    const generateEvidence = (category: string) => {
      const evidenceMap = {
        communication: [
          'Effectively leads team meetings',
          'Clear and concise documentation',
          'Positive feedback from team members',
          'Strong presentation skills',
          'Regular status updates'
        ],
        initiative: [
          'Proactively identifies process improvements',
          'Takes ownership of critical projects',
          'Mentors junior team members',
          'Drives innovation',
          'Leads by example'
        ],
        mentorship: [
          'Regular 1:1 sessions with team members',
          'Positive mentee feedback',
          'Knowledge sharing sessions',
          'Career development guidance',
          'Technical mentoring'
        ]
      };

      const categoryEvidence = evidenceMap[category as keyof typeof evidenceMap] || [];
      const count = Math.floor(Math.random() * 2) + 3; // Random 3-4 items
      return categoryEvidence.sort(() => Math.random() - 0.5).slice(0, count);
    };

    const newMetrics: LeadershipMetric[] = [
      {
        id: '1',
        userId: '1',
        category: 'communication',
        score: calculateMetricScore('leadership'),
        evidence: generateEvidence('communication'),
        recommendations: [
          'Lead more cross-team meetings',
          'Create communication guidelines',
          'Share best practices'
        ]
      },
      {
        id: '2',
        userId: '1',
        category: 'initiative',
        score: calculateMetricScore('efficiency'),
        evidence: generateEvidence('initiative'),
        recommendations: [
          'Lead strategic projects',
          'Create innovation programs',
          'Mentor new leaders'
        ]
      },
      {
        id: '3',
        userId: '1',
        category: 'mentorship',
        score: calculateMetricScore('engagement'),
        evidence: generateEvidence('mentorship'),
        recommendations: [
          'Develop mentorship program',
          'Create learning paths',
          'Share success stories'
        ]
      }
    ];

    set({ leadershipMetrics: newMetrics });
  },

  generatePerformanceInsights: () => {
    const data = get().performanceData;
    if (data.length === 0) return;

    const getRecentMetricValue = (metric: string) => {
      const metricData = data.filter(d => d.metric === metric)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      return metricData[0]?.value || 0;
    };

    const insights: PerformanceInsight[] = [
      {
        id: '1',
        userId: '1',
        type: 'strength',
        title: 'Technical Leadership Excellence',
        description: 'Demonstrates exceptional ability in technical leadership and mentoring',
        metrics: ['efficiency', 'leadership'],
        recommendations: [
          'Lead architecture review sessions',
          'Create technical documentation guidelines',
          'Mentor junior developers'
        ],
        priority: getRecentMetricValue('leadership') > 80 ? 'high' : 'medium'
      },
      {
        id: '2',
        userId: '1',
        type: 'improvement',
        title: 'Work-Life Balance',
        description: 'Current workload patterns suggest potential sustainability concerns',
        metrics: ['engagement', 'efficiency'],
        recommendations: [
          'Delegate non-critical tasks',
          'Schedule regular breaks',
          'Review project timelines'
        ],
        priority: getRecentMetricValue('engagement') < 70 ? 'high' : 'medium'
      },
      {
        id: '3',
        userId: '1',
        type: 'opportunity',
        title: 'Cross-team Collaboration',
        description: 'Potential to expand influence across different teams',
        metrics: ['leadership', 'engagement'],
        recommendations: [
          'Join cross-functional projects',
          'Share knowledge in company-wide forums',
          'Build relationships with other team leads'
        ],
        priority: 'medium'
      }
    ];

    set({ performanceInsights: insights });
  },

  getLatestMetrics: () => {
    const data = get().performanceData;
    const currentDate = new Date();
    const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

    const calculateMetric = (metric: string) => {
      const sortedData = data
        .filter(d => d.metric === metric)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      const currentMonthData = sortedData.filter(d => new Date(d.timestamp) > lastMonthDate);
      const previousMonthData = sortedData.filter(d => 
        new Date(d.timestamp) <= lastMonthDate && 
        new Date(d.timestamp) > new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth() - 1, lastMonthDate.getDate())
      );

      const currentValue = currentMonthData.length > 0
        ? currentMonthData.reduce((sum, item) => sum + item.value, 0) / currentMonthData.length
        : 0;

      const previousValue = previousMonthData.length > 0
        ? previousMonthData.reduce((sum, item) => sum + item.value, 0) / previousMonthData.length
        : currentValue;

      const change = previousValue === 0 ? 0 : ((currentValue - previousValue) / previousValue) * 100;

      return {
        value: Math.round(currentValue),
        change: Math.round(change)
      };
    };

    // Calculate team capacity based on engagement and efficiency
    const engagement = calculateMetric('engagement');
    const efficiency = calculateMetric('efficiency');
    const capacity = {
      value: Math.round((engagement.value + efficiency.value) / 2),
      change: Math.round((engagement.change + efficiency.change) / 2)
    };

    // Calculate response time based on leadership and quality metrics
    const leadership = calculateMetric('leadership');
    const quality = calculateMetric('quality');
    const response = {
      value: Math.round((leadership.value + quality.value) / 2),
      change: Math.round((leadership.change + quality.change) / 2)
    };

    return {
      productivity: calculateMetric('efficiency'),
      growth: calculateMetric('quality'),
      capacity,
      response
    };
  }
}));