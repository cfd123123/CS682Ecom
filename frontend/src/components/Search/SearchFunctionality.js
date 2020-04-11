import React, { Component } from 'react';
import SearchResultHandler from './SearchResultHandler';

class SearchFunctionality extends Component {
  constructor(props) {
    super(props);
    this.state = {isEmptySearch: true};
  }

  render() {
    // const isEmptySearch = this.state.isEmptySearch;
    const searched = this.props.content;
    const regex = /[.,]/;
    let results = this.props.products;

    if (searched !== "") {
      results =
        this.props.products.filter((searchedItem)=>
          (searchedItem.name.toLowerCase().indexOf(searched) !== -1) ||
           searchedItem.shortDescription.replace(regex, "").split(/ /).map(w => w.toLowerCase()).includes(searched) ||
           searchedItem.longDescription.replace(regex, "").split(/ /).map(w => w.toLowerCase()).includes(searched)
           /*
           searchedItem.shortDescription.split("").map(w => w.toLowerCase()).includes(searched) ||
           searchedItem.longDescription.split("").map(w => w.toLowerCase()).includes(searched) ||
           searchedItem.shortDescription.split(" ").map(w => w.toLowerCase()).includes(searched) ||
           searchedItem.longDescription.split(" ").map(w => w.toLowerCase()).includes(searched)
           */
          );
    }

    return (
      <SearchResultHandler products={results}/>
    );

  }
}

export default SearchFunctionality;
