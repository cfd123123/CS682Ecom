import React from 'react';
import PropTypes from 'prop-types';
import Toggle from './Toggle.js';

const propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string,
  icon: PropTypes.string,
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
          text = {order === 'nasc' ? 'Name Ascending' : 'Name Descending'}
          icon = {order === 'nasc' ? 'arrow-circle-up' : 'arrow-circle-down'}
          {...this.props}
        />
      );
    }
    else {
      return (
        <Toggle
          text = {order === 'pasc' ? 'Price Ascending' : 'Price Descending'}
          icon = {order === 'pasc' ? 'arrow-circle-up' : 'arrow-circle-down'}
          {...this.props}
        />
      );
    }
  }
}

SortButton.propTypes = propTypes;
SortButton.defaultProps = defaultProps;

export default SortButton;
