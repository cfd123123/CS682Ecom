import React from 'reactn';

/**
 * Top level component that is the order confirmation page a user sees after
 * placing their order. Users get to this page after clicking on the
 * {@link Checkout#placeOrder} button.
 * <p>
 *   WARNING: This page is incomplete and only shows the basic information from
 *   the order.
 * </p>
 */
class OrderConfirmation extends React.PureComponent {
  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
  render() {
    const {orderDate, id, products, subtotal, taxes, shipping, total} = this.props.location.state.order;
    const orderedProducts = Object.entries(products).map(([k,v]) =><div key={k}>{k}: {v}</div>);
    return(
        <div>
          <div>
            <header className="jumbotron">
              <h3><strong>Order Confirmation</strong></h3>
            </header>
            <p /><strong>Order Number:</strong>{" "}{id}
            <p /><strong>Order Date:</strong>{" "}{orderDate}
            <p /><strong>Ordered Products:</strong>{" "} {orderedProducts}
            <p /><strong>Order Subtotal:</strong>{" "}{subtotal}
            <p /><strong>Taxes:</strong>{" "} {Object.entries(taxes).map(([k,v]) =><div key={k}>{k}: {v}</div>)}
            <p /><strong>Shipping:</strong>{" "} {Object.entries(shipping).map(([k,v]) =><div key={k}>{k}: {v}</div>)}
            <p /><strong>Order Total:</strong>{" "}{total}
          </div>
        </div>
    )
  }
}
export default OrderConfirmation;