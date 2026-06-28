import { Users } from 'lucide-react';

const EmptyState = ({ message = "No users found matching your criteria." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
        <Users className="h-10 w-10 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Results</h3>
      <p className="text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
};

export default EmptyState;
