import React, { Component } from 'react';
import cookie from 'react-cookie';
const moment = require('moment');

import ConversationItem from './conversation-item';

class ConversationList extends Component {
  constructor(props) {
    super(props);

    this.userCookie = cookie.load('user');
  }


  render() {
    const currentUser = this.userCookie._id;
    return (
      <div className="messages">
        {this.props.conversations.map(data => data.map(message => (
          <ConversationItem 
          key={message._id} 
          conversationId={message.conversationId} 
          author={`${message.author.profile.firstName}`}/>
            )))}
      </div>
    );
  }
}

export default ConversationList;
