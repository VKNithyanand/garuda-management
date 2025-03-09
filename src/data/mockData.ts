import { User, Task, Meeting, PerformanceMetric, WorkloadAnalysis, AIRecommendation, EmployeeWorkload, PerformanceData, LeadershipMetric, PerformanceInsight } from '../types';

// Generate performance data for the last 12 months
const generatePerformanceData = () => {
  const metrics = ['efficiency', 'engagement', 'quality', 'leadership'];
  const data: PerformanceData[] = [];
  const now = new Date();
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    metrics.forEach((metric, index) => {
      // Generate realistic looking data with some variance
      const baseValue = 75 + Math.random() * 20;
      const trend = Math.random() > 0.5 ? 'increasing' : 'decreasing';
      
      data.push({
        id: `${i}-${metric}`,
        userId: '1',
        metric: metric as any,
        value: Math.round(baseValue),
        timestamp: date.toISOString().split('T')[0],
        trend
      });
    });
  }
  
  return data;
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    workload: 85,
    efficiency: 92,
    engagementScore: 88,
    workHours: 45,
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    tasks: ['1', '4', '7']
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    workload: 65,
    efficiency: 85,
    engagementScore: 90,
    workHours: 42,
    skills: ['Product Strategy', 'Agile', 'User Research'],
    tasks: ['2', '5']
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    workload: 45,
    efficiency: 95,
    engagementScore: 92,
    workHours: 38,
    skills: ['UI Design', 'User Research', 'Prototyping'],
    tasks: ['3', '6']
  }
];

export const mockEmployeeWorkloads: EmployeeWorkload[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    workload: 85,
    tasks: 8,
    status: {
      status: 'Overloaded',
      color: 'border-red-500',
      recommendation: 'Immediate workload reduction needed'
    },
    trend: 'increasing',
    recommendations: [
      'Redistribute 2 tasks to Michael Chen',
      'Postpone non-critical deadlines',
      'Schedule a break after current sprint'
    ]
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    workload: 65,
    tasks: 5,
    status: {
      status: 'Balanced',
      color: 'border-green-500',
      recommendation: 'Maintain current workload'
    },
    trend: 'stable',
    recommendations: [
      'Can take on 1-2 additional tasks',
      'Consider cross-team collaboration'
    ]
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    workload: 45,
    tasks: 3,
    status: {
      status: 'Underutilized',
      color: 'border-yellow-500',
      recommendation: 'Can take on more tasks'
    },
    trend: 'decreasing',
    recommendations: [
      'Assign 2-3 new tasks from backlog',
      'Involve in upcoming project planning'
    ]
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Update User Authentication',
    description: 'Implement new security features for user authentication system',
    priority: 'high',
    assignee: 'Sarah Johnson',
    status: 'in-progress',
    dueDate: '2025-03-20',
    estimatedHours: 16,
    complexity: 8,
    tags: ['security', 'backend']
  },
  {
    id: '2',
    title: 'Design System Review',
    description: 'Review and update component library documentation',
    priority: 'medium',
    assignee: 'Emily Rodriguez',
    status: 'todo',
    dueDate: '2025-03-25',
    estimatedHours: 8,
    complexity: 5,
    tags: ['design', 'documentation']
  },
  {
    id: '3',
    title: 'Sprint Planning',
    description: 'Prepare and conduct Q2 sprint planning session',
    priority: 'high',
    assignee: 'Michael Chen',
    status: 'completed',
    dueDate: '2025-03-15',
    estimatedHours: 4,
    actualHours: 3.5,
    complexity: 4,
    tags: ['planning', 'management']
  }
];

export const mockPerformanceMetrics: PerformanceMetric[] = [
  {
    userId: '1',
    metric: 'efficiency',
    value: 92,
    timestamp: new Date().toISOString(),
    trend: 'increasing'
  },
  {
    userId: '1',
    metric: 'workload',
    value: 85,
    timestamp: new Date().toISOString(),
    trend: 'increasing'
  },
  {
    userId: '2',
    metric: 'engagement',
    value: 90,
    timestamp: new Date().toISOString(),
    trend: 'stable'
  }
];

