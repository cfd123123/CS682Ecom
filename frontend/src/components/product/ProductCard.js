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
      image: '',
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
            image: response.data.image,
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
    const fixedDescription = shortDescription.length > 120 ? shortDescription.substring(0,117) + "..." : shortDescription;
    const fixedName = name.length > 60 ? name.substring(0,57) + "..." : name;

    return (
        <li className="result">
          {loaded &&
              <div className="app-card-container">
                <div className="app-cart-picture">
                  <Link to={`/show/${id}`}>
                    <img src={ProductImage} className="center" alt={"missingID"}/>
                  </Link>
                </div>
                <div className="app-row app-card-name">
                  <a href={`/products/${id}`} className="app-size-medium">{fixedName}</a>
                </div>
                <div className="app-row app-card-price">
                  <span className="app-color-price app-size-medium app-text-bold">
                    {"  "}${price.toFixed(2)}
                  </span>
                </div>
                <div className="app-card-description">
                  {fixedDescription}
                </div>
                <div className="app-card-buttons">
                  <AddToCart addToCart={this.addToCartStep} />
                  {/*<Button onClick={addToCart}>Add to cart</Button>*/}
                  <Link to={`/show/${id}`}>
                    <Button className='product-action-button' variant="outline-info" size="sm">Edit</Button>
                  </Link>
                </div>
              </div>
          }
        </li>
    );
  }
}
ProductCard.contextType = CurrentUserContext;
