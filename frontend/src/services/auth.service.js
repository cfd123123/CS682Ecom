import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

/**
 * AuthService manages all backend communication that has to do with
 * authentication. For now, that means login, logout, and signup.
 */
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
          console.log(response);
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify({
              accessToken: response.data.accessToken,
              tokenType: response.data.tokenType,
              ...response.data.user,
            }));
          }
          return response.data;
        });
  }

  /**
   * Sends a POST request to the backend requesting a logout. The backend
   * invalidates the JWT token, then this method removes the user details from
   * localStorage.
   */
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

  /**
   * Sends a POST request to the backend requesting a user signup. Details are
   * sent to the backend for validation. If successful, an OK message is
   * returned to the calling method.
   *
   * @param username the desired username
   * @param email the user's email
   * @param password the desired password
   * @returns {Promise<AxiosResponse<T>>} success or failure from the backend
   */
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }
}
export default new AuthService();