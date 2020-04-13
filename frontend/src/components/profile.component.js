import React, { Component } from "react";
import UserService from "../services/user.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    console.log("prop state: " + this.props.location.state);
    const { currentUser } = this.props.location.state;
    UserService.getProfile(currentUser.username).then(
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
    const { content } = this.state;

    return (
        <div className="container">
          {content && (
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
                {/*<p>*/}
                {/*  <strong>Token:</strong>{" "}*/}
                {/*  {content.accessToken.substring(0, 20)} ...{" "}*/}
                {/*  {content.accessToken.substr(content.accessToken.length - 20)}*/}
                {/*</p>*/}
                {/*<p>*/}
                {/*  <strong>Id:</strong>{" "}*/}
                {/*  {content.id}*/}
                {/*</p>*/}
                <p>
                  <strong>Email:</strong>{" "}
                  {content.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                  {content.roles &&
                  content.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
              </div>
          )}
        </div>
    );
  }
}