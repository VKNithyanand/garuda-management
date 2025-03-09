import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Meeting } from '../types';
import MeetingCard from '../components/meetings/MeetingCard';
import MeetingForm from '../components/meetings/MeetingForm';
import { useMeetingStore } from '../store/meetingStore';

const Meetings = () => {
  const { meetings, addMeeting, deleteMeeting } = useMeetingStore();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'upcoming' | 'past' | 'all'>('all');

  const handleSubmit = (newMeeting: Partial<Meeting>) => {
    const meeting: Meeting = {
      ...newMeeting,
      id: Date.now().toString(),
      followUpTasks: [],
    } as Meeting;
    
    addMeeting(meeting);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    deleteMeeting(id);
  };

  const filteredMeetings = meetings.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    const now = new Date();
    
    switch (filter) {
      case 'upcoming':
        return meetingDate > now;
      case 'past':
        return meetingDate < now;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Meetings</h1>
            <p className="text-gray-600 dark:text-gray-400">Schedule and track team meetings</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Schedule Meeting
          </motion.button>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              All Meetings
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'upcoming'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'past'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Past Meetings
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="max-w-2xl w-full mx-4">
                <MeetingForm onSubmit={handleSubmit} onClose={() => setShowForm(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMeetings.map(meeting => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              onDelete={() => handleDelete(meeting.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meetings;