import axios from 'axios';

export const apiLogin = request_data => {
  return axios.post('/api/v1/login', request_data);
};

export const apiRegister = request_data => {
  return axios.post('/api/v1/register', request_data);
};


export const fetchProfile = () => {
  return axios.get('/api/v1/me');
}