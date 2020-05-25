import { setGlobal } from "reactn";
import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/user/';

/**
 * UserService manages all backend communication related to Users. It also
 * contains a small number of functions related to navigation and shopping cart.
 */
class UserService {

  /**
   * Helper function that gets the currently logged in user's username.
   *
   * If the current user is not logged in, "None" is returned.
   *
   * @returns {string} the currently logged in user's username, or "None" if not logged in.
   */
  getCurrentUsername() {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.username) {
      return currentUser.username;
    } else {
      return "None";
    }
  }

  /**
   * Sends a GET request to the backend for the currently logged in user's
   * personalized content. The server's reply with profile data is returned back
   * to the calling function.
   *
   * Only users with the 'CUSTOMER' role have access to the backend mapping
   * associated with this request.
   *
   * NOTE: This function is incomplete and currently receives the same data as
   * the getMyAccount() function.
   *
   * @returns {Promise<AxiosResponse<T>>} the current user's profile data
   */
  getMyStuff() {
    return axios.get(API_URL + 'mystuff', { headers: authHeader() });
  }

  /**
   * Sends a GET request to the backend for the currently logged in user's
   * account data. The server's reply with account data is returned back to the
   * calling function.
   *
   * All users with an account and that are currently logged in have access to
   * the backend mapping associated with this request.
   *
   * @returns {Promise<AxiosResponse<T>>} the current user's account data
   */
  getMyAccount() {
    return axios.get(API_URL + 'profile', { headers: authHeader() });
  }

  /**
   * Sends a GET request to the backend for the currently logged in user's
   * employee content. The server's reply with the data is returned back to the
   * calling function.
   *
   * Only Employees and Admins have access to the backend mapping associated
   * with this request.
   *
   * NOTE: This feature is incomplete and currently receives a text string that
   * reads "Employee Content".
   *
   * @returns {Promise<AxiosResponse<T>>} the current user's employee content
   */
  getEmployeeContent() {
    return axios.get(API_URL + 'employee', { headers: authHeader() });
  }

  /**
   * Sends a GET request to the backend for the currently logged in user's
   * admin content. The server's reply with the data is returned back to the
   * calling function.
   *
   * Only Admins have access to the backend mapping associated with this request.
   *
   * NOTE: This feature is incomplete and currently receives a text string that
   * reads "Admin Content".
   *
   * @returns {Promise<AxiosResponse<T>>} the current user's admin content
   */
  getAdminContent() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  /**
   * Adds the given quantity of the given productID to the current user's cart,
   * then calls updateCurrentUser()
   *
   * Only users with the 'CUSTOMER' role have access to the backend mapping
   * associated with this request.
   *
   * WARNING: This function is incomplete, as it does not allow a user to add
   * items to the cart unless that user is logged in.
   *
   * @param productID the product to be added to the cart
   * @param quantity the quantity of productID to be added to the cart
   */
  addToCart(productID, quantity) {
    const username = this.getCurrentUsername();
    if (username === "None") {
      alert("Not logged in. Please log in before shopping");
      return;
    }
    axios.post(API_URL + 'profile/cart', {
      username: username,
      productID: productID,
      quantity: quantity
    },{ headers: authHeader() }
    ).then(
        response => {
          const newUser = (response.data.user);
          this.updateCurrentUser(newUser);
        },
        error => {
          console.log(error && error.response);
          alert("error adding to cart: " + error);
        }
    );
  }

  /**
   * Begins the checkout process by sending a POST request to the backend with
   * username and cart details. The backend response with a PreOrder is returned
   * back to the calling function.
   *
   * Only users with the 'CUSTOMER' role have access to the backend mapping
   * associated with this request.
   *
   * @param cart the cart details for current user's order
   * @param total the product subtotal of the cart
   * @returns {Promise<AxiosResponse<T>>} the PreOrder details for the products in the user's cart
   */
  proceedToCheckout(cart, total) {
    const data = {
      username: this.getCurrentUsername(),
      products: cart,
      subtotal: total,
    };
    return axios.post(API_URL + 'profile/checkout',
        {...data},
        {headers: authHeader()}
    );
  }

  /**
   * Completes the checkout process by sending a POST request to the backend
   * with the current user's username and the PreOrder ID for this order.
   *
   * Only users with the 'CUSTOMER' role have access to the backend mapping
   * associated with this request.
   *
   * @param orderID the PreOrder Id for this order
   * @returns {Promise<AxiosResponse<T>>} the OrderResponse from the backend, containing the Order details
   */
  placeOrder(orderID) {
    const data = {
      username: this.getCurrentUsername(),
      preOrderId: orderID,
    };
    return axios.post(API_URL + 'profile/placeorder',
        {...data},
        {headers: authHeader()}
    );
  }

  /**
   * Returns the current value of "user" in localStorage, or the "None" user if
   * the key does not exist.
   * @returns {currentUser}
   */
  getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    return currentUser ? currentUser : { username: "None", cart: {}, roles: [] };
  }

  /**
   * Updates the "user" localStorage item and "currentUser" global variable
   * to include newUser as the new currentUser. accessToken and tokenType are
   * taken from existing values.
   * @param newUser the new data to replace existing currentUser.
   */
  updateCurrentUser(newUser) {
    const oldCurrentUser = this.getCurrentUser();
    const newCurrentUser = {
      accessToken: oldCurrentUser.accessToken,
      tokenType: oldCurrentUser.tokenType,
      ...newUser,
    };
    localStorage.setItem("user", JSON.stringify(newCurrentUser));
    setGlobal({ currentUser: { ...newCurrentUser } });
  }
}
export default new UserService()
