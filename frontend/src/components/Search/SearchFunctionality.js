import React from 'reactn';
import SearchResultHandler from './SearchResultHandler';

/**
 * This component filters products according to a search term.
 */
class SearchFunctionality extends React.PureComponent {
  /**
   * @param props {object} Props include:<br>
   * >  searched - the search term used, and the string to be used in filtering<br>
   * >  categorySearch - is this search a category search or a product search?<br>
   * >  products - the products to filter
   */
  constructor(props) {
    super(props);
    this.state = {
      fakeStateVar: undefined
    }
  }
  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
  render() {
    const {searched, categorySearch, products} = this.props;
    const regex = /[.,]/;
    let results = this.props.products;
    if (!categorySearch || (searched !== "")) {
      results =
          products.filter((product) => (
            /** Handle both upper and lower cases. */
              product.name.toLowerCase().indexOf(searched) !== -1) ||
            /** Take into consideration short and long description. */
              product.shortDescription.replace(regex, "").split(/ /).map(word => word.toLowerCase()).includes(searched) ||
              product.longDescription.replace(regex, "").split(/ /).map(word => word.toLowerCase()).includes(searched)
          );
    }
    return (<SearchResultHandler products={results} />);
  }
}
export default SearchFunctionality;