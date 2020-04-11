import React from 'react';
import PropTypes from 'prop-types';
import SortButton from './Buttons/SortButton.js';

// import './HeaderButtons.css';

const propTypes = {
  view: PropTypes.string,
  order: PropTypes.string,
  sortingMethod: PropTypes.string,
  sortClickHandler: PropTypes.func,
};

class HeaderButtons extends React.Component {
  render() {
    const { nameOrder, priceOrder, sortingMethod, nameSortClickHandler, priceSortClickHandler } = this.props;

    return (
      <header>
        <div className = "abs-right">
          <SortButton
            clickHandler = {nameSortClickHandler}
            order = {nameOrder}
            active = {sortingMethod === 'chronological'}
          />
          {' '}
          <SortButton
            clickHandler = {priceSortClickHandler}
            order = {priceOrder}
            active = {sortingMethod === 'chronological'}
          />
        </div>
      </header>
    );
  }
}

HeaderButtons.propTypes = propTypes;

export default HeaderButtons;
