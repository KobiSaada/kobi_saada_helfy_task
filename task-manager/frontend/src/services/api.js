import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const api = {
  list:   (params={}) => axios.get(`${BASE_URL}/api/tasks`, { params }).then(r=>r.data),
  create: (data)      => axios.post(`${BASE_URL}/api/tasks`, data).then(r=>r.data),
  update: (id,d)      => axios.put(`${BASE_URL}/api/tasks/${id}`, d).then(r=>r.data),
  toggle: (id)        => axios.patch(`${BASE_URL}/api/tasks/${id}/toggle`).then(r=>r.data),
  remove: (id)        => axios.delete(`${BASE_URL}/api/tasks/${id}`),
  generate:(count=5)  => axios.post(`${BASE_URL}/api/tasks/generate`, null, { params:{count} }).then(r=>r.data),
};
