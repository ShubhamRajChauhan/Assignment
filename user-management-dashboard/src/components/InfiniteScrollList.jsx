import React, { useState, useEffect, useRef } from 'react';
import UserTable from './UserTable';
import { Loader2 } from 'lucide-react';

const InfiniteScrollList = ({ processedUsers, onEdit, onDelete, sortConfig, setSortConfig }) => {
  const [itemsToShow, setItemsToShow] = useState(20);
  const loaderRef = useRef(null);

  // Reset items to show when data length drops (e.g. searching/filtering)
  useEffect(() => {
    setItemsToShow(20);
  }, [processedUsers.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && itemsToShow < processedUsers.length) {
          // Load 15 more items when reaching the bottom
          setItemsToShow((prev) => Math.min(prev + 15, processedUsers.length));
        }
      },
      {
        root: null,
        rootMargin: '100px', // Trigger slightly before hitting the exact bottom
        threshold: 0.1,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [itemsToShow, processedUsers.length]);

  const displayedUsers = processedUsers.slice(0, itemsToShow);

  return (
    <div className="flex flex-col">
      <UserTable 
        users={displayedUsers} 
        onEdit={onEdit} 
        onDelete={onDelete} 
        sortConfig={sortConfig} 
        setSortConfig={setSortConfig} 
      />
      
      {itemsToShow < processedUsers.length && (
        <div ref={loaderRef} className="py-6 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}
      
      {itemsToShow >= processedUsers.length && processedUsers.length > 0 && (
        <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
          End of list
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollList;
