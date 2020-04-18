import React, { Component } from "react";
import UserService from "../services/user.service";
import LoginRedirect from "./Login/LoginRedirect";

export default class MyStuff extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      requireLogin: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
    UserService.getMyStuff().then(
        response => {
          if (this._isMounted) {
            this.setState({
              content: JSON.stringify(response.data)
            });
          }},
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
        }
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { requireLogin, content } = this.state;
    return (
        <div className="container">
            {requireLogin ? LoginRedirect(content) :
                <header className="jumbotron">
                  <h3>{content}</h3>
                </header>
            }
        </div>
    );
  }
}