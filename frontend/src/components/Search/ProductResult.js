import React from 'reactn';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import AddToCart from "../cart/AddToCart";
import ProductService from "../../services/product.service"

import './ProductResult.css';
import ProductImage from './../img/empty-product-icon.png';
import UserService from "../../services/user.service";

/*
The product card viewed on the results page. Contains the picture, name and price of the product.
*/

class ProductResult extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addToCartStep = this.addToCartStep.bind(this);
    this.state = {}
  }

  addToCartStep(quantity) {
    UserService.addToCart(this.props.id, quantity);
  }

  componentDidMount() {
    const {id} = this.props;
    ProductService.getSingleProduct(id).then(
       response => this.setState({...response.data}),
       error    => alert(error)
    )
  }

  render() {
    const {id, name, shortDescription, price, image} = this.state;
    if (!name) { return null; }
    const img = (image==='') ? ProductImage : image;

    return (
        <li className="result">
          <span>
            <div className="product-image">
              <Link to={`/show/${id}`}>
                <img src={img} className="center" alt={"Missing"}/>
              </Link>
            </div>
            <div className="product-info">
              <h1 className="product-name">{name}</h1>
              <h1 className="product-price">${price.toFixed(2)}</h1>
            </div>
            <h2 className="product-short-description">{shortDescription}</h2>
            {/*<h3 className="product-short-description">{longDescription}</h3>>*/}
            <AddToCart addToCart={this.addToCartStep} />
            <Link to={`/edit/${id}`}>
              <Button className='product-action-button' variant="outline-info" size="sm">Edit</Button>
            </Link>
          </span>
        </li>
    );
  }
}

export default ProductResult;
