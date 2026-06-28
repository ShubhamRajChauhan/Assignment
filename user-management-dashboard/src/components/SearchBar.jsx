import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Sync with external state if it gets cleared externally
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Debounce the update to the parent component
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== searchQuery) {
        setSearchQuery(localQuery);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [localQuery, setSearchQuery, searchQuery]);

  return (
    <div className="relative flex-1 max-w-md w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>
      <input
        type="text"
        className="block w-full p-2.5 pl-10 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors shadow-sm"
        placeholder="Search users..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      {localQuery && (
        <button
          type="button"
          onClick={() => {
            setLocalQuery('');
            setSearchQuery('');
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
