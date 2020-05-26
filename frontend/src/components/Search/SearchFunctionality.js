import React from 'reactn';
import SearchResultHandler from './SearchResultHandler';

/**
 * Filters the products according to the searched term. Is called by results.js
*/

export default class SearchFunctionality extends React.PureComponent {
  render() {
    const {searched, categorySearch, products} = this.props;
    const regex = /[.,]/;
    let results = this.props.products;
    if (!categorySearch || (searched !== "")) {
      results =
          products.filter((product) => (
            /**
             * Handle both upper and lower cases.
            */
              product.name.toLowerCase().indexOf(searched) !== -1) ||
            /**
             * Take into consideration short and long description.
            */
              product.shortDescription.replace(regex, "").split(/ /).map(word => word.toLowerCase()).includes(searched) ||
              product.longDescription.replace(regex, "").split(/ /).map(word => word.toLowerCase()).includes(searched)
          );
    }
    return (<SearchResultHandler products={results} />);
  }
}
