import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import useHistory from 'react-router-dom';
import './CategoryHeader.css';

class CategoryHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    axios.get('/category/all')
        .then(res => {
          this.setState({categories: res.data});
        });

  }

  renderCategories() {
    if(this.state.categories !== []) {
        return (this.state.categories.map((item) => <Link key={item.name} to={`/categoryResult?results=${item.name}`}>{item.name}</Link>))
    }
  }



  render() {
    return (
      <div className="scrollmenu">
        { this.renderCategories() }
      </div>
    );
  }
}

export default CategoryHeader;
