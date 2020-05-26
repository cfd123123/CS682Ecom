import React from "reactn";
import UserService from "../services/UserService";

/**
 * Top level component used to display a user's account information.<br>
 *   WARNING: This component is incomplete. Future implementations will complete
 *   the functionality expected from this component.
 */
class MyAccount extends React.PureComponent {
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
   * After mounting, this function calls the {@link UserService#getMyAccount}
   * function, then updates this component's state with the returned data.
   */
  componentDidMount() {
    UserService.getMyAccount().then(
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

    const { username, id, email, cart, roles, orders } = currentUser;

    return (
        <div className="container">
          <div>
            <header className="jumbotron"><h3><strong>{username}</strong>{" "}Profile</h3></header>
            <p /><strong>Username:</strong>{" "}{username}
            <p /><strong>ID:      </strong>{" "}{id}
            <p /><strong>Email:   </strong>{" "}{email}
            <p /><strong>Roles:   </strong>{" "}{roles.map(role => <div key={role.id}>{role.name}</div>)}
            <p /><strong>Cart:    </strong>{" "}{Object.entries(cart).map(([k,v]) => <div key={k}>{k}: {v}</div>)}
            <p /><strong>Orders:  </strong>{" "}{orders.map(order => <div key={order}>{order}</div>)}
          </div>
        </div>
    );
  }
}
export default MyAccount;