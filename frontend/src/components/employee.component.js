import React, { Component } from "react";
import UserService from "../services/user.service";
import {CurrentUserContext} from "../CurrentUserContext";

export default class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getEmployeeContent().then(
        response => {
          this.setState({
            content: response.data
          });
        },
        error => {
          console.log(error.response);
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
    // const {currentUser} = this.context;
    // console.log(currentUser);
    return (
        <div className="container">
          <header className="jumbotron">
            <h3>{this.state.content}</h3>
          </header>
        </div>
    );
  }
}
Employee.contextType = CurrentUserContext;