import React, { Component } from 'react';
import CheckoutProductRow from "./CheckoutProductRow";
import PlaceOrderRow from "./PlaceOrderRow";
import PlaceOrderColumn from "./PlaceOrderColumn";

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.location.state.response,
    }
  }

  componentDidMount() {
    console.log(this.state);
  }


  render() {
    const {cart, products, shipping, taxes, subtotal, total} = this.state;
    const productList = products.map(product => {
      return (<CheckoutProductRow key={product.id} {...product} cart={cart} />)
    });
    return (
        <div className="app-container app-page-container">
          <div className="app-fixed-right-grid">
            <div className="app-fixed-right-grid-inner" style={{'paddingRight':'290px'}}>
              <div className="app-fixed-right-grid-col app-col-left" style={{'paddingRight':'3.5%','float':'left'}}>
                <div className="app-box">
                  <div className="app-box-inner">
                    {productList}
                  </div>
                  <div className="app-box-inner">
                    <PlaceOrderRow total={total}/>
                  </div>
                </div>
              </div>
              <div className="app-fixed-right-grid-col app-col-right" style={{'width':'290px','marginRight':'-290px','float':'left'}}>
                <PlaceOrderColumn />
              </div>
            </div>
          </div>
        </div>
    )
  }
}