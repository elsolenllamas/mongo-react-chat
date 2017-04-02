import React, { Component } from 'react';

class UserInfo extends Component {
  render() {
    return (
      <div>
      	<h3>Name: {this.props.profile.firstName} {this.props.profile.lastName}</h3>
        <span>Email: {this.props.profile.email}</span>
      </div>
    );
  }
}

export default UserInfo;
