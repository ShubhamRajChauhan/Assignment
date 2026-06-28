import { AlertCircle } from 'lucide-react';

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
        <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Something went wrong</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
