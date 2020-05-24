import React from 'reactn';
import {shuffle} from 'lodash';

import FlipMove from 'react-flip-move';
import HeaderButtons from './HeaderButtons';
import ProductResult from './ProductResult';
import './SearchResultHandler.css';

/*
Prepares product position and sorting mechanism for each product item.
*/


export default class SearchResultHandler extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        products: props.products,
        view: 'list',
        nameOrder: 'ndesc',
        priceOrder: 'pdesc',
        enterLeaveAnimation: 'accordianHorizontal',
        inProgress: false,
      };

      this.toggleNameSort  = this.toggleNameSort.bind(this);
      this.togglePriceSort  = this.togglePriceSort.bind(this);
      this.toggleGrid  = this.toggleGrid.bind(this);
      this.toggleList  = this.toggleList.bind(this);
    }

    toggleList() {
      this.setState({
        view: 'list',
        enterLeaveAnimation: 'accordianVertical',
      });
    }

    toggleGrid() {
      this.setState({
        view: 'grid',
        enterLeaveAnimation: 'accordianHorizontal',
      });
    }

    toggleNameSort() {
      const {nameOrder, products} = this.state;
      const sortNameAsc  = (a, b) => a.name.localeCompare(b.name);
      const sortNameDesc = (a, b) => b.name.localeCompare(a.name);
      this.setState({
        nameOrder: (nameOrder === 'nasc' ? 'ndesc' : 'nasc'),
        products: products.sort(nameOrder === 'nasc' ? sortNameDesc : sortNameAsc),
      });
    }

    togglePriceSort() {
      const {priceOrder, products} = this.state;
      const sortPriceAsc  = (a, b) => a.price-b.price;
      const sortPriceDesc = (a, b) => b.price-a.price;
      this.setState({
        priceOrder: (priceOrder === 'pasc' ? 'pdesc' : 'pasc'),
        products: products.sort(priceOrder === 'pasc' ? sortPriceDesc : sortPriceAsc),
      });
    }

    renderProducts() {
      const { view, products } = this.state;
      return products.map((product) =>
          <ProductResult key={product.id} view={view} {...product} />
      );
    }

    sortShuffle() {
      const {products} = this.state;
      this.setState({
        sortingMethod: 'shuffle',
        products: shuffle(products),
      });
    }

    render() {
      const { view, nameOrder, priceOrder, sortingMethod } = this.state;
      return (
        <div id="shuffle" className={view}>
          <HeaderButtons
            view = {view}
            nameOrder = {nameOrder}
            priceOrder = {priceOrder}
            sortingMethod = {sortingMethod}
            listClickHandler = {this.toggleList}
            gridClickHandler = {this.toggleGrid}
            nameSortClickHandler = {this.toggleNameSort}
            priceSortClickHandler = {this.togglePriceSort}
            shuffleClickHandler = {this.sortShuffle}
          />
          <div className="dropdown-spacer" style={{ height: 10 }} />
          <ul className="result-space">
            <FlipMove
              staggerDurationBy="30"
              duration={500}>
              { this.renderProducts() }
            </FlipMove>
          </ul>
        </div>
      );
    }
}
