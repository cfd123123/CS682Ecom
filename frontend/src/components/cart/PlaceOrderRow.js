import React, { Component } from 'react';

export default class PlaceOrderRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      ...this.props,
    };
  }

  render() {
    const {total, placeOrder} = this.state;
    return(
        <div className="app-section app-inline-container">
          <div className="app-section app-inline-container-left">
            <span id="cart-place-order-button" className="app-button  app-place-order-button-height app-button-primary">
              <span className="app-button-inner">
                <span className="app-button-text">
                  <span className="app-place-order-button-height">
                    Place your order
                  </span>
                </span>
              </span>
            </span>
          </div>
          <div className="app-section app-inline-container-right">
            <span className="cart-order-summary">
              <span className="app-size-medium app-color-price app-text-bold">
                Order total:{" $"}{total}
              </span>
            </span>
            <span className="app-place-order-condition">
              <br />
              <span className="app-size-mini app-color-secondary">
                By placing your order, you agree to Company Name's privacy notice and conditions of use.
              </span>
            </span>
          </div>
        </div>
    );
  }
}