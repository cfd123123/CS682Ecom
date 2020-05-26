import React from 'reactn';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import ProductService from "../services/ProductService"
import CategoryService from "../services/CategoryService"

/**
 * This component is used to create or edit products. After the user is done
 * entering product information, the details are sent to the backend for
 * processing.<br>
 *   This component should only be accessible by employees and admins.
 */
class CreateOrEdit extends React.PureComponent {
  /**
   * Constructs this component with initial state values.
   */
  constructor(props) {
    super(props);
    /**
     * name - the name of the product<br>
     * shortDescription - a short description of the product<br>
     * longDescription - a longer description of the product<br>
     * price - the price of the product<br>
     * quantity - how many of this product are available for purchase?<br>
     * category - temporary variable to store a category name as it's entered by the user<br>
     * categories - an array to store all categories to which this product belongs<br>
     * categoryList - a temporary array to store user input of categories<br>
     * image - a URL string pointing to an image of this product
     */
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

  /**
   * Processes when the user edits product information, updating this component's state.
   * @param event that triggered this function
   */
  onChange = (event) => {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState({...newState});
  };

  /**
   * If the user removes a category by clicking the X next to its name, this
   * function removes that category from the array of categories.
   * @param event that triggered this function
   */
  onClose = (event) => {
    let newState = {};
    newState['categoryList'] = this.state['categoryList'].filter( c => c !== event.target.name);
    newState['categories'] = this.state['categoryList'].filter( c => c !== event.target.name);
    this.setState({...newState});
  };

  /**
   * This function will trigger as the user types in the category field. If
   * a comma is typed it will add the typed category to the array of
   * categories
   * @param event that triggered this function
   */
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

  /**
   * Submits the entered information to the backed. If a new product is being
   * created, the {@link ProductService#addProduct} function is called. If
   * a product is being edited, the {@link ProductService#updateProduct}
   * function is called instead.
   * @param event that triggered this function
   */
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
      ProductService.addProduct(this.state).then(
          result => {
            this.props.history.push("Result?content=");
          }
      );
    }
  };

  /**
   * If a product is to be edited instead of created, this function calls the
   * {@link ProductService#getSingleProduct} function to get the
   * details of an existing product.
   */
  getExistingProduct = () => {
    ProductService.getSingleProduct(this.props.match.params.id).then(
        response => {
          this.setState({...response.data, edit: true});
          this.parseCategories();
        },
        error => alert(error)
    );
  };

  /**
   * Calls the {@link CategoryService#getListOfCategories} function to get the
   * category names associated with the category ids stored in a product object.
   */
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

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
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
export default CreateOrEdit;