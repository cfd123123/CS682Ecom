import React from 'reactn';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import ProductService from "../services/ProductService"
import CategoryService from "../services/CategoryService"

/*
Creates product to be sent to backend.
*/

export default class Create extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      shortDescription: '',
      longDescription: '',
      price: '',
      quantity: '',
      category: '',
      categories: [],
      categoryList: [],
      image: ''
    };
  }

//Triggers when input box is updated
  onChange = (event) => {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState({...newState});
  };

  onClose = (event) => {
    let newState = {};
    newState['categoryList'] = this.state['categoryList'].filter( c => c !== event.target.name);
    newState['categories'] = this.state['categoryList'].filter( c => c !== event.target.name);
    this.setState({...newState});
  };

//Displays category tags when adding in the Category input box
  addCategories = (event) => {
    let newState = {};
    if(event.target.value.substr(-1) === ",") {
      let newCategory = event.target.value.replace(",","");
      if (!this.state['categoryList'].includes(newCategory)) {
        newState['categoryList'] = this.state['categoryList'].concat(newCategory);
      }
      if (!this.state['categories'].includes(newCategory)) {
        newState['categories'] = this.state['categories'].concat(newCategory);
      }
      newState[event.target.name] = '';
    } else {
      newState[event.target.name] = event.target.value;
    }
    this.setState({...newState});
  };

//Final trigger to send product info to database, reads all values in input boxes to construct a product.
  onSubmit = (event) => {
    event.preventDefault();
    const {edit} = this.state;
    if (edit) {
      ProductService.updateProduct(this.state).then(
          result => {
            this.props.history.goBack();
          }
      );
    } else {
      alert("Remove this alert if the product saves correctly (Create.js)");
      ProductService.addProduct(this.state).then(
          result => {
            this.props.history.push("Result?content=");
          }
      );
    }
  };

  getExistingProduct = () => {
    ProductService.getSingleProduct(this.props.match.params.id).then(
        response => {
          this.setState({...response.data, edit: true});
          this.parseCategories();
        },
        error => alert(error)
    );
  };

  parseCategories = () => {
    const {categories} = this.state;
    if (categories) {
      CategoryService.getListOfCategories(categories).then(
          response => {
            this.setState({
              categoryList: response.data.map((category) => category.name)
            });
          },
          error => alert(error)
      );
    }
  };

  render() {
    if (!this.state.id && this.props.match.path.substr(1,4) === "edit") {
      this.getExistingProduct();
      return null;
    }
    const { name, shortDescription, longDescription, price, quantity, category, image, categoryList, edit } = this.state;
    return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{edit ? "EDIT " : "ADD "}PRODUCT</h3>
            </div>
            <div className="panel-body">
              <h4><Link to="/Home">Products List</Link></h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="isbn">Name:</label>
                  <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Product Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Short Description:</label>
                  <input type="text" className="form-control" name="shortDescription" value={shortDescription} onChange={this.onChange} placeholder="This description appears on the product list" />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Long Description:</label>
                  <input type="text" className="form-control" name="longDescription" value={longDescription} onChange={this.onChange} placeholder="This description appears on the product's page" />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Price:</label>
                  <input type="number" className="form-control" name="price" value={price} onChange={this.onChange} placeholder="Price per item" />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Quantity:</label>
                  <input type="number" className="form-control" name="quantity" value={quantity} onChange={this.onChange} placeholder="Quantity" />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Product Image:</label>
                  <input type="text" className="form-control" name="image" value={image} onChange={this.onChange} placeholder="Image URL" />
                </div>

                <ul>
                  {categoryList.map((tag) => (
                    <li key={tag}><Button variant="secondary" onClick={this.onClose} size="sm" name={tag}>{tag} &times;</Button></li>
                  ))}
                </ul>

                <div className="form-group">
                  <label htmlFor="author">Category:</label>
                  <input type="text[]" className="form-control" name="category" value={category} onChange={this.addCategories} placeholder="Category" />
                </div>
                <button type="submit" className="btn btn-default">{edit ? "Update" : "Submit"}</button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}
