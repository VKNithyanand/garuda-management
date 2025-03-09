import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Meeting, Task } from '../../types';
import { Plus, X, Users, Calendar, Brain, CheckCircle, ClipboardList } from 'lucide-react';

interface MeetingFormProps {
  onSubmit: (meeting: Partial<Meeting>) => void;
  onClose: () => void;
}

const MeetingForm: React.FC<MeetingFormProps> = ({ onSubmit, onClose }) => {
  const [meeting, setMeeting] = useState<Partial<Meeting>>({
    title: '',
    date: new Date().toISOString().slice(0, 16),
    participants: [],
    actionItems: [],
    decisions: [],
    keyTakeaways: [],
    followUpTasks: []
  });

  const [participant, setParticipant] = useState('');
  const [actionItem, setActionItem] = useState('');
  const [decision, setDecision] = useState('');
  const [takeaway, setTakeaway] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(meeting);
  };

  const addParticipant = () => {
    if (participant.trim()) {
      setMeeting(prev => ({
        ...prev,
        participants: [...(prev.participants || []), participant.trim()]
      }));
      setParticipant('');
    }
  };

  const addActionItem = () => {
    if (actionItem.trim()) {
      setMeeting(prev => ({
        ...prev,
        actionItems: [...(prev.actionItems || []), actionItem.trim()]
      }));
      setActionItem('');
    }
  };

  const addDecision = () => {
    if (decision.trim()) {
      setMeeting(prev => ({
        ...prev,
        decisions: [...(prev.decisions || []), decision.trim()]
      }));
      setDecision('');
    }
  };

  const addTakeaway = () => {
    if (takeaway.trim()) {
      setMeeting(prev => ({
        ...prev,
        keyTakeaways: [...(prev.keyTakeaways || []), takeaway.trim()]
      }));
      setTakeaway('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Schedule Meeting</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Meeting Title
          </label>
          <input
            type="text"
            value={meeting.title}
            onChange={(e) => setMeeting({ ...meeting, title: e.target.value })}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date & Time
          </label>
          <input
            type="datetime-local"
            value={meeting.date}
            onChange={(e) => setMeeting({ ...meeting, date: e.target.value })}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Participants
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={participant}
              onChange={(e) => setParticipant(e.target.value)}
              className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Add participant"
            />
            <button
              type="button"
              onClick={addParticipant}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {meeting.participants?.map((p, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-md text-sm"
              >
                <span>{p}</span>
                <button
                  type="button"
                  onClick={() => setMeeting({
                    ...meeting,
                    participants: meeting.participants?.filter((_, i) => i !== index)
                  })}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Action Items
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={actionItem}
              onChange={(e) => setActionItem(e.target.value)}
              className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Add action item"
            />
            <button
              type="button"
              onClick={addActionItem}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <ul className="mt-2 space-y-1">
            {meeting.actionItems?.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => setMeeting({
                    ...meeting,
                    actionItems: meeting.actionItems?.filter((_, i) => i !== index)
                  })}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Key Decisions
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Add decision"
            />
            <button
              type="button"
              onClick={addDecision}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <ul className="mt-2 space-y-1">
            {meeting.decisions?.map((d, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400"
              >
                <span>{d}</span>
                <button
                  type="button"
                  onClick={() => setMeeting({
                    ...meeting,
                    decisions: meeting.decisions?.filter((_, i) => i !== index)
                  })}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Key Takeaways
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={takeaway}
              onChange={(e) => setTakeaway(e.target.value)}
              className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Add takeaway"
            />
            <button
              type="button"
              onClick={addTakeaway}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <ul className="mt-2 space-y-1">
            {meeting.keyTakeaways?.map((t, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400"
              >
                <span>{t}</span>
                <button
                  type="button"
                  onClick={() => setMeeting({
                    ...meeting,
                    keyTakeaways: meeting.keyTakeaways?.filter((_, i) => i !== index)
                  })}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Schedule Meeting
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default MeetingForm;