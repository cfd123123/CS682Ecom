import React from 'reactn';
import PropTypes from 'prop-types';
import SortButton from './Buttons/SortButton.js';

/*
Functionality for the buttons on the top of results page. For example the sort buttons.
*/

const propTypes = {
  view: PropTypes.string,
  order: PropTypes.string,
  sortingMethod: PropTypes.string,
  sortClickHandler: PropTypes.func,
};

export default class HeaderButtons extends React.PureComponent {
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
