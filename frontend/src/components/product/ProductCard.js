import React from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import UserService from "../../services/user.service";
import ProductService from "../../services/product.service";
import AddToCart from "../cart/AddToCart";

import './ProductCard.css';
import ProductImage from './../img/empty-product-icon.png';

class ProductCard extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);

    this.state = {
      id: this.props.id,
      name: '',
      shortDescription: '',
      price: undefined,
      content: "",
      loaded: false
    };
  }

  addToCart(quantity) {
    console.log("Something was added! sending API request");
    UserService.addToCart(this.state.id, quantity).then(
        response => {
          console.log(response);
          alert("Item added to cart: " + response.data);
        },
        error => {
          console.log(error && error.response);
          alert("error adding to cart: " + error);
        }
    )
  }

  componentDidMount() {
    this._isMounted = true;
    ProductService.getSingleProduct(this.state.id).then(
        response => {
          if (this._isMounted) {
            this.setState({
              content: JSON.stringify(response.data),
              name: response.data.name,
              shortDescription: response.data.shortDescription,
              price: response.data.price,
              loaded: true
            });
          }
        },
        error => {
          if (this._isMounted) {
            this.setState({
              requireLogin: true,
              content: (error.response && error.response.data &&
                  error.response.data.message) || error.message || error.toString()
            });
          }
        }
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
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
              <AddToCart addToCart={this.addToCart} />
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

export default ProductCard;
