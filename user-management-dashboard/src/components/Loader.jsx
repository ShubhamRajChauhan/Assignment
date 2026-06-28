import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-400" />
      <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium">Loading users...</p>
    </div>
  );
};

export default Loader;
