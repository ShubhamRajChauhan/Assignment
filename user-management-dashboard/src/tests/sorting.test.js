import { describe, it, expect } from 'vitest';

describe('Sorting Logic', () => {
  const users = [
    { id: 1, firstName: 'Charlie', department: 'Engineering' },
    { id: 2, firstName: 'Alice', department: 'HR' },
    { id: 3, firstName: 'Bob', department: 'Finance' },
  ];

  const sortUsers = (data, sortConfig) => {
    let result = [...data];
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
  };

  it('should sort strings in ascending order', () => {
    const result = sortUsers(users, { key: 'firstName', direction: 'asc' });
    expect(result[0].firstName).toBe('Alice');
    expect(result[1].firstName).toBe('Bob');
    expect(result[2].firstName).toBe('Charlie');
  });

  it('should sort strings in descending order', () => {
    const result = sortUsers(users, { key: 'firstName', direction: 'desc' });
    expect(result[0].firstName).toBe('Charlie');
    expect(result[1].firstName).toBe('Bob');
    expect(result[2].firstName).toBe('Alice');
  });

  it('should sort numbers in ascending order', () => {
    const result = sortUsers(users, { key: 'id', direction: 'asc' });
    expect(result[0].id).toBe(1);
    expect(result[2].id).toBe(3);
  });

  it('should sort numbers in descending order', () => {
    const result = sortUsers(users, { key: 'id', direction: 'desc' });
    expect(result[0].id).toBe(3);
    expect(result[2].id).toBe(1);
  });
});
