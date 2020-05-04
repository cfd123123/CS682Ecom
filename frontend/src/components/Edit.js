import React from 'reactn';
import { Link } from 'react-router-dom';
import ProductService from "../services/product.service"
import {Button} from "reactstrap";

export default class Edit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      shortDescription: '',
      longDescription: '',
      price: '',
      quantity: '',
      category: '',
      categoryList: [],
      image: ''
    };
  }

  componentDidMount() {
    ProductService.getSingleProduct(this.props.match.params.id).then(
        response => this.setState({...response.data}),
        error    => alert(error)
    );
  }

  onChange = (event) => {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState({...newState});
  };

  onSubmit = (e) => {
    e.preventDefault();
    ProductService.updateProduct(this.state).then(result => {
      this.props.history.push("/show/"+this.props.match.params.id)
    });
  };

  onClose = (event) => {
    let newState = {};
    newState['categoryList'] = this.state['categoryList'].filter( c => c !== event.target.name);
    this.setState({...newState});
  };

  render() {
    if (!this.state) { return null; }
    const {id, name, shortDescription, longDescription, price, quantity, categories, image} = this.state;
    return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                EDIT Product
              </h3>
            </div>
            {id &&
            <div className="panel-body">
              <h4><Link to={'/'}>Product List</Link></h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name"/>
                </div>
                <div className="form-group">
                  <label htmlFor="shortDescription">ShortDescription:</label>
                  <input type="text" className="form-control" name="shortDescription" value={shortDescription}
                         onChange={this.onChange} placeholder="ShortDescription"/>
                </div>
                <div className="form-group">
                  <label htmlFor="longDescription">LongDescription:</label>
                  <input type="text" className="form-control" name="longDescription" value={longDescription}
                         onChange={this.onChange} placeholder="LongDescription"/>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input type="text" className="form-control" name="price" value={price} onChange={this.onChange} placeholder="Price"/>
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity:</label>
                  <input type="text" className="form-control" name="quantity" value={quantity} onChange={this.onChange} placeholder="Quantity"/>
                </div>
                <ul>
                  {categories.map((tag) => (
                      <li key={tag}><Button variant="secondary" onClick={this.onClose} size="sm" name={tag}>{tag} &times;</Button></li>
                  ))}
                </ul>
                <div className="form-group">
                  <label htmlFor="categories">Categories:</label>
                  <input type="text" className="form-control" name="categories" value={categories} onChange={this.onChange} placeholder="Categories"/>
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity:</label>
                  <input type="text" className="form-control" name="quantity" value={quantity} onChange={this.onChange} placeholder="Quantity"/>
                </div>
                <button type="submit" className="btn btn-default">Update</button>
              </form>
            </div>
            }
          </div>
        </div>
    );
  }
}
