import React from 'reactn';

export default class OrderConfirmation extends React.PureComponent {
  render() {
    const {orderDate, id, products, subtotal, taxes, shipping, total} = this.props.location.state.order;
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
