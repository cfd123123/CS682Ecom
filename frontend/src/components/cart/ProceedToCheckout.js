import React, { Component } from 'react';
import {Button} from 'reactstrap';

export default class ProceedToCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      ...this.props,
    };
  }

  render() {
    const {loggedIn, total, count, proceedToCheckout} = this.state;

    return (
        <div id="cart-checkout-box" className="app-section app-spacing-none">
          <form id="cartCheckoutForm" onSubmit={proceedToCheckout}>
            <div className="app-box-group cart-checkout-box-group">
              <div className="app-box app-color-alternate-background cart-checkout-box-inner-box">
                <div className="app-box-inner">
                  <div className="app-row app-spacing-mini">
                    <span id="cart-subtotal-label-checkout" className="app-size-medium cart-number-of-items">
                      Subtotal ({count}{" "}items):{" "}
                    </span>
                    <span id="cart-subtotal-amount-checkout" className="app-color-price cart-price-container app-text-bold">
                      <span className="app-size-medium app-color-price cart-price cart-white-space-nowrap cart-price-sign">
                        ${total.toFixed(2)}
                      </span>
                    </span>
                  </div>
                  <span id="cart-checkout-box-button" className="app-button app-button-normal app-button-span100 app-button-primary">
                    <span className="app-button-inner">
                      {loggedIn ? (
                          <Button type="button" onClick={proceedToCheckout} />
                          // <input name="proceedToCheckout" className="app-button-input" type="submit" value="Proceed to checkout" />
                      ) : (
                          <input name="proceedToCheckout" className="app-button-input" type="submit" value="Log in to checkout" />
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
    );
  }
}
