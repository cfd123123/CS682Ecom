import React from 'reactn';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './CategoryHeader.css';

export default class CategoryHeader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      categories: undefined
    };
  }

  componentDidMount() {
    axios.get('/category/all').then(
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
