import React, { Component } from "react";
import UserService from "../services/user.service";
import LoginRedirect from "./Login/LoginRedirect";

export default class Profile extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      username: "",
      email: "",
      id: "",
      cart: undefined,
      requireLogin: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
    UserService.getProfile().then(
        response => {
          if (this._isMounted) {
            this.setState({
              content: JSON.stringify(response.data),
              username: response.data.username,
              email: response.data.email,
              cart: response.data.cart,
              id: response.data.id
            });
          }
        },
        error => {
          if (this._isMounted) {
            this.setState({
              requireLogin: true,
              content: (error.response && error.response.data &&
                  error.response.data.message) || error.message || error.toString()
            });
          }
        }
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { content, username, id, email, cart, requireLogin } = this.state;
    const cartList = cart ? Object.entries(cart).map(([key,value]) =>
      Object.entries(value).map(([k,v]) => {
        return (
            <div key={k}>{k} : {v.toString()}</div>
        );
      })) : [];
    return (
        <div className="container">
          {requireLogin ? LoginRedirect(content) : (cart &&
              <div>
                <header className="jumbotron">
                  <h3><strong>{username}</strong>Profile</h3>
                </header>
                <p><strong>Content:</strong>{" "}{content}</p>
                <p><strong>ID:</strong>{" "}     {id}</p>
                <p><strong>Email:</strong>{" "}  {email}</p>
                <p /><strong>Cart:</strong>{" "} {cartList}
                {/*{cart.map(item =>*/}
                {/*{Object.entries(cart).map((entry, counter) =>*/}
                {/*    entry.map((id, qty) =>*/}
                {/*        <span key={id}>*/}
                {/*          {`[id: ${id}, qty: ${qty}] >>> `}*/}
                {/*        </span>*/}
                {/*    )*/}
                {/*)}</p>*/}
              </div>
          )}
        </div>
    );
  }
}