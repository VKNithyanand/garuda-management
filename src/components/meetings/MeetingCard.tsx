import React from 'react';
import { motion } from 'framer-motion';
import { Meeting } from '../../types';
import { Calendar, Users, CheckCircle, ClipboardList, Brain, Trash2 } from 'lucide-react';
import { useMeetingStore } from '../../store/meetingStore';

interface MeetingCardProps {
  meeting: Meeting;
  onDelete: () => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onDelete }) => {
  const { addActionItem, addDecision, addKeyTakeaway, generateMeetingSummary } = useMeetingStore();

  const handleAddActionItem = (item: string) => {
    addActionItem(meeting.id, item);
    generateMeetingSummary(meeting.id);
  };

  const handleAddDecision = (decision: string) => {
    addDecision(meeting.id, decision);
    generateMeetingSummary(meeting.id);
  };

  const handleAddTakeaway = (takeaway: string) => {
    addKeyTakeaway(meeting.id, takeaway);
    generateMeetingSummary(meeting.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{meeting.title}</h3>
          <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {new Date(meeting.date).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {meeting.participants.length} participants
            </span>
          </div>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {meeting.summary && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4 text-purple-500" />
            <h4 className="font-medium text-gray-700 dark:text-gray-300">Summary</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{meeting.summary}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <h4 className="font-medium text-gray-700 dark:text-gray-300">Key Decisions</h4>
          </div>
          <ul className="space-y-1">
            {meeting.decisions.map((decision, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                <span className="text-blue-500">•</span>
                {decision}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList className="h-4 w-4 text-yellow-500" />
            <h4 className="font-medium text-gray-700 dark:text-gray-300">Action Items</h4>
          </div>
          <ul className="space-y-1">
            {meeting.actionItems.map((item, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                <span className="text-blue-500">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {meeting.keyTakeaways && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-indigo-500" />
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Key Takeaways</h4>
            </div>
            <ul className="space-y-1">
              {meeting.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {meeting.followUpTasks && meeting.followUpTasks.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <ClipboardList className="h-4 w-4 text-blue-500" />
            <h4 className="font-medium text-gray-700 dark:text-gray-300">Follow-up Tasks</h4>
          </div>
          <div className="space-y-2">
            {meeting.followUpTasks.map((task) => (
              <div
                key={task.id}
                className="text-sm bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
              >
                <div className="font-medium text-gray-700 dark:text-gray-300">{task.title}</div>
                <div className="text-gray-600 dark:text-gray-400 mt-1">{task.description}</div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-gray-500">Assignee: {task.assignee}</span>
                  <span className="text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MeetingCard;