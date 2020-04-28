import React from 'react';
import axios from 'axios';
import {shuffle} from 'lodash';

import FlipMove from 'react-flip-move';
import HeaderButtons from './HeaderButtons';
import ProductResult from './ProductResult';
import './SearchResultHandler.css';

class SearchResultHandler extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        products: [],
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

    componentDidMount() {
      axios.get('/products/all')
          .then(res => {
            this.setState({products: res.data});
          });
    }

    toggleNameSort() {
      const sortNameAsc  = (a, b) => a.name.localeCompare(b.name);
      const sortNameDesc = (a, b) => b.name.localeCompare(a.name);
      this.setState({
        nameOrder: (this.state.nameOrder === 'nasc' ? 'ndesc' : 'nasc'),
        products: this.props.products.sort(this.state.nameOrder === 'nasc' ? sortNameDesc : sortNameAsc),
      });
    }

    togglePriceSort() {
      const sortPriceAsc  = (a, b) => a.price-b.price;
      const sortPriceDesc = (a, b) => b.price-a.price;
      this.setState({
        priceOrder: (this.state.priceOrder === 'pasc' ? 'pdesc' : 'pasc'),
        products: this.props.products.sort(this.state.priceOrder === 'pasc' ? sortPriceDesc : sortPriceAsc),
      });
    }

    renderProducts() {
      const { view } = this.state;

      if(this.state.products !== []) {
          return this.props.products.map((product) => {
            return (
              <ProductResult
                key = {product.id}
                view = {view}
                {...product}
              />
            );
          });
      }
    }

    sortShuffle() {
      this.setState({
        sortingMethod: 'shuffle',
        Products: shuffle(this.state.Products),
      });
    }

    render() {
      const { view, nameOrder, priceOrder, sortingMethod, } = this.state;
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

export default SearchResultHandler;
