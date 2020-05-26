import React from 'reactn';
import classNames from 'classnames';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Component used to toggle between sorting methods in search results.
 */
class Toggle extends React.PureComponent {
  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
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
export default Toggle;