import React from 'reactn';
import { Link } from 'react-router-dom';
import ProductService from "../services/ProductService"

export default class Show extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      product: undefined
    };
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    ProductService.getSingleProduct(id).then(response => {
      this.setState({ product: response.data });
    });
  }

  delete(id){
    ProductService.deleteProduct(id).then(result => {
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
