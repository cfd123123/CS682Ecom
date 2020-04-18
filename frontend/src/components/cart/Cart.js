import React, { Component } from 'react';
import UserService from "../../services/user.service";
import ProductCard from "../product/ProductCard";

class Cart extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      content: "",
      products: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    UserService.getProfile().then(
        response => {
          if (this._isMounted) {
            // console.log(response.data);
            this.setState({
              products: response.data.cart
            });
          }
        },
        error => {
          if (this._isMounted) {
            this.setState({
              content:
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString()
            });
          }
        }
    );
}

  render() {
    const { products } = this.state;
    const cartList = Object.entries(products).map(([key,value]) =>
        Object.entries(value).map(([k,v]) => {
          return (<ProductCard key={k} id={k}/>);
        })
    );
    return (
        <div className="container">
          <header className="jumbotron">
            <h3><strong>CART PRODUCTS LIST</strong></h3>
          </header>
          {cartList}
        </div>
    );
  }
}

export default Cart;