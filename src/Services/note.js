import axios from './axiosConfig';

const getAll = () => {
  return axios.get('/notes');
};

const get = (id) => {
  return axios.get(`/notes/${id}`);
};

const create = (data) => {
  return axios.post('/notes', data);
};

const update = (id, data) => {
  return axios.put(`/notes/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`/notes/${id}`);
};

const removeAll = () => {
  return axios.delete(`/notes`);
};

const findByTitle = (title) => {
  return axios.get(`/notes?title=${title}`);
};

const noteService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default noteService;
