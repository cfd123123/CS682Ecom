import React from "reactn";
import UserService from "../services/user.service";
import {Link} from "react-router-dom";
import ProductResult from "./Search/ProductResult"

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      products: [],
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
        response => {
            this.setState({
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
    // const {currentUser} = this.context;

    const limitedProducts = this.state.products.slice(0, 20).map(product => {
      return <ProductResult key={`${product.id}`} id={product.id} />
    });

    return (
        <div className="container">
          <div>
            <header className="jumbotron">
              <h3>Products</h3>
              <Link to="/create">
                Add Product
              </Link>
            </header>
          </div>
          <br />
          <div>
            {this.state.content}
            {limitedProducts}
          </div>
        </div>
    );
  }
}
