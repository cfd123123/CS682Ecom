import React, { Component } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import LoginRedirect from "./Login/LoginRedirect";

export default class MyStuff extends Component {
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
      UserService.getMyStuff(currentUser.username).then(
          response => {
            this.setState({
              content: JSON.stringify(response.data)
            });
          },
          error => {
            this.setState({
              requireLogin: true,
              content:
                  (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                  error.message ||
                  error.toString()
            });
          });
    } else {
      this.setState({
        requireLogin: true,
        content: "You are not logged in"
      });
    }
  }

  render() {
    const { requireLogin, content } = this.state;
    return (
        <div className="container">
          <header className="jumbotron">
            {requireLogin ? LoginRedirect(content) :
                <h3>{content}</h3>
            }
          </header>
        </div>
    );
  }
}