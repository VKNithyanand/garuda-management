import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Check } from 'lucide-react';
import { Meeting } from '../../types';
import { useMeetingStore } from '../../store/meetingStore';

interface DatasetImportProps {
  onClose: () => void;
}

const DatasetImport: React.FC<DatasetImportProps> = ({ onClose }) => {
  const { setMeetings, validateDataset } = useMeetingStore();
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleImport = () => {
    try {
      const dataset = JSON.parse(jsonInput);
      
      if (!Array.isArray(dataset)) {
        throw new Error('Dataset must be an array of meetings');
      }

      const validationError = validateDataset(dataset);
      if (validationError) {
        throw new Error(validationError);
      }

      setMeetings(dataset);
      setSuccess(true);
      setError(null);
      
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format');
      setSuccess(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Import Dataset</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Paste JSON Dataset
        </label>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="w-full h-64 rounded-md border-gray-300 dark:border-gray-600 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white
                   font-mono text-sm"
          placeholder='[
  {
    "id": "1",
    "title": "Example Meeting",
    "date": "2025-03-20T10:00:00",
    "participants": ["John Doe", "Jane Smith"],
    "actionItems": ["Review project", "Set timeline"],
    "decisions": ["Approve budget", "Schedule follow-up"],
    "keyTakeaways": ["Project on track", "Team aligned"]
  }
]'
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md text-sm flex items-center gap-2">
          <Check className="h-4 w-4" />
          Dataset imported successfully!
        </div>
      )}

      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleImport}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Import Dataset
        </button>
      </div>
    </motion.div>
  );
};

export default DatasetImport;