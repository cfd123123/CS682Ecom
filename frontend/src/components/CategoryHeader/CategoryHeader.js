import React from 'reactn';
import {Link} from 'react-router-dom';
import './CategoryHeader.css';
import CategoryService from "../../services/CategoryService"

/**
 * Automatically lists all available product categories from the database.
 * Individual categories can be clicked to trigger a categorical search.
 */
class CategoryHeader extends React.PureComponent {
  /**
   * Constructs this component with initial state variables.
   */
  constructor(props) {
    super(props);

    /**
     * categories - the list of available categories
     */
    this.state = {
      categories: undefined
    };
  }

  /**
   * After the component mounts, this function calls the
   * {@link CategoryService#getAll} function, which gets the list of categories
   * from the backend, then updates this components state with the returned list.
   */
  componentDidMount() {
    CategoryService.getAll().then(
        res => this.setState({categories: res.data})
    );
  }

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
  render() {
    const { categories } = this.state;
    if (!categories) { return null; }

    // construct the category elements
    const renderCategories =
        (categories && categories.length > 0)
            ?
            categories.map((category) =>
                <Link key={category.name} to={`/categoryResult?results=${category.name}`}>
                  {category.name}
                </Link>)
            :
            // If there are no categories, this creates an All Products link instead
            <Link key='allProducts' to='/Result?searched='>All Products</Link>;

    return (
      <div className="scrollmenu">
        { renderCategories }
      </div>
    );
  }
}
export default CategoryHeader;