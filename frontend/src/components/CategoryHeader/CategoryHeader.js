import React from 'react';
import axios from 'axios';
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
        return (this.state.categories.map((item) => <a key={item.name}>{item.name}</a>))
    }
  }

  render() {
    console.log(this.state.categories);
    return (
      <div className="scrollmenu">
        { this.renderCategories() }
      </div>
    );
  }
}

export default CategoryHeader;
