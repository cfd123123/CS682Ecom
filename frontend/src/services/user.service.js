import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get('http://localhost:8080/products/all');
  }

  getMyStuff(username) {
    return axios.get(API_URL + 'mystuff', { headers: authHeader(), params: { username: username }});
  }

  getEmployeeContent() {
    return axios.get(API_URL + 'employee', { headers: authHeader() });
  }

  getAdminContent() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getProfile(username) {
    return axios.get(API_URL + 'profile', { headers: authHeader(), params: { username: username }});
  }
}

export default new UserService();