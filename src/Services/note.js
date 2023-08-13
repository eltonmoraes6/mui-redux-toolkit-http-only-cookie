import axios from './axiosConfig';

const getAll = () => {
  return axios.get('/note');
};

const get = (id) => {
  return axios.get(`/note/${id}`);
};

const create = (data) => {
  return axios.post('/note', data);
};

const update = (id, data) => {
  return axios.put(`/note/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`/note/${id}`);
};

const removeAll = () => {
  return axios.delete(`/note`);
};

const findByTitle = (title) => {
  return axios.get(`/note?title=${title}`);
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
