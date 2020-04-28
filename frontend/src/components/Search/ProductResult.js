import React from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import AddToCart from "../cart/AddToCart";

import './ProductResult.css';
import ProductImage from './../img/empty-product-icon.png';
import UserService from "../../services/user.service";

class ProductResult extends React.Component {
  constructor(props) {
    super(props);
    this.addToCartStep = this.addToCartStep.bind(this);
  }

  addToCartStep(quantity) {
    UserService.addToCart(this.props.id, quantity);
  }

  render() {
    const {id, name, shortDescription, price, image} = this.props;
    let img = (image==='') ? ProductImage : image;
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
            <Link to={`/show/${id}`}>
              <Button className='product-action-button' variant="outline-info" size="sm">Edit</Button>
            </Link>
          </span>
        </li>
    );
  }
}

export default ProductResult;
