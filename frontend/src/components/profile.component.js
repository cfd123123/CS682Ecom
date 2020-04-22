import React, { Component } from "react";
import {CurrentUserContext} from "../CurrentUserContext";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }


  render() {
    const {currentUser} = this.context;
    console.log(currentUser);

    if (!currentUser) {
      return null;
    }
    const { username, id, email, cart, roles } = currentUser;

    return (
        <div className="container">
          <div>
            <header className="jumbotron">
              <h3><strong>{username}</strong>{" "}Profile</h3>
            </header>
            <p><strong>Username:</strong>{" "}     {username}</p>
            <p><strong>ID:</strong>{" "}     {id}</p>
            <p><strong>Email:</strong>{" "}  {email}</p>
            <p /><strong>Roles:</strong>{" "}  {roles.map(role => <div key={role}>{role}</div>)}
            <p /><strong>Cart:</strong>{" "} {Object.entries(cart).map(([k,v]) => <div key={k}>{k}: {v}</div>)}
          </div>
        </div>
    );
  }
}
Profile.contextType = CurrentUserContext;