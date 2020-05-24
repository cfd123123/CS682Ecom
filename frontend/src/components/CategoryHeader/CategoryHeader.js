import React from 'reactn';
import {Link} from 'react-router-dom';
import './CategoryHeader.css';
import CategoryService from "../../services/CategoryService"

/*
Automatically lists all available product categories from the database. Individual categories can be clicked to trigger a categorical search.
*/

export default class CategoryHeader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      categories: undefined
    };
  }

  componentDidMount() {
    CategoryService.getAll().then(
        res => this.setState({categories: res.data})
    );
  }

  render() {
    const { categories } = this.state;
    if (!categories) { return null; }

    const renderCategories = categories.map((category) =>
        <Link key={category.name} to={`/categoryResult?results=${category.name}`}>
          {category.name}
        </Link>
    );

    return (
      <div className="scrollmenu">
        { renderCategories }
      </div>
    );
  }
}
