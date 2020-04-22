import React, {Component} from "react";
import UserService from "../services/user.service";
import {Link} from "react-router-dom";
import ProductCard from "./product/ProductCard"

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      content: "",
      products: [],
    };
  }

  componentDidMount() {
    const { currentUser } = this.props.location.state;

    UserService.getPublicContent().then(
        response => {
            this.setState({
              currentUser: currentUser,
              products: response.data
            });
        },
        error => {
            this.setState({
              content:
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString()
            });
        }
    );
  }


  render() {
    const limitedProducts = this.state.products.slice(0, 20).map(product => {
      // console.log(product);
      return <ProductCard key={`${product.id}`} {...product} />
    }
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