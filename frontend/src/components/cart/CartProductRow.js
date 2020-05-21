import React from 'reactn';
import {Link} from 'react-router-dom';

import './../cart/Cart.css'
import ProductImage from './../img/empty-product-icon.png';

export default class CartProductRow extends React.PureComponent {
  render() {
    const {id, name, price, quantity, image} = this.props;
    let img = (image==='') ? ProductImage : image;

    return (
        <div className="app-row cart-item app-spacing-base app-spacing-top-base cart-list-item cart-list-item-border">
          <div className="app-column app-span85 app-fixed-left-grid app-fixed-left-grid-inner" style={{ 'paddingLeft': '190px' }}>
            <div className="app-fixed-left-grid-col app-float-left cart-product-image app-col-left">
              <Link to={`/show/${id}`}>
                <img src={img} style={{'height':'100%', 'width':'100%'}} alt={"missingID"}/>
              </Link>
            </div>
            <div className="app-fixed-left-grid-col app-col-right cart-product-info">
              <ul className="app-unordered-list app-nostyle app-vertical app-spacing-mini">
                <li className="app-list-item">
                  <a href={`/show/${id}`} className="app-link-normal cart-product-link">
                    <span className="app-size-medium cart-product-title">
                      {name}
                    </span>
                  </a>
                </li>
                <li className="app-list-item">
                    Quantity: {quantity}
                </li>
              </ul>
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
    );
  }
}
