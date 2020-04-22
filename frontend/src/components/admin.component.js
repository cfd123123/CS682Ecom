import React, { Component } from "react";
import UserService from "../services/user.service";
import {CurrentUserContext} from "../CurrentUserContext";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminContent().then(
        response => {
          this.setState({
            content: response.data
          });
        },
        error => {
          this.setState({
            content:
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
          });
        }
    );
  }

  render() {
    const {currentUser} = this.context;
    console.log(currentUser);
    return (
        <div className="container">
          <header className="jumbotron">
            <h3>{this.state.content}</h3>
          </header>
        </div>
    );
  }
}
Admin.contextType = CurrentUserContext;