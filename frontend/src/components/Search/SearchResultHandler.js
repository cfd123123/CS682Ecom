import React from 'reactn';
import {shuffle} from 'lodash';
import FlipMove from 'react-flip-move';
import HeaderButtons from './HeaderButtons';
import ProductResult from './ProductResult';
import './SearchResultHandler.css';

/**
 * Prepares product position and sorting mechanism for each product item.
 */
class SearchResultHandler extends React.PureComponent {
  /**
   * Constructs this component with the given props, assigns default state
   * values, and binds the toggleNameSort, togglePriceSort, toggleGrid, and
   * toggleList functions to this component.
   * @param props {object} - the only prop should be products, a list of
   * product objects.
   */
  constructor(props) {
    super(props);

    /**
     * products - a list of product objects<br>
     * view - will search results be viewed as a grid or as a list<br>
     * nameOrder - will the search results be ordered by name?<br>
     * priceOrder - will the search results be ordered by price?<br>
     * enterLeaveAnimation - how will re-sorting be animated? Default: accordianHorizontal<br>
     * inProgress - is sorting in progress?
     */
    this.state = {
      products: props.products,
      view: 'list',
      nameOrder: 'ndesc',
      priceOrder: 'pdesc',
      enterLeaveAnimation: 'accordianHorizontal',
      inProgress: false,
    };

    this.toggleNameSort = this.toggleNameSort.bind(this);
    this.togglePriceSort = this.togglePriceSort.bind(this);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  /**
   * Sets the view and enterLeaveAnimation state variables to list and vertical
   */
  toggleList() {
    this.setState({
      view: 'list',
      enterLeaveAnimation: 'accordianVertical',
    });
  }

  /**
   * Sets the view and enterLeaveAnimation state variables to grid and horizontal
   */
  toggleGrid() {
    this.setState({
      view: 'grid',
      enterLeaveAnimation: 'accordianHorizontal',
    });
  }

  /**
   * Toggles between ascending and descending order by name.
   */
  toggleNameSort() {
    const {nameOrder, products} = this.state;
    const sortNameAsc = (a, b) => a.name.localeCompare(b.name);
    const sortNameDesc = (a, b) => b.name.localeCompare(a.name);
    this.setState({
      nameOrder: (nameOrder === 'nasc' ? 'ndesc' : 'nasc'),
      products: products.sort(nameOrder === 'nasc' ? sortNameDesc : sortNameAsc),
    });
  }

  /**
   * Toggles between ascending and descending order by price.
   */
  togglePriceSort() {
    const {priceOrder, products} = this.state;
    const sortPriceAsc = (a, b) => a.price - b.price;
    const sortPriceDesc = (a, b) => b.price - a.price;
    this.setState({
      priceOrder: (priceOrder === 'pasc' ? 'pdesc' : 'pasc'),
      products: products.sort(priceOrder === 'pasc' ? sortPriceDesc : sortPriceAsc),
    });
  }

  /**
   * Produces a list of {@link ProductResult} elements to be rendered.
   * @returns {ReactElement[]} a list of {@link ProductResult} elements to be rendered.
   */
  renderProducts() {
    const {view, products} = this.state;
    return products.map((product) =>
        <ProductResult key={product.id} view={view} {...product} />
    );
  }

  /**
   * Sets the sortingMethod to shuffle, then shuffles the products.
   */
  sortShuffle() {
    const {products} = this.state;
    this.setState({
      sortingMethod: 'shuffle',
      products: shuffle(products),
    });
  }

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
  render() {
    const {view, nameOrder, priceOrder, sortingMethod} = this.state;
    return (
        <div id="shuffle" className={view}>
          <HeaderButtons
              view={view}
              nameOrder={nameOrder}
              priceOrder={priceOrder}
              sortingMethod={sortingMethod}
              listClickHandler={this.toggleList}
              gridClickHandler={this.toggleGrid}
              nameSortClickHandler={this.toggleNameSort}
              priceSortClickHandler={this.togglePriceSort}
              shuffleClickHandler={this.sortShuffle}
          />
          <div className="dropdown-spacer" style={{height: 10}}/>
          <ul className="result-space">
            <FlipMove
                staggerDurationBy="30"
                duration={500}>
              {this.renderProducts()}
            </FlipMove>
          </ul>
        </div>
    );
  }
}
export default SearchResultHandler;