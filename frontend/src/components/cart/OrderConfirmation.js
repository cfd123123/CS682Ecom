import React, { Component } from 'react';
import {CurrentUserContext} from "../../CurrentUserContext";

export default class OrderConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.location.state.order,
    }
  }

  // componentDidMount() {
  //   console.log(this.state);
  // }

  render() {
    const {orderDate, id, products, subtotal, taxes, shipping, total} = this.state.order;
    return(
        <div>
          <div>
            <header className="jumbotron">
              <h3><strong>Order Confirmation</strong></h3>
            </header>
            <p /><strong>Order Number:</strong>{" "}{id}
            <p /><strong>Order Date:</strong>{" "}{orderDate}
            <p /><strong>Ordered Products:</strong>{" "} {Object.entries(products).map(([k,v]) =><div key={k}>{k}: {v}</div>)}
            <p /><strong>Order Subtotal:</strong>{" "}{subtotal}
            <p /><strong>Taxes:</strong>{" "} {Object.entries(taxes).map(([k,v]) =><div key={k}>{k}: {v}</div>)}
            <p /><strong>Shipping:</strong>{" "} {Object.entries(shipping).map(([k,v]) =><div key={k}>{k}: {v}</div>)}
            <p /><strong>Order Total:</strong>{" "}{total}
          </div>
        </div>
    )
  }
}
OrderConfirmation.contextType = CurrentUserContext;