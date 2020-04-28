import React, { Component } from 'react';

export default class PlaceOrderColumn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      ...this.props,
    };
  }

  render() {
    const {total, placeOrder, shippingCost, taxCost, itemCount, subTotal} = this.state;
    return(
        <div className="app-box-group" style={{'position':'relative','width':'inherit','top':'0px'}}>
          <div className="app-box app-first">
            <div className="app-box-inner">
              <div className="app-section" role="form">
                <div className="app-row">
                  <div className="app-row app-grid-vertical-align app-grid-center">
                    <div className="app-row">
                      <h3 className="app-spacing-base app-spacing-top-micro">
                        Order Summary
                      </h3>
                      <table className="app-normal app-align-bottom app-spacing-none app-size-small">
                        <tbody>
                        <tr className="small-line-height">
                          <td>
                            <span>Items ({itemCount}):</span>
                          </td>
                          <td className="app-text-right text-nowrap">
                            ${subTotal.toFixed(2)}
                          </td>
                        </tr>
                        <tr className="small-line-height">
                          <td>
                            <span>Shipping:</span>
                          </td>
                          <td className="app-text-right text-nowrap">
                            ${shippingCost.toFixed(2)}
                          </td>
                        </tr>
                        <tr className="separator">
                          <td />
                          <td style={{'width':'23%'}}>
                            <hr className="app-spacing-none" />
                          </td>
                        </tr>
                        <tr className="small-line-height">
                          <td>
                            <span>Total before tax:</span>
                          </td>
                          <td className="app-text-right text-nowrap">
                            ${(subTotal + shippingCost).toFixed(2)}
                          </td>
                        </tr>
                        <tr className="small-line-height">
                          <td>
                            <span>Estimated tax:</span>
                          </td>
                          <td className="app-text-right text-nowrap">
                            ${taxCost.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="separator">
                            <hr className="app-spacing-mini app-divider-normal" />
                          </td>
                        </tr>
                        <tr>
                          <td className="app-color-price app-size-medium app-text-bold">
                            <span>Order total:</span>
                          </td>
                          <td className="app-color-price app-size-medium app-text-right app-text-bold text-nowrap">
                            ${total.toFixed(2)}
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="app-row">
                <hr className="app-spacing-small app-divider-normal"/>
                <div className="app-row app-spacing-top-micro">
                  <div className="app-row">
                    <span className="app-button app-button-span100 app-button-primary app-place-order-button-height app-place-order-button-sky-fix">
                      <span className="app-button-inner">
                        <input name="placeOrder" className="app-button-input" type="button" onClick={placeOrder} />
                        <span className="app-button-text">
                          <span className="app-place-order-button-height">Place your order</span>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="app-row app-spacing-small app-text-center app-condensed-line-height">
                  <span className="app-size-small app-color-secondary">
                    By placing your order, you agree to Company Name's privacy notice and conditions of use.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}