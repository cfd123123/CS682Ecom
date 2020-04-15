import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
        .post(API_URL + "signin", {
          username,
          password
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data;
        });
  }

  logout() {
    axios
        .post(API_URL + "signout", JSON.parse(localStorage.getItem('user'))).then(
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

  getCurrentUser() {
    // let userInfo = JSON.parse(localStorage.getItem('user'));
    // return userInfo ? userInfo : JSON.parse("{\"username\":\"anonymous\",\"roles\":[\"ROLE_PUBLIC\"]}");
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();