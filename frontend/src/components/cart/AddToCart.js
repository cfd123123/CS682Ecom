import React from 'reactn';
import {Button} from 'reactstrap';

export default class AddToCart extends React.PureComponent {
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
