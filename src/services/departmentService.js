import api from './api';

const handleResponse = (response) => {
  if (!response.data.success) {
    throw new Error(response.data.message || 'Request failed');
  }
  return response.data;
};

export const getAllDepartments = async () => {
  const response = await api.get('/departments');
  return handleResponse(response).data;
};

export const getDepartmentById = async (id) => {
  const response = await api.get(`/departments/${id}`);
  return handleResponse(response).data;
};

export const createDepartment = async (data) => {
  const response = await api.post('/departments', data);
  return handleResponse(response);
};

export const updateDepartment = async (id, data) => {
  const response = await api.put(`/departments/${id}`, data);
  return handleResponse(response);
};

export const deleteDepartment = async (id) => {
  const response = await api.delete(`/departments/${id}`);
  return handleResponse(response);
};
