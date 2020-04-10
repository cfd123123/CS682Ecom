import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getCustomerHomepage() {
    return axios.get(API_URL + 'customer', { headers: authHeader() });
  }

  getEmployeeHomepage() {
    return axios.get(API_URL + 'employee', { headers: authHeader() });
  }

  getAdminHomepage() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();