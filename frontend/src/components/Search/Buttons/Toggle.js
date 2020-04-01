import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Button } from 'reactstrap';

export default class Toggle extends React.Component {
  render() {
    const { clickHandler, text, icon, active, large } = this.props;
    const buttonClass = classNames({
      'button-toggle': true,
      'no-icon': !icon,
      active,
      large,
    });
    const iconClass = `fa fa-fw fa-${icon}`;

    return (
      <Button className={buttonClass} onClick={clickHandler} size="sm">
        <i className={iconClass} />
        {text}
      </Button>
    );
  }
}
