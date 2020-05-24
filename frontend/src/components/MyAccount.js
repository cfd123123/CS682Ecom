import React from "reactn";
import UserService from "../services/user.service";

// user's profile page. appear after pressing 'my account' button.
export default class Profile extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

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

  render() {
    const {currentUser} = this.global;
    const {content} = this.state;
    if (!(content && currentUser)) { return null; }
    console.log(content);

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
