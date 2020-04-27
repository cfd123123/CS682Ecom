import React from 'react';
import {Link} from 'react-router-dom';

import './../cart/Cart.css'
import ProductImage from './../img/empty-product-icon.png';

class CartProductRow extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      name: this.props.name,
      shortDescription: this.props.shortDescription,
      price: this.props.price,
      quantity: this.props.quantity
    };
  }

  componentDidMount()    { this._isMounted = true;  }
  componentWillUnmount() { this._isMounted = false; }

  render() {
    const {id, name, price, quantity} = this.state;

    return (
        <div className="app-row cart-item">
          <div className="app-row cart-list-item cart-list-item-border">
            <div className="app-row app-spacing-base app-spacing-top-base">
              <div className="app-column app-span85">
                <div className="app-fixed-left-grid">
                  <div className="app-fixed-left-grid-inner" style={{ 'paddingLeft': '190px' }}>
                    <div className="app-fixed-left-grid-col app-float-left cart-product-image app-col-left">
                      <Link to={`/show/${id}`}>
                        <img src={ProductImage} className="center" alt={"missingID"}/>
                      </Link>
                    </div>
                    <div className="app-fixed-left-grid-col app-col-right cart-product-info">
                      <ul className="app-unordered-list app-nostyle app-vertical app-spacing-mini">
                        <li>
                          <span className="app-list-item">
                            <a href={`/show/${id}`} className="app-link-normal cart-product-link">
                              <span className="app-size-medium cart-product-title">
                                {name}
                              </span>
                            </a>
                          </span>
                        </li>
                        <li><span className="app-list-item">
                          <span>
                            Quantity: {quantity}
                          </span>
                        </span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="app-column app-span15 app-text-right app-span-last">
                <p className="app-spacing-small">
                  <span className="app-size-medium app-color-price cart-price cart-white-space-nowrap cart-product-price cart-price-sign app-text-bold">
                    ${price.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default CartProductRow;
