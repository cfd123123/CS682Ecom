import React from 'reactn';

/**
 * Component used to display a user's cart total with a button to begin the
 * checkout process. This component is rendered inside the {@link Cart}
 * component.
 */
class ProceedToCheckout extends React.PureComponent {
  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
  render() {
    const {loggedIn, total, count, proceedToCheckout} = this.props;
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
                    {count}{" "}item Subtotal:{" "}
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
export default ProceedToCheckout;