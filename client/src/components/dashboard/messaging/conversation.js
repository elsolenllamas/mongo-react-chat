import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../../actions/messaging';

import MessageList from './message-list';
import ReplyMessage from './reply-message';

const socket = actions.socket;

class Conversation extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    
    //browserHistory.listen( location =>  {
     const { params, fetchConversation } = this.props;
      fetchConversation(params.conversationId);
      socket.emit('enter conversation', params.conversationId);
      socket.on('refresh messages', (data) => {
        fetchConversation(params.conversationId);
      });   
    // });

  }

  componentWillUnmount() {
    socket.emit('leave conversation', this.props.params.conversationId);
  }

  renderMessages() {
    if (this.props.messages) {
      return (
        <MessageList displayMessages={this.props.messages} />
      );
    }
  }

  render() {

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="clearfix" />
            { this.renderMessages() }
          </div>
        </div>
        <ReplyMessage replyTo={this.props.params.conversationId} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.communication.messages,
  };
}

export default connect(mapStateToProps, actions)(Conversation);
