import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    const { currentUser } = this.props.location.state;
    UserService.getMyStuff(currentUser.username).then(
        response => {
          this.setState({
            content: JSON.stringify(response.data)
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
    return (
        <div className="container">
          <header className="jumbotron">
            <h3>{this.state.content}</h3>
          </header>
        </div>
    );
  }
}