import React, { Component } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import LoginRedirect from "./Login/LoginRedirect";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: undefined,
      requireLogin: false
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && currentUser.username) {
      this.setState({
        currentUser: currentUser
      });
      UserService.getProfile(currentUser.username).then(
          response => {
            this.setState({
              content: JSON.stringify(response.data)
            });
          },
          error => {
            this.setState({
              requireLogin: true,
              content: (error.response && error.response.data &&
                  error.response.data.message) || error.message || error.toString()
            });
          }
      );
    } else {
      this.setState({
        requireLogin: true,
        content: "You are not logged in"
      });
    }
  }

  render() {
    const { currentUser, content, requireLogin } = this.state;
    return (
        <div className="container">
          {requireLogin ? LoginRedirect(content) : (currentUser &&
              <div>
                <header className="jumbotron">
                  <h3>
                    <strong>{content.username}</strong> Profile
                  </h3>
                </header>
                <p>
                  <strong>Content:</strong>{" "}
                  {content}
                </p>
                <p>
                  <strong>Token:</strong>{" "}
                  {currentUser.accessToken.substring(0, 20)} ...{" "}
                  {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p>
                  <strong>Id:</strong>{" "}
                  {currentUser.id}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {currentUser.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                  {currentUser.roles &&
                  currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
              </div>
          )}
        </div>
    );
  }
}