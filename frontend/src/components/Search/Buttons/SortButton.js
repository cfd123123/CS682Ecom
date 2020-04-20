import React from 'react';
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

class SortButton extends React.Component {

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
