import React from 'reactn';
import PropTypes from 'prop-types';
import SortButton from './Buttons/SortButton.js';

/**
 * Props include:<br>
 * >  view - arrange results as a list or a grid?<br>
 * >  order - order by price or by name?<br>
 * >  sortingMethod - sort in ascending or descending order?<br>
 * >  sortClickHandler - handles clicks on the sort button
 * @memberOf HeaderButtons
 */
const propTypes = {
  view: PropTypes.string,
  order: PropTypes.string,
  sortingMethod: PropTypes.string,
  sortClickHandler: PropTypes.func,
};

/**
 * This component renders the {@link SortButton} and is itself rendered by
 * the {@link SearchRsultHandler} component.
 */
class HeaderButtons extends React.PureComponent {
  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
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
