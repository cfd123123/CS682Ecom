import React from "reactn";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/AuthService";

/**
 * Notifies the user if they try to log in without entering anything into
 * a required textbox.
 * @param {string} value the value that is required
 * @returns {ReactElement|null} error message if value is empty and
 * nothing otherwise
 * @memberof Login
 */
const required = value => {
  if (!value) {
    return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
    );
  }
};

/**
 * Top level component that is the login page a user sees when they need to log
 * in.
 */
class Login extends React.PureComponent {
  /**
   * Constructs this component with initially empty fields. Also binds the
   * handleLogin, onChangeUsername, and onChangePassword functions to this
   * component.
   */
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    /**
     * username - the username to log in as<br>
     * password - the password associated with username<br>
     * loading - used to lazy load parts of this component<br>
     * message - used to display a message to the user
     */
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  /**
   * Updates the value of username in this component's state
   * @param event - the event that triggered this function call
   */
  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  /**
   * Updates the value of password in this component's state
   * @param event - the event that triggered this function call
   */
  onChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  /**
   * Initiates the login process after validating the user's input. If input is
   * valid, this function calls the {@link AuthService#login} function, which
   * saves the login token to localStorage, then routes the user to '/home'.<br>
   *   If input is not value, an error message is displayed to the user.
   * @param event - the event that triggered this function call
   */
  handleLogin(event) {
    event.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password)
          .then( () => {
            this.props.history.push("/home");
            window.location.reload();
          },
          error => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            this.setState({
              loading: false,
              message: resMessage
            });
          }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
  render() {
    return (
        <div className="col-md-12">
          <div className="card card-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
            />

            <Form
                onSubmit={this.handleLogin}
                ref={c => {
                  this.form = c;
                }}
            >
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}
                />
              </div>

              <div className="form-group">
                <button
                    className="btn btn-primary btn-block"
                    disabled={this.state.loading}
                >
                  {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"/>
                  )}
                  <span>Login</span>
                </button>
              </div>

              {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  </div>
              )}
              <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
              />
            </Form>
          </div>
        </div>
    );
  }
}
export default Login;