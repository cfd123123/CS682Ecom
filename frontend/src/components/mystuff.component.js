import React, { Component } from "react";
import UserService from "../services/user.service";
import LoginRedirect from "./Login/LoginRedirect";
import {CurrentUserContext} from "../CurrentUserContext";

export default class MyStuff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      requireLogin: false
    };
  }

  componentDidMount() {
    UserService.getMyStuff().then(
        response => {
          this.setState({
            content: JSON.stringify(response.data)
          });
        }, error => {
          this.setState({
            requireLogin: true,
            content: (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
          });
        }
    );
  }

  render() {
    // const {currentUser} = this.context;

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
MyStuff.contextType = CurrentUserContext;