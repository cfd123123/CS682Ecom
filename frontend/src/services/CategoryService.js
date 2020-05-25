import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = 'http://localhost:8080/category/';

/**
 * CategoryService manages all backend communication related to Categories.
 */
class CategoryService {

  /**
   * Sends a GET request to the backend for a list of all categories in
   * the database. The server response containing the list of categories is returned
   * back to the calling function.
   *
   * @returns {Promise<AxiosResponse<T>>} the list of all categories from the backend
   */
  getAll() {
    return axios.get(API_URL + 'all');
  }

  /**
   * Sends a POST request to the backend to save the given category as a new
   * category. The server response containing the saved category object is returned
   * back to the calling function.
   *
   * Only Employees and Admins have access to the backend mapping associated with
   * this request.
   *
   * @param category the category object to be saved
   * @returns {Promise<AxiosResponse<T>>} the saved category object, which includes an ID
   */
  saveCategory(category) {
    return axios.post(API_URL + 'all', {...category}, { headers: authHeader() });
  }

  /**
   * Sends a DELETE request to the backend for the Category by the
   * given categoryID to be deleted from the database. A server response is
   * returned back to the calling function.
   *
   * Only Employees and Admins have access to the backend mapping associated with
   * this request.
   *
   * @param categoryID the ID of the category to be deleted
   * @returns {Promise<AxiosResponse<T>>} the confirmation message from the backend
   */
  deleteCategory(categoryID) {
    return axios.delete(API_URL + categoryID, { headers: authHeader() });
  }

  /**
   * Sends a GET request to the backend for all products associated with
   * the given category. The server response containing the list of products is
   * returned back to the calling function.
   *
   * @param categoryName the category name for which products are required.
   * @returns {Promise<AxiosResponse<T>>} the list of products associated with the given category
   */
  getCategoryProducts(categoryName) {
    return axios.get(API_URL + categoryName);
  }

  /**
   * Sends a POST request to the backend with the given list of category IDs for
   * a list of category objects corresponding to the given IDs, if they exist.
   * The server response containing the list of category objects is returned
   * back to the calling function.
   *
   * @param categoryIDs the list of category IDs
   * @returns {Promise<AxiosResponse<T>>} the list of category objects
   */
  getListOfCategories(categoryIDs) {
    return axios.post(API_URL + "list", { categoryIDs: categoryIDs });
  }
}
export default new CategoryService();