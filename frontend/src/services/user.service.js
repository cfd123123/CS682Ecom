import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "./auth.service";

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
  getCurrentUsername() {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && currentUser.username) {
      return currentUser.username;
    } else {
      return "anonymous";
    }
  }

  getPublicContent() {
    return axios.get('http://localhost:8080/products/all');
  }

  getMyStuff() {
    return axios.get(API_URL + 'mystuff', {
      headers: authHeader(),
      params: { username: this.getCurrentUsername() }
    });
  }

  getEmployeeContent() {
    return axios.get(API_URL + 'employee', { headers: authHeader() });
  }

  getAdminContent() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getProfile(source) {
    if (source) {
      return axios.get(API_URL + 'profile', {
        cancelToken: source.token,
        headers: authHeader(),
        params: {username: this.getCurrentUsername()}
      });
    } else {
      return axios.get(API_URL + 'profile', {
        headers: authHeader(),
        params: {username: this.getCurrentUsername()}
      });
    }
  }

  addToCart(productID, quantity) {
    return axios.post(API_URL + 'profile/cart', {
      username: this.getCurrentUsername(),
      productID: productID,
      quantity: quantity
    },{
      headers: authHeader()
    })
  }
}

export default new UserService();