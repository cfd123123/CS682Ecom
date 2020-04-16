import React, {Component} from "react";
import UserService from "../services/user.service";
import {Link} from "react-router-dom";
import {Button} from 'reactstrap';
import queryString from 'query-string';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      products: [],
    };
  }

  searchContentPara() {
    queryString.stringify({
      content: this.state.searchContent
    });
  }

  handleKeyPress(event) {
    if(event.key === 'Enter') {
      // browserHistory.push(`/Result?${searchContentPara}`)
    }
    console.log('1')
  };


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
    return (
        <div className="container">
          <header className="jumbotron">
            <h3>Products</h3>
              <Link to="/create">
                Add Product
              </Link>
          </header>
          {this.state.content}
          <table className="table table-stripe">
            <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
            {this.state.products.map(product =>
                <tr key={`product${product.id}`}>
                  <td>{product.name}</td>
                  <td>{product.shortDescription}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <Link to={`/show/${product.id}`}>
                    <Button variant="outline-info" size="sm">
                      Edit
                    </Button>
                  </Link>
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
    );
  }
}