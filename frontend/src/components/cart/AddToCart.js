import React from 'reactn';
import {Button} from 'reactstrap';

/**
 * Component used for adding Products to the shopping cart. This component
 * contains a button and an input box where the user can enter a quantity of
 * the item they want to add to their cart.
 */
class AddToCart extends React.PureComponent {
  /**
   * Constructs a new AddToCart component with a default quantity of 1.
   *
   * @param {props} props - props should contain a callable function `addToCart`
   * that accepts an integer value argument and adds that many of a product to
   * the shopping cart
   * @hideconstructor
   */
  constructor(props) {
    super(props);
    /**
     * quantity - how many items to add to the cart
     */
    this.state = {
      quantity: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Updates quantity in this component's state.
   *
   * @param {event} event the event that triggered this function call
   */
  handleChange(event) {
    this.setState({
      quantity: event.target.value
    });
  }

  /**
   * Calls the addToCart prop, passing quantity.
   *
   * @param {event} event the event that triggered this function call
   */
  handleClick() {
    // console.log("calling addToCart prop");
    this.props.addToCart(this.state.quantity);
  }

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
  render() {
    return (
        <div>
          <input type="number" value={this.state.quantity} onChange={this.handleChange} />
          <Button onClick={this.handleClick}>Add to cart</Button>
        </div>
    );
  }
}
export default AddToCart;