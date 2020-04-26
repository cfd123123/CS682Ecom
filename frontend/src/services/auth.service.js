import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  /**
   * Calls axios.post() with the given username and password. The JwtResponse
   * returned by the backend is stored in localStorage and returned back
   * to the calling method.
   *
   * @param username the username to log in with
   * @param password the password associated with username
   * @returns {Promise<T>} the JwtResponse data
   */
  login(username, password) {
    return axios.post(API_URL + "signin", {
          username,
          password
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify({
              accessToken: response.data.accessToken,
              tokenType: response.data.tokenType,
              ...response.data.user,
            }));
            window.refresh();
          }
          return response.data;
        });
  }

  logout() {
    axios.post(API_URL + "signout", JSON.parse(localStorage.getItem('user'))).then(
            response => {
              console.log(response);
              },
            error => {
              if (error && error.response) {
                console.log(error.response);
              }
            });
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }
}
export default new AuthService();