export const mockWorkloadAnalysis: WorkloadAnalysis[] = [
  {
    userId: '1',
    currentWorkload: 85,
    burnoutRisk: 'high',
    recommendations: [
      'Consider redistributing upcoming tasks',
      'Schedule a break after current sprint',
      'Review project deadlines'
    ],
    taskDistribution: [
      { category: 'Development', hours: 30 },
      { category: 'Meetings', hours: 8 },
      { category: 'Code Review', hours: 7 }
    ]
  },
  {
    userId: '2',
    currentWorkload: 65,
    burnoutRisk: 'low',
    recommendations: [
      'Available for additional tasks',
      'Consider mentoring opportunities'
    ],
    taskDistribution: [
      { category: 'Project Management', hours: 20 },
      { category: 'Meetings', hours: 15 },
      { category: 'Documentation', hours: 7 }
    ]
  }
];

export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: 'workload_balance',
    description: 'High burnout risk detected for Sarah Johnson',
    priority: 'high',
    impact: 'Potential project delays and quality issues',
    suggestedActions: [
      'Redistribute 2 upcoming tasks to Michael Chen',
      'Schedule a team capacity review meeting',
      'Adjust sprint commitments'
    ],
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    type: 'skill_development',
    description: 'Learning opportunity identified for Emily Rodriguez',
    priority: 'medium',
    impact: 'Enhanced team capabilities in UI automation',
    suggestedActions: [
      'Enroll in Advanced UI Animation course',
      'Pair with Sarah on upcoming frontend tasks',
      'Schedule knowledge sharing session'
    ],
    timestamp: new Date().toISOString()
  }
];

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Sprint Planning',
    date: '2025-03-20T10:00:00',
    participants: ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez'],
    actionItems: ['Review backlog', 'Set sprint goals', 'Assign tasks'],
    decisions: ['Prioritize user authentication', 'Postpone API updates'],
    keyTakeaways: [
      'Focus on security features',
      'Need to reduce technical debt',
      'Team capacity is at 85%'
    ],
    followUpTasks: []
  },
  {
    id: '2',
    title: 'Design Review',
    date: '2025-03-21T14:00:00',
    participants: ['Emily Rodriguez', 'Sarah Johnson'],
    actionItems: ['Update style guide', 'Create component library'],
    decisions: ['Adopt new color scheme', 'Implement design system'],
    keyTakeaways: [
      'New design system will improve consistency',
      'Need to document component usage',
      'Plan for accessibility improvements'
    ],
    followUpTasks: []
  }
];

export const mockPerformanceData: PerformanceData[] = generatePerformanceData();

export const mockLeadershipMetrics: LeadershipMetric[] = [
  {
    id: '1',
    userId: '1',
    category: 'communication',
    score: 9,
    evidence: [
      'Effectively leads team meetings',
      'Clear and concise documentation',
      'Positive feedback from team members'
    ],
    recommendations: [
      'Consider leading more cross-team initiatives',
      'Share communication best practices'
    ]
  },
  {
    id: '2',
    userId: '1',
    category: 'initiative',
    score: 8,
    evidence: [
      'Proactively identifies process improvements',
      'Takes ownership of critical projects',
      'Mentors junior team members'
    ],
    recommendations: [
      'Lead a strategic project',
      'Create a mentorship program'
    ]
  },
  {
    id: '3',
    userId: '1',
    category: 'mentorship',
    score: 9,
    evidence: [
      'Regular 1:1 sessions with team members',
      'Positive mentee feedback',
      'Knowledge sharing sessions'
    ],
    recommendations: [
      'Develop structured mentorship program',
      'Document mentorship best practices'
    ]
  }
];

export const mockPerformanceInsights: PerformanceInsight[] = [
  {
    id: '1',
    userId: '1',
    type: 'strength',
    title: 'Exceptional Technical Leadership',
    description: 'Demonstrates strong ability to guide technical decisions and mentor team members',
    metrics: ['efficiency', 'leadership'],
    recommendations: [
      'Lead architecture review sessions',
      'Create technical documentation guidelines',
      'Mentor more junior developers'
    ],
    priority: 'high'
  },
  {
    id: '2',
    userId: '1',
    type: 'improvement',
    title: 'Work-Life Balance',
    description: 'High workload may impact long-term sustainability',
    metrics: ['workload', 'engagement'],
    recommendations: [
      'Delegate non-critical tasks',
      'Schedule regular breaks',
      'Review project timelines'
    ],
    priority: 'medium'
  },
  {
    id: '3',
    userId: '1',
    type: 'opportunity',
    title: 'Cross-team Collaboration',
    description: 'Potential to expand influence across different teams',
    metrics: ['leadership', 'communication'],
    recommendations: [
      'Join cross-functional projects',
      'Share knowledge in company-wide forums',
      'Build relationships with other team leads'
    ],
    priority: 'medium'
  }
];