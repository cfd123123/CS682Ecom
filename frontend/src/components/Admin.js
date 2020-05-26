import React from "reactn";
import UserService from "../services/UserService";
import {Link} from "react-router-dom";

/**
 * Top level component used to display administrator content.<br>
 *   WARNING: This component is incomplete. Future implementations will complete
 *   the functionality expected from this component.
 */
class Admin extends React.PureComponent {
  /**
   * Contructs this component with the given props and initial state values.
   */
  constructor(props) {
    super(props);

    /**
     * content - used to store a backend server response.
     */
    this.state = {
      content: ""
    };
  }

  /**
   * After mounting, this function calls the {@link UserService#getAdminContent}
   * function, then updates this component's state with the returned data.
   */
  componentDidMount() {
    UserService.getAdminContent().then(
        response => {
          this.setState({
            content: JSON.stringify(response.data)
          });
        },
        error => {
          this.setState({
            content:
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
          });
        }
    );
  }

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
  render() {
    const {currentUser} = this.global;
    const {content} = this.state;
    if (!(content && currentUser)) { return null; }

    return (
        <div className="container">
          <header className="jumbotron">
            <h3>{content}</h3>
          </header>
          <Link to="/create" style={{'float':'left'}}>Add Product</Link>
        </div>
    );
  }
}
export default Admin;