import React from 'reactn';
import './../cart/Cart.css'
import ProductImage from "../img/empty-product-icon.png";

export default class CheckoutProductRow extends React.PureComponent {
  render() {
    const {id, name, price, cart, image} = this.props;
    let img = (image==='') ? ProductImage : image;

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
                          <img src={img} style={{'height':'100%', 'width':'100%'}} alt={"none"}/>
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
