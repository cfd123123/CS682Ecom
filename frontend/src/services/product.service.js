import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/products/';

class ProductService {

  getSingleProduct(productID) {
    return axios.get(API_URL + productID, { headers: authHeader() });
  }

  getListOfProducts(products) {
    return axios.post(API_URL + "list", { products: products }, { headers: authHeader() });
  }

}

export default new ProductService();