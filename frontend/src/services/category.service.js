import axios from 'axios';
// import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/category/';

class CategoryService {
  getListOfCategories(categoryIDs) {
    return axios.post(API_URL + "list", { categoryIDs: categoryIDs });
  }

  getAll() {
    return axios.get(API_URL + 'all');
  }
}
export default new CategoryService();