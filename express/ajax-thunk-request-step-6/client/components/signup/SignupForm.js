import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
//import axios from 'axios';


class SignupForm extends React.Component {
  //using es6 (constructor) features to set defaults. super() allows access this.props in constructor.
  //by calling super, you are actually calling the parent element with props parameter
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    //form for desptching::replaces axios api post data call
    //axios is used as  in actions of action creator to dispatch and update state
    //axios.post('/api/users', {user: this.state});
    //userSignupRequest is passed as props from its paren HOC SignupPage.
    this.props.userSignupRequest(this.state);
  }

  render() {
    const options = map(timezones, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join up</h1>

        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            name="username"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="control-label">Email</label>
          <input
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            name="email"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="control-label">Password Confirmation</label>
          <input
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            type="password"
            name="passwordConfirmation"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="control-label">Timezone</label>
          <select
            className="form-control"
            name="timezone"
            onChange={this.onChange}
            value={this.state.timezone}
          >
            <option value="" disabled>Choose Your Timezone</option>
            {options}
          </select>
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>

      </form>
    )
  }
}

SignupForm.proptypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;
