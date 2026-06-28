import React from 'react';
import { ArrowDown, ArrowUp, Edit, Trash2 } from 'lucide-react';

const UserTable = React.memo(({ users, onEdit, onDelete, sortConfig, setSortConfig }) => {
  
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowDown className="w-3 h-3 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="w-3 h-3 text-blue-600 dark:text-blue-400" />
      : <ArrowDown className="w-3 h-3 text-blue-600 dark:text-blue-400" />;
  };

  const headers = [
    { key: 'id', label: 'ID' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
          <tr>
            {headers.map(header => (
              <th 
                key={header.key} 
                scope="col" 
                className="px-6 py-4 cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => handleSort(header.key)}
              >
                <div className="flex items-center gap-1">
                  {header.label}
                  <SortIcon columnKey={header.key} />
                </div>
              </th>
            ))}
            <th scope="col" className="px-6 py-4 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr 
              key={user.id} 
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.id}
              </td>
              <td className="px-6 py-4">
                {user.firstName}
              </td>
              <td className="px-6 py-4">
                {user.lastName}
              </td>
              <td className="px-6 py-4">
                {user.email}
              </td>
              <td className="px-6 py-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {user.department}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit User"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="p-1.5 text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Delete User"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default UserTable;
