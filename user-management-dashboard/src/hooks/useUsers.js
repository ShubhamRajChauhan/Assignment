import { useState, useEffect, useMemo } from 'react';
import { fetchUsers, addUserApi, updateUserApi, deleteUserApi } from '../services/userService';
import { useLocalStorage } from './useLocalStorage';
import { assignCyclicDepartment, splitName, generateId } from '../utils/helpers';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Persistence maps
  const [localAdded, setLocalAdded] = useLocalStorage('localAddedUsers', []);
  const [localEdited, setLocalEdited] = useLocalStorage('localEditedUsers', {});
  const [localDeleted, setLocalDeleted] = useLocalStorage('localDeletedUsers', []);

  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ firstName: '', lastName: '', email: '', department: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchUsers();
      
      // Transform API data to match our schema
      const transformedData = data.map((u, index) => {
        const { firstName, lastName } = splitName(u.name);
        return {
          id: u.id,
          firstName,
          lastName,
          email: u.email,
          department: assignCyclicDepartment(index),
        };
      });

      // Apply localStorage overrides
      let finalUsers = [...transformedData];
      
      // 1. Remove deleted
      finalUsers = finalUsers.filter(u => !localDeleted.includes(u.id));
      
      // 2. Apply edits
      finalUsers = finalUsers.map(u => localEdited[u.id] ? { ...u, ...localEdited[u.id] } : u);
      
      // 3. Add new users
      finalUsers = [...localAdded, ...finalUsers];

      setUsers(finalUsers);
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUser = async (userData) => {
    try {
      // API call (simulated)
      const res = await addUserApi(userData);
      
      // Local logic
      const newUser = { ...userData, id: generateId() };
      
      setLocalAdded(prev => [newUser, ...prev]);
      setUsers(prev => [newUser, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, message: 'Failed to add user' };
    }
  };

  const editUser = async (id, userData) => {
    try {
      // API call (simulated)
      await updateUserApi(id, userData);
      
      setLocalEdited(prev => ({ ...prev, [id]: userData }));
      setUsers(prev => prev.map(u => u.id === id ? { ...u, ...userData } : u));
      return { success: true };
    } catch (err) {
      return { success: false, message: 'Failed to update user' };
    }
  };

  const deleteUser = async (id) => {
    try {
      // API call (simulated)
      await deleteUserApi(id);
      
      setLocalDeleted(prev => [...prev, id]);
      setUsers(prev => prev.filter(u => u.id !== id));
      
      // Check if we need to adjust page when a user is deleted
      return { success: true };
    } catch (err) {
      return { success: false, message: 'Failed to delete user' };
    }
  };

  // Memoized filtered and sorted results
  const processedUsers = useMemo(() => {
    let result = [...users];

    // Global Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q)
      );
    }

    // Filters
    if (filters.firstName) {
      result = result.filter(u => u.firstName.toLowerCase().includes(filters.firstName.toLowerCase()));
    }
    if (filters.lastName) {
      result = result.filter(u => u.lastName.toLowerCase().includes(filters.lastName.toLowerCase()));
    }
    if (filters.email) {
      result = result.filter(u => u.email.toLowerCase().includes(filters.email.toLowerCase()));
    }
    if (filters.department) {
      result = result.filter(u => u.department === filters.department);
    }

    // Sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [users, searchQuery, filters, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(processedUsers.length / pageSize);
  
  // Calculate safe page synchronously to prevent effect double-renders
  const safePage = totalPages > 0 ? Math.min(page, totalPages) : 1;
  const paginatedUsers = processedUsers.slice((safePage - 1) * pageSize, safePage * pageSize);

  return {
    users: paginatedUsers,
    processedUsers, // Exposed for Infinite Scroll
    totalUsers: processedUsers.length,
    loading,
    error,
    
    // CRUD
    addUser,
    editUser,
    deleteUser,
    
    // Search & Filters
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    
    // Sorting
    sortConfig,
    setSortConfig,
    
    // Pagination
    page: safePage,
    setPage,
    pageSize,
    setPageSize,
    totalPages
  };
};
