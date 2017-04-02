import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { loginUser } from '../../actions/auth';

const form = reduxForm({
  form: 'login',
});

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="col-sm-4 col-centered">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div>
              <label>Email</label>
              <Field name="email" className="form-control" component="input" type="text" />
            </div>
            <div>
              <label>Password</label>
              <Field name="password" className="form-control" component="input" type="password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <Link to="/forgot-password">Forgot Password?</Link>
          <div className="register-container">
          <span>Dont have an account yet? </span><Link to="/register">Register here</Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));
