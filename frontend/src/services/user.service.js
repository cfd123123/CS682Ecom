import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
  getCurrentUsername() {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.username) {
      return currentUser.username;
    } else {
      return "None";
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

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  updateCurrentUser(newUser) {
    const oldCurrentUser = this.getCurrentUser();
    localStorage.setItem("user", JSON.stringify({
      accessToken: oldCurrentUser.accessToken,
      tokeType: oldCurrentUser.tokeType,
      ...newUser,
    }));
    // TODO: Find out if using a global variable like this is bad
    window.refresh();
    // window.location.reload()
  }
}
export default new UserService()
