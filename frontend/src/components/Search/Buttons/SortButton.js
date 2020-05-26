import React from 'reactn';
import PropTypes from 'prop-types';
import Toggle from './Toggle.js';
import { faChevronCircleUp, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

/**
 * Props include:<br>
 * >  clickHandler - function that handles clicks on the sort-by buttons<br>
 * >  text - the text to display on each sort-by button<br>
 * >  order - an icon to indicate which sorting order is in use<br>
 * >  active - is this sort-by button active or inactive?
 * @memberOf SortButton
 */
const propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string,
  order: PropTypes.string,
  active: PropTypes.bool,
};

/**
 * Default sorting method - Ascending
 * @memberOf SortButton
 */
const defaultProps = {
  order: 'asc',
};

/**
 * Component used to add sorting options to search results.
 */
class SortButton extends React.PureComponent {
  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
  render() {
    const { order } = this.props;

    if (order.startsWith('n')) {
      return (
        <Toggle
          text = {order === 'nasc' ? 'Name ' : 'Name '}
          icon = {order === 'nasc' ? faChevronCircleUp : faChevronCircleDown}
          {...this.props}
        />
      );
    }
    else {
      return (
        <Toggle
          text = {order === 'pasc' ? 'Price ' : 'Price '}
          icon = {order === 'pasc' ? faChevronCircleUp : faChevronCircleDown}
          {...this.props}
        />
      );
    }
  }
}
SortButton.propTypes = propTypes;
SortButton.defaultProps = defaultProps;
export default SortButton;
