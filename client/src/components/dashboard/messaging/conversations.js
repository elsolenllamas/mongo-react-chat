import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import { fetchConversations, fetchChannels } from '../../../actions/messaging';

import ConversationList from './conversation-list';
import ChannelList from './channel-list';


class Conversations extends Component {

  constructor(props){
    super(props);
    this.userCookie = cookie.load('user');
 
  }

  componentWillMount() {
    this.props.fetchChannels();
    this.props.fetchConversations();
  }

  renderMessagesSidebar() {
      return (
        <ConversationList conversations={this.props.conversations} />
      );
  }

  renderChannelsSidebar() {
      return (
        <ChannelList channels={this.props.channels} />
      );
  }

  render() {
    const currentUserFirstName = this.userCookie.firstName;
    const currentUserLastName = this.userCookie.lastName;

     return (
      <div>
          <div className="row">
            <div className="col-sm-3 col-md-2 sidebar">
              <p><span className="username">{currentUserFirstName}</span><span className="username">{currentUserLastName}</span></p>
              <ul className="user-navigation">
              <li><small className="username-view-profile"><Link to="/profile">View Profile</Link></small></li>
              <li><small className="username-logout"><Link to="logout">Logout</Link></small></li>
              </ul>
              <p>Channels</p>
              <div className="channels-container">
              {this.renderChannelsSidebar()}
              </div>

              <p>Direct Messages <Link to="/conversations/new"><i className="fa fa-plus-circle"></i></Link></p> 
              <div className="direct-messages-container">
              {this.renderMessagesSidebar()}
              </div>

            </div>
            <div className="col-sm-9 col-md-10">
              {this.props.children}
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    conversations: state.communication.conversations,
    channels: state.communication.channelslist
  };
}

export default connect(mapStateToProps, { fetchConversations, fetchChannels })(Conversations);
