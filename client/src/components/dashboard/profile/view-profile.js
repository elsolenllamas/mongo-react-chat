import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { fetchUser } from '../../../actions/index';

import UserInfo from './user-info';

class ViewProfile extends Component {
  componentWillMount() {
    
    const user = cookie.load('user');
    const userId = user._id;
    this.props.fetchUser(userId);
  }

  render() {
    return (
      <UserInfo profile={this.props.profile} />
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.user.profile,
  };
}

export default connect(mapStateToProps, { fetchUser })(ViewProfile);
