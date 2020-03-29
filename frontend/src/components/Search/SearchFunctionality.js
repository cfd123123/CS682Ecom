import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class SearchFunctionality extends Component {
  constructor(props) {
    super(props);
    this.state = {isEmptySearch: true};
  }

  render() {
    const isEmptySearch = this.state.isEmptySearch;
    const searched = this.props.content;
    let results;

    if (searched == "") {
      results = this.props.products;
    }
    else {
      results =
        this.props.products.filter((searchedItem)=>
          (searchedItem.name.indexOf(searched)>=0) ||
           searchedItem.shortDescription.split("").map(w => w.toLowerCase()).includes(searched) ||
           searchedItem.longDescription.split("").map(w => w.toLowerCase()).includes(searched) ||
           searchedItem.shortDescription.split(" ").map(w => w.toLowerCase()).includes(searched) ||
           searchedItem.longDescription.split(" ").map(w => w.toLowerCase()).includes(searched)
          );
    }

    return (
        results.map (
          (c)=>
          <tr>
          <td>{c.name}</td>
          <td>{c.shortDescription}</td>
          <td>{c.price}</td>
          <td>{c.quantity}</td>
          <td><Link to={`/show/${c.id}`} ><Button variant="outline-info" size="sm">View</Button></Link></td>
        </tr>)
    );

  }
}

export default SearchFunctionality;
