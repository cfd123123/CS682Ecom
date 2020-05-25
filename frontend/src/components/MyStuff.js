import React from "reactn";
import UserService from "../services/UserService";
import LoginRedirect from "./Login/LoginRedirect";

/**
 * Top level component that is a user's personalized content page. The current
 * user information is retrieved from the reactn {@link global} variable
 * currentUser.<br>
 *   WARNING: This component is incomplete and only very basic information.
 *   Future iterations will complete this with more personalized content.
 */
class MyStuff extends React.PureComponent {
  /**
   * Constructs this component with initially empty state content.
   */
  constructor(props) {
    super(props);

    /**
     * content either a login link or unstructured user data
     */
    this.state = {
      content: "",
    };
  }

  /**
   * After this component mounts, this function calls the
   * {@link UserService#getMyStuff} function, setting the content state value
   * based on the backend server's response.
   */
  componentDidMount() {
    UserService.getMyStuff().then(
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
    const {currentUser, loggedIn} = this.global;
    const {content} = this.state;
    if (!(content && currentUser)) { return null; }

    return (
        <div className="container">
            {!loggedIn ? LoginRedirect(content) :
                <header className="jumbotron">
                  <h3>{content}</h3>
                </header>
            }
        </div>
    );
  }
}
export default MyStuff;