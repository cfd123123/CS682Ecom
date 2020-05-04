import React from 'reactn';
import PropTypes from 'prop-types';
import Toggle from './Toggle.js';
import { faChevronCircleUp, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

const propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string,
  order: PropTypes.string,
  active: PropTypes.bool,
};

const defaultProps = {
  order: 'asc',
};

export default class SortButton extends React.PureComponent {

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

