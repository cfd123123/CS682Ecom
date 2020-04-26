import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: undefined
    };
  }

  componentDidMount() {
    axios.get('/products/'+this.props.match.params.id)
        .then(response => {
          this.setState({ product: response.data });
        });
  }

  delete(id){
    axios.delete('/products/'+id)
        .then((result) => {
          this.props.history.push("/")
        });
  }

  render() {
    const {product} = this.state;
    return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Product Details
              </h3>
            </div>
            <div className="panel-body">
              <h4>
                <Link to="/">
                  <span className="glyphicon glyphicon-th-list" aria-hidden="true"/>
                  Products List
                </Link>
              </h4>
              {product &&
              <div>
                <dl>
                  <dt>Name:</dt>
                  <dd>{product.name}</dd>
                  <dt>ShortDescription:</dt>
                  <dd>{product.shortDescription}</dd>
                  <dt>LongDescription:</dt>
                  <dd>{product.longDescription}</dd>
                  <dt>Price:</dt>
                  <dd>{product.price}</dd>
                  <dt>Quantity:</dt>
                  <dd>{product.quantity}</dd>
                </dl>
                < Link to={`/edit/${product.id}`} className="btn btn-success">
                  Edit
                </Link>
                <button onClick={this.delete.bind(this, product.id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
              }
            </div>
          </div>
        </div>
    );
  }
}

export default Show;