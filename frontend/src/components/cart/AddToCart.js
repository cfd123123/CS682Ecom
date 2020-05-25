import React from 'reactn';
import {Button} from 'reactstrap';

/**
 * Component used for adding Products to the shopping cart.
 */
class AddToCart extends React.PureComponent {
  /**
   * Constructs a new AddToCart component with a default quantity of 1.
   *
   * @param {function} props - A callable function that accepts an integer value
   * argument and adds that many of a product to the shopping cart
   */
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    });
  }

  handleClick() {
    console.log("calling addToCart prop");
    this.props.addToCart(this.state.quantity);
  }

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