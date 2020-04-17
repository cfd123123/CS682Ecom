import React, { Component } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import LoginRedirect from "./Login/LoginRedirect";

export default class MyStuff extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: undefined,
      requireLogin: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && currentUser.username) {
      UserService.getMyStuff(currentUser.username).then(
          response => {
            if (this._isMounted) {
              this.setState({
                currentUser: currentUser,
                content: JSON.stringify(response.data)
              });
            }
          },
          error => {
            if (this._isMounted) {
              this.setState({
                requireLogin: true,
                content: (error.response &&
                          error.response.data &&
                          error.response.data.message) ||
                    error.message ||
                    error.toString()
              });
            }
          });
    } else {
      this.setState({
        requireLogin: true,
        content: "You are not logged in"
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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