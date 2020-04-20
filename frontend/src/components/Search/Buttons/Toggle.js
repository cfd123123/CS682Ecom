import React from 'react';
import classNames from 'classnames';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Toggle extends React.Component {
  render() {
    const { clickHandler, text, icon, active, large } = this.props;
    const buttonClass = classNames({
      'button-toggle': true,
      'no-icon': !icon,
      active,
      large,
    });

    return (
      <Button className={buttonClass} onClick={clickHandler} size="sm">
        {text} <FontAwesomeIcon icon={icon} />
      </Button>
    );
  }
}
