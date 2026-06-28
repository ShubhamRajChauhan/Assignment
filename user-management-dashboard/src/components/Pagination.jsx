import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PAGE_SIZE_OPTIONS } from '../utils/constants';

const Pagination = ({ 
  page, 
  setPage, 
  pageSize, 
  setPageSize, 
  totalUsers, 
  totalPages 
}) => {
  const startUser = (page - 1) * pageSize + 1;
  const endUser = Math.min(page * pageSize, totalUsers);

  if (totalUsers === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
        <span>Showing <span className="font-medium text-gray-900 dark:text-white">{startUser}</span> to <span className="font-medium text-gray-900 dark:text-white">{endUser}</span> of <span className="font-medium text-gray-900 dark:text-white">{totalUsers}</span> results</span>
        
        <div className="ml-4 flex items-center">
          <label htmlFor="pageSize" className="mr-2">Rows per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1); // Reset to first page when size changes
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            {PAGE_SIZE_OPTIONS.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="p-2 text-gray-500 hover:text-gray-700 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-1">
          {/* Simple pagination numbers - could be enhanced for many pages */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            // Show only limited pages around current page
            if (
              p === 1 || 
              p === totalPages || 
              (p >= page - 1 && p <= page + 1)
            ) {
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    page === p 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'text-gray-500 border border-transparent hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  {p}
                </button>
              );
            }
            // Show ellipsis
            if (p === page - 2 || p === page + 2) {
              return <span key={p} className="text-gray-400 dark:text-gray-500 px-1">...</span>;
            }
            return null;
          })}
        </div>

        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || totalPages === 0}
          className="p-2 text-gray-500 hover:text-gray-700 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
