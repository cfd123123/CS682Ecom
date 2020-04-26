import React from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import UserService from "../../services/user.service";
import ProductService from "../../services/product.service";
import AddToCart from "../cart/AddToCart";

import './ProductCard.css';
import ProductImage from './../img/empty-product-icon.png';
import {CurrentUserContext} from "../../CurrentUserContext";

export default class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.addToCartStep = this.addToCartStep.bind(this);

    this.state = {
      id: this.props.id,
      name: '',
      shortDescription: '',
      price: undefined,
      content: "",
      loaded: false
    };
  }

  addToCartStep(quantity) {
    UserService.addToCart(this.state.id, quantity);
  }

  componentDidMount() {
    ProductService.getSingleProduct(this.state.id).then(
        response => {
          this.setState({
            content: JSON.stringify(response.data),
            name: response.data.name,
            shortDescription: response.data.shortDescription,
            price: response.data.price,
            loaded: true
          });
        },
        error => {
          this.setState({
            requireLogin: true,
            content: (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString()
          });
        }
    );
  }

  render() {
    const {id, name, shortDescription, price, loaded} = this.state;

    return (
        <li className="result">
          {loaded &&
            <span>
              <div className="product-image">
                <Link to={`/show/${id}`}>
                  <img src={ProductImage} className="center" alt={"missingID"}/>
                </Link>
              </div>
              <div className="product-info">
                <h1 className="product-name">{name}</h1>
                <h1 className="product-price">${price.toFixed(2)}</h1>
              </div>
              <h2 className="product-short-description">{shortDescription}</h2>
              <AddToCart addToCart={this.addToCartStep} />
              {/*<Button onClick={addToCart}>Add to cart</Button>*/}
              <Link to={`/show/${id}`}>
                <Button className='product-action-button' variant="outline-info" size="sm">Edit</Button>
              </Link>
            </span>
          }
        </li>
    );
  }
}
ProductCard.contextType = CurrentUserContext;
