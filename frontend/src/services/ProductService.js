import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/products/';

/**
 * ProductService manages all backend communication related to products.
 */
class ProductService {
  /**
   * Sends a GET request to the backend for a list of all products currently in
   * the database. The server response containing the list of product objects
   * is returned back to the calling function.
   *
   * WARNING: Responses to this request may be significantly delayed due to the
   * size of the data being returned, particularly for marketplaces offering a
   * large number of products.
   *
   * @returns {Promise<AxiosResponse<T>>} the list of products currently in the database
   */
  getAllProducts() {
    return axios.get(API_URL + "all");
  }

  /**
   * Sends a POST request to the backend to add a new product to the database
   * with the given specifications. Categories and generating a product ID are
   * handled in the backend. The server response containing the saved product,
   * including ID, is returned back to the calling function.
   *
   * The product argument is an object containing: name, shortDescription,
   * longDescription, price, quantity, image URL string, and a set of category
   * names.
   *
   * Only Employees and Admins have access to the backend mapping associated
   * with this request.
   *
   * @param product the product's specifications, including name, description, and more
   * @returns {Promise<AxiosResponse<T>>} the saved product, including an ID and categories as IDs
   */
  addProduct(product) {
    return axios.post(API_URL + "all", {...product}, { headers: authHeader() });
  }

  /**
   * Sends a PUT request to the backend to update an existing product with the
   * given specifications. The server response containing the updated product
   * is returned back to the calling function.
   *
   * The category set included in the argument may be a mix of category names
   * and category IDs. The backend will parse the list and update the product
   * accordingly.
   *
   * Only Employees and Admins have access to the backend mapping associated
   * with this request.
   *
   * @param product the product object to be updated
   * @returns {Promise<AxiosResponse<T>>} the updated product object
   */
  updateProduct(product) {
    return axios.put(API_URL + product.id, {...product}, { headers: authHeader() });
  }

  /**
   * Sends a POST request to the backend with the given list of product IDs for
   * a list of product objects corresponding to the given IDs, if they exist.
   * The server response containing the list of product objects is returned back
   * to the calling function.
   *
   * @param productIDs the list of product IDs
   * @returns {Promise<AxiosResponse<T>>} the list of product objects
   */
  getListOfProducts(productIDs) {
    return axios.post(API_URL + "list", { products: productIDs });
  }

  /**
   * Sends a GET request to the backend for the product object associated with
   * the given product ID. The server response containing the product object is
   * returned back to the calling function.
   *
   * @param productID the product ID
   * @returns {Promise<AxiosResponse<T>>} the product object
   */
  getSingleProduct(productID) {
    return axios.get(API_URL + productID);
  }

  /**
   * Sends a DELETE request to the backend for the product by the given product
   * ID to be deleted from the database. A server response string is returned
   * back to the calling function.
   *
   * Only Employees and Admins have access to the backend mapping associated
   * with this request.
   *
   * @param productID the ID of the product to be deleted
   * @returns {Promise<AxiosResponse<T>>} the confirmation message from the backend
   */
  deleteProduct(productID) {
    return axios.delete(API_URL + productID, { headers: authHeader() });
  }
}
export default new ProductService();
