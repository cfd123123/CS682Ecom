import React from 'react';
import {Button} from 'reactstrap';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      quantity: e.target.value
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
