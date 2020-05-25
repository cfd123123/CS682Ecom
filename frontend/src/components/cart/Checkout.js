import React from 'reactn';
import CheckoutProductRow from "./CheckoutProductRow";
import PlaceOrderRow from "./PlaceOrderRow";
import PlaceOrderColumn from "./PlaceOrderColumn";
import UserService from "../../services/UserService";

/**
 * Top level component that is the checkout page a user sees after beginning
 * the checkout process, but before placing their order. Users get to this page
 * after clicking on the {@link ProceedToCheckout} button.
 */
class Checkout extends React.PureComponent {
  /**
   * Constructs this checkout component using the passed in props. The
   * constructor also binds the {@link placeOrder} method to this component.
   *
   * @param props {object} the PreOrderResponse from the backend
   */
  constructor(props) {
    super(props);
    this.placeOrder = this.placeOrder.bind(this);
    /**
     * props.location.state.response:<br>
     * >  username - the user's username<br>
     * >  preOrder - the ID for the PreOrder containing the items in the user's cart<br>
     * >  cart - the set of product/quantity pairs in the user's cart<br>
     * >  products - the list of products in the PreOrder<br>
     * >  taxes - the taxes breakdown for the PreOrder<br>
     * >  shipping - the shipping charges breakdown for the PreOrder<br>
     * >  itemCount - the count of items in the PreOrder<br>
     * >  subTotal - the PreOrder's subtotal before taxes and shipping<br>
     * >  shippingCost - the PreOrder's total shipping cost<br>
     * >  taxCost - the PreOrder's total taxes<br>
     * >  total - the PreOrder's total price
     */
    this.state = {
      ...this.props.location.state.response,
    }
  }

  /**
   * Calls the {@link UserService#placeOrder} function passing in the PreOrder
   * ID. If placing the order is successful, this function moves the user to
   * the {@link OrderConfirmation} page.
   */
  placeOrder() {
    const {preOrder} = this.state;
    UserService.placeOrder(preOrder).then(
        response => {
          // the global user data will update to reflect the placed order
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

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
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
                    <PlaceOrderRow total={total} placeOrder={this.placeOrder}/>
                  </div>
                </div>
              </div>
              <div className="app-fixed-right-grid-col app-col-right"
                   style={{'width':'290px','marginRight':'-290px','float':'left'}}>
                <PlaceOrderColumn placeOrder={this.placeOrder} total={total} itemCount={itemCount}
                                  shippingCost={shippingCost} subTotal={subtotal} taxCost={taxCost} />
              </div>
            </div>
          </div>
        </div>
    )
  }
}
export default Checkout;