import React, { Component } from 'react';
import CheckoutProductRow from "./CheckoutProductRow";
import PlaceOrderRow from "./PlaceOrderRow";
import PlaceOrderColumn from "./PlaceOrderColumn";
import UserService from "../../services/user.service";

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.placeOrder = this.placeOrder.bind(this);
    this.state = {
      ...this.props.location.state.response,
    }
  }

  // componentDidMount() {
  //   console.log(this.state);
  // }

  placeOrder() {
    const {preOrder} = this.state;
    UserService.placeOrder(preOrder).then(
        response => {
          const newUser = (response.data.user);
          UserService.updateCurrentUser(newUser);
          this.props.history.push({
            pathname: '/confirm',
            state: { order: response.data.order },
          });
        },
        error => {
          console.log(error);
        }
    );
  }


  render() {
    const {cart, products, shippingCost, taxCost, subtotal, total, itemCount} = this.state;
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
                    <PlaceOrderRow total={total}placeOrder={this.placeOrder}/>
                  </div>
                </div>
              </div>
              <div className="app-fixed-right-grid-col app-col-right" style={{'width':'290px','marginRight':'-290px','float':'left'}}>
                <PlaceOrderColumn placeOrder={this.placeOrder} total={total} itemCount={itemCount} shippingCost={shippingCost} subTotal={subtotal} taxCost={taxCost} />
              </div>
            </div>
          </div>
        </div>
    )
  }
}