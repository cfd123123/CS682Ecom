import React, { Component } from 'react';

export default class ProceedToCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }
  componentDidMount() {
    this.setState({
      proceedToCheckout: this.props.proceedToCheckout,
      total: this.props.total,
      count: this.props.count,
      loggedIn: this.props.loggedIn,
    })
  }

  render() {
    const {loggedIn, total, count, proceedToCheckout} = this.state;
    if (!loggedIn) {
      return null;
    }
    return (
        <div id="cart-checkout-box" className="app-section app-spacing-none">
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
                    <input name="proceedToCheckout" className="app-button-input" type="button" onClick={proceedToCheckout}/>
                    <span className="app-button-text">
                      {loggedIn ? (
                          <div>Proceed to checkout</div>
                    ) : (
                          <div>Log in to checkout</div>
                      )}
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
