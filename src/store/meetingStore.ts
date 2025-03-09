import { create } from 'zustand';
import { Meeting, Task } from '../types';
import { mockMeetings } from '../data/mockData';

interface MeetingStore {
  meetings: Meeting[];
  setMeetings: (meetings: Meeting[]) => void;
  addMeeting: (meeting: Meeting) => void;
  updateMeeting: (id: string, meeting: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  addFollowUpTask: (meetingId: string, task: Task) => void;
  updateFollowUpTask: (meetingId: string, taskId: string, task: Partial<Task>) => void;
  addDecision: (meetingId: string, decision: string) => void;
  addActionItem: (meetingId: string, actionItem: string) => void;
  addKeyTakeaway: (meetingId: string, takeaway: string) => void;
  generateMeetingSummary: (meetingId: string) => void;
  validateDataset: (dataset: any[]) => string | null;
}

export const useMeetingStore = create<MeetingStore>((set, get) => ({
  meetings: mockMeetings,

  setMeetings: (meetings) => set({ meetings }),

  addMeeting: (meeting) => {
    set((state) => ({
      meetings: [...state.meetings, meeting],
    }));
  },

  updateMeeting: (id, updatedMeeting) => {
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === id ? { ...meeting, ...updatedMeeting } : meeting
      ),
    }));
  },

  deleteMeeting: (id) => {
    set((state) => ({
      meetings: state.meetings.filter((meeting) => meeting.id !== id),
    }));
  },

  addFollowUpTask: (meetingId, task) => {
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === meetingId
          ? {
              ...meeting,
              followUpTasks: [...(meeting.followUpTasks || []), task],
            }
          : meeting
      ),
    }));
  },

  updateFollowUpTask: (meetingId, taskId, updatedTask) => {
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === meetingId
          ? {
              ...meeting,
              followUpTasks: meeting.followUpTasks?.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
              ),
            }
          : meeting
      ),
    }));
  },

  addDecision: (meetingId, decision) => {
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === meetingId
          ? {
              ...meeting,
              decisions: [...meeting.decisions, decision],
            }
          : meeting
      ),
    }));
  },

  addActionItem: (meetingId, actionItem) => {
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === meetingId
          ? {
              ...meeting,
              actionItems: [...meeting.actionItems, actionItem],
            }
          : meeting
      ),
    }));
  },

  addKeyTakeaway: (meetingId, takeaway) => {
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === meetingId
          ? {
              ...meeting,
              keyTakeaways: [...(meeting.keyTakeaways || []), takeaway],
            }
          : meeting
      ),
    }));
  },

  generateMeetingSummary: (meetingId) => {
    const meeting = get().meetings.find((m) => m.id === meetingId);
    if (!meeting) return;

    const summary = `Meeting focused on ${meeting.decisions.length} key decisions, 
      with ${meeting.actionItems.length} action items identified. 
      ${meeting.keyTakeaways?.length || 0} key takeaways were recorded.`;

    set((state) => ({
      meetings: state.meetings.map((m) =>
        m.id === meetingId ? { ...m, summary } : m
      ),
    }));
  },

  validateDataset: (dataset: any[]): string | null => {
    const requiredFields = ['id', 'title', 'date', 'participants', 'actionItems', 'decisions'];
    
    for (const meeting of dataset) {
      // Check required fields
      for (const field of requiredFields) {
        if (!(field in meeting)) {
          return `Missing required field: ${field}`;
        }
      }

      // Validate data types
      if (typeof meeting.id !== 'string') return 'Meeting ID must be a string';
      if (typeof meeting.title !== 'string') return 'Meeting title must be a string';
      if (isNaN(Date.parse(meeting.date))) return 'Invalid date format';
      if (!Array.isArray(meeting.participants)) return 'Participants must be an array';
      if (!Array.isArray(meeting.actionItems)) return 'Action items must be an array';
      if (!Array.isArray(meeting.decisions)) return 'Decisions must be an array';

      // Validate arrays contain strings
      if (meeting.participants.some(p => typeof p !== 'string')) {
        return 'Participants must be strings';
      }
      if (meeting.actionItems.some(a => typeof a !== 'string')) {
        return 'Action items must be strings';
      }
      if (meeting.decisions.some(d => typeof d !== 'string')) {
        return 'Decisions must be strings';
      }
    }

    return null;
  },
}));