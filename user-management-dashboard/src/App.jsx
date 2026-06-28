import { useState, useCallback } from 'react';
import { UserPlus, Filter as FilterIcon, Layers, List } from 'lucide-react';
import { useUsers } from './hooks/useUsers';

// Components
import UserTable from './components/UserTable';
import InfiniteScrollList from './components/InfiniteScrollList';
import UserFormModal from './components/UserFormModal';
import FilterModal from './components/FilterModal';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import Loader from './components/Loader';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import Toast from './components/Toast';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const {
    users, // paginated
    processedUsers, // raw sorted/filtered list
    totalUsers,
    loading,
    error,
    addUser,
    editUser,
    deleteUser,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortConfig,
    setSortConfig,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages
  } = useUsers();

  // App Features State
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // Current user being acted upon
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
  }, []);

  const handleAddClick = useCallback(() => {
    setUserToEdit(null);
    setIsFormOpen(true);
  }, []);

  const handleEditClick = useCallback((user) => {
    setUserToEdit(user);
    setIsFormOpen(true);
  }, []);

  const handleDeleteClick = useCallback((user) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  }, []);

  const handleFormSubmit = useCallback(async (formData, id) => {
    let result;
    if (id) {
      result = await editUser(id, formData);
      if (result.success) showToast('User updated successfully');
      else showToast(result.message, 'error');
    } else {
      result = await addUser(formData);
      if (result.success) showToast('User added successfully');
      else showToast(result.message, 'error');
    }
  }, [addUser, editUser, showToast]);

  const handleConfirmDelete = useCallback(async () => {
    if (userToDelete) {
      const result = await deleteUser(userToDelete.id);
      if (result.success) showToast('User deleted successfully');
      else showToast(result.message, 'error');
    }
    setIsDeleteOpen(false);
    setUserToDelete(null);
  }, [deleteUser, userToDelete, showToast]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">User Manager</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsInfiniteScroll(!isInfiniteScroll)}
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700"
              title={isInfiniteScroll ? 'Switch to Pagination' : 'Switch to Infinite Scroll'}
            >
              {isInfiniteScroll ? <List className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
              <span>{isInfiniteScroll ? 'Infinite Scroll' : 'Pagination'}</span>
            </button>
            <ThemeToggle />
            <button
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Add User</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto justify-center shadow-sm"
          >
            <FilterIcon className="w-4 h-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 ml-1">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Data Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorState message={error} onRetry={() => window.location.reload()} />
          ) : processedUsers.length === 0 ? (
            <EmptyState />
          ) : isInfiniteScroll ? (
            <InfiniteScrollList
              processedUsers={processedUsers}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              sortConfig={sortConfig}
              setSortConfig={setSortConfig}
            />
          ) : (
            <>
              <UserTable 
                users={users} 
                onEdit={handleEditClick} 
                onDelete={handleDeleteClick}
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
              />
              <Pagination 
                page={page} 
                setPage={setPage} 
                pageSize={pageSize} 
                setPageSize={setPageSize} 
                totalUsers={totalUsers} 
                totalPages={totalPages} 
              />
            </>
          )}
        </div>

      </main>

      {/* Modals & Toasts */}
      <UserFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleFormSubmit}
        userToEdit={userToEdit}
      />
      
      <FilterModal 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        setPage={setPage}
      />
      
      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        userName={userToDelete ? `${userToDelete.firstName} ${userToDelete.lastName}` : ''}
      />

      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ ...toast, show: false })} 
        />
      )}
    </div>
  );
}

export default App;
