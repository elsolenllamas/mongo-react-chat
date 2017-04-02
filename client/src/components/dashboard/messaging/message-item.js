import React, { Component } from 'react';
import cookie from 'react-cookie';

class MessageItem extends Component {

	constructor(props){
	   	super(props);
	    this.userCookie = cookie.load('user');
 	}

 	render() {
  	const currentUser = this.userCookie._id ;
    return (
      <div className={currentUser === this.props.author._id ? 'message current-user' : 'message'}>
        <span className="message-byline"><strong>{this.props.author.profile.firstName}</strong> {this.props.timestamp}</span>
        <span className="message-body">{this.props.message}</span>
      </div>
    );
  }
}

export default MessageItem;
