import React, {Component} from "react";
import UserService from "../services/user.service";
import {Link} from "react-router-dom";
import ProductCard from "./product/ProductCard"

export default class Home extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      products: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    UserService.getPublicContent().then(
        response => {
          if (this._isMounted) {
            this.setState({
              products: response.data
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const limitedProducts = this.state.products.slice(0, 20).map(product =>
        <ProductCard key={`${product.id}`} {...product} />
    );

    return (
        <div className="container">
          <header className="jumbotron">
            <h3>Products</h3>
              <Link to="/create">
                Add Product
              </Link>
          </header>
          {this.state.content}
          {limitedProducts}
        </div>
    );
  }
}