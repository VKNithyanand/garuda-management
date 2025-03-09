import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, FileSpreadsheet, AlertTriangle } from 'lucide-react';
import { read, utils } from 'xlsx';
import { useNotificationStore } from '../../store/notificationStore';

interface PerformanceImportProps {
  onClose: () => void;
  onImport: (data: any[]) => void;
}

const PerformanceImport: React.FC<PerformanceImportProps> = ({ onClose, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addNotification } = useNotificationStore();
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processExcelData = (data: any[]) => {
    try {
      return data.map(row => {
        if (!row['Metric'] && !row['metric']) throw new Error('Metric is required');
        if (!row['Value'] && !row['value']) throw new Error('Value is required');
        if (!row['Date'] && !row['date']) throw new Error('Date is required');

        return {
          metric: row['Metric'] || row['metric'],
          value: parseFloat(row['Value'] || row['value']),
          date: row['Date'] || row['date'],
          trend: row['Trend'] || row['trend'] || 'stable'
        };
      });
    } catch (error) {
      throw new Error(`Invalid data format: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleFile = async (file: File) => {
    try {
      setError(null);
      
      if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
        throw new Error('Please upload an Excel or CSV file');
      }

      const buffer = await file.arrayBuffer();
      const workbook = read(buffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = utils.sheet_to_json(worksheet);
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No data found in the file');
      }

      const processedData = processExcelData(data);
      onImport(processedData);
      
      addNotification({
        title: 'Data Import Successful',
        message: `Successfully imported ${processedData.length} performance records`,
        type: 'success',
        priority: 'medium'
      });

      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to import data');
      addNotification({
        title: 'Import Error',
        message: error instanceof Error ? error.message : 'Failed to import data',
        type: 'warning',
        priority: 'high'
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Import Performance Data</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Upload an Excel or CSV file containing performance data with the following columns:
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <FileSpreadsheet className="h-5 w-5 text-green-500" />
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Required Columns</h3>
            </div>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Metric (required: efficiency/engagement/quality/leadership)</li>
              <li>Value (required, number)</li>
              <li>Date (required, YYYY-MM-DD)</li>
              <li>Trend (optional: increasing/decreasing/stable)</li>
            </ul>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-md flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 mb-6 transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
            Drag and drop your file here or click to select
            <br />
            <span className="text-xs text-gray-500">(Supported formats: Excel, CSV)</span>
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Select File
          </button>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceImport;