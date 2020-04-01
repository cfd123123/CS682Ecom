import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Dropdown from 'react-dropdown';
import FlipMove from 'react-flip-move';
import {shuffle} from 'lodash';

import HeaderButtons from './HeaderButtons.js';
import ProductResult from './ProductResult.js';

import Toggle from './Buttons/Toggle.js';

class SearchResultHandler extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        products: [],
        view: 'list',
        nameOrder: 'nasc',
        priceOrder: 'pasc',
        enterLeaveAnimation: 'accordianHorizontal',
        inProgress: false,
      };

      this.toggleNameSort  = this.toggleNameSort.bind(this);
      this.togglePriceSort  = this.togglePriceSort.bind(this);
      this.toggleGrid  = this.toggleGrid.bind(this);
      this.toggleList  = this.toggleList.bind(this);
    }

    toggleNameSort() {
      const sortNameAsc  = (a, b) => a.toString().localeCompare(b);
      const sortNameDesc = (a, b) => b.toString().localeCompare(a);

      this.setState({
        nameOrder: (this.state.nameOrder === 'nasc' ? 'ndesc' : 'nasc'),
        products: this.state.products.sort(this.state.nameOrder === 'nasc' ? sortNameDesc : sortNameAsc),
      });
    }

    togglePriceSort() {
      const sortPriceAsc  = (a, b) => a-b;
      const sortPriceDesc = (a, b) => b-a;

      this.setState({
        priceOrder: (this.state.priceOrder === 'pasc' ? 'pdesc' : 'pasc'),
        products: this.state.products.sort(this.state.priceOrder === 'pasc' ? sortPriceDesc : sortPriceAsc),
      });
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
      axios.get('/products')
          .then(res => {
            this.setState({ products: res.data });
          });
    }

    renderProducts() {
      const { view } = this.state;

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
          <ul>
            <FlipMove
              staggerDurationBy="30"
              duration={500}
              onFinishAll={() => {
                // TODO: Remove the setTimeout, when the bug is fixed.
                setTimeout(() => this.setState({ inProgress: false }), 1);
              }}>
              { this.renderProducts() }
            </FlipMove>
          </ul>
        </div>
      );
    }
}

export default SearchResultHandler;
