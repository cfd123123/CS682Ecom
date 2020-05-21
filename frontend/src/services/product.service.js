import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/products/';

class ProductService {
  getAllProducts() {
    return axios.get(API_URL + "all");
  }

  getSingleProduct(productID) {
    return axios.get(API_URL + productID);
  }

  addProduct(product) {
    return axios.post(API_URL + product.id, {...product}, { headers: authHeader() });
  }

  updateProduct(product) {
    return axios.put(API_URL + product.id, {...product}, { headers: authHeader() });
  }

  getListOfProducts(products) {
    return axios.post(API_URL + "list", { products: products });
  }

  deleteProduct(productID) {
    return axios.delete(API_URL + productID, { headers: authHeader() });
  }
}
export default new ProductService();
