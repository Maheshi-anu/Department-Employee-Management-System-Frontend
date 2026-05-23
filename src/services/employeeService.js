import api from './api';

const handleResponse = (response) => {
  if (!response.data.success) {
    throw new Error(response.data.message || 'Request failed');
  }
  return response.data;
};

export const getAllEmployees = async () => {
  const response = await api.get('/employees');
  return handleResponse(response).data;
};

export const getEmployeeById = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return handleResponse(response).data;
};

export const createEmployee = async (data) => {
  const response = await api.post('/employees', data);
  return handleResponse(response);
};

export const updateEmployee = async (id, data) => {
  const response = await api.put(`/employees/${id}`, data);
  return handleResponse(response);
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`);
  return handleResponse(response);
};
