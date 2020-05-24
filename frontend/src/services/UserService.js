import { setGlobal } from "reactn";
import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/user/';

/**
 * UserService manages all backend communication related to Users. It also
 * contains a small number of functions related to navigation and shopping cart.
 */
class UserService {
  getCurrentUsername() {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.username) {
      return currentUser.username;
    } else {
      return "None";
    }
  }

  /**
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  getPublicContent() {
    return axios.get('http://localhost:8080/products/all');
  }

  getMyStuff() {
    return axios.get(API_URL + 'mystuff', { headers: authHeader() });
  }

  getEmployeeContent() {
    return axios.get(API_URL + 'employee', { headers: authHeader() });
  }

  getAdminContent() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getMyAccount() {
    return axios.get(API_URL + 'profile', { headers: authHeader() });
  }

  placeOrder(orderID) {
    const data = {
      username: this.getCurrentUsername(),
      preOrderId: orderID,
    };
    return axios.post(API_URL + 'profile/placeorder', {
      ...data
    }, {headers: authHeader()})
  }

  proceedToCheckout(cart, total) {
    // console.log(cart);
    // alert(cart);
    const data = {
      username: this.getCurrentUsername(),
      products: cart,
      subtotal: total,
    };
    return axios.post(API_URL + 'profile/checkout', {
      ...data
    }, {headers: authHeader()})
  }

  /**
   * INCOMPLETE!! This function does not currently work if the user is not logged in.
   *
   * Adds the given quantity of the given productID to the current user's cart,
   * then calls @updateCurrentUser
   *
   * @param productID the product to be added to the cart
   * @param quantity the quantity of productID to be added to the cart
   */
  addToCart(productID, quantity) {
    const username = this.getCurrentUsername();
    if (username === "None") {
      alert("Not logged in. Error incoming");
    }
    axios.post(API_URL + 'profile/cart', {
      username: username,
      productID: productID,
      quantity: quantity
    },{
      headers: authHeader()
    }).then(
        response => {
          const newUser = (response.data.user);
          this.updateCurrentUser(newUser);
        },
        error => {
          console.log(error && error.response);
          alert("error adding to cart: " + error);
        }
    )
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
