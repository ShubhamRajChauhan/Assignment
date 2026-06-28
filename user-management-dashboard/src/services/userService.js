import axios from 'axios';
import { API_URL } from '../utils/constants';

// Fetch users from JSONPlaceholder
export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Simulate POST request
export const addUserApi = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

// Simulate PUT request
export const updateUserApi = async (id, userData) => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

// Simulate DELETE request
export const deleteUserApi = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
