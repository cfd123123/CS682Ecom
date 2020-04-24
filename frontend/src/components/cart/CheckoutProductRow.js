import React, { Component } from 'react';
import './../cart/Cart.css'

export default class CheckoutProductRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props
    }
  }

  render() {
    const {id, name, price, cart} = this.state;
    return(
        <div className="cart-item">
          <div className="app-row">
            <div className="app-row app-size-medium">
                <span className="app-color-base app-text-bold">
                  <span>Estimated Delivery: Sometime next year</span>
                </span>
            </div>
          </div>
          <div className="app-row">
            <div className="app-column app-span50">
              <div className="app-row">
                <div className="app-row">
                  <div className="app-row app-spacing-none">
                    <div className="app-fixed-left-grid">
                      <div className="app-fixed-left-grid-inner" style={{'paddingLeft': '96px'}}>
                        <div className="app-fixed-left-grid-col app-col-left" style={{'width':'96px','marginLeft':'-96px','float':'left'}}>
                          Product Image here
                        </div>
                        <div className="app-fixed-left-grid-col app-col-right" style={{'paddingLeft':'0%','float':'left'}}>
                          <div className="app-row text-break app-size-small">
                            <span className="app-text-bold">{name}</span>
                          </div>
                          <div className="app-row">
                            <span className="app-color-price app-text-bold">${price}</span>
                          </div>
                          <div className="app-row">
                            <span>qty: {cart[id]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }

}
