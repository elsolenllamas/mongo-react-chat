import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import * as actions from '../../../actions/messaging';

import { connect } from 'react-redux';


class ConversationItem extends Component {

	constructor(props){
    	super(props);
  	}


	render() {
	    return (
	      <div className="message">
	        <a activeClassName="message-active" href={`/conversations/${this.props.conversationId}`}>
	           <span className="direct-message-from">{this.props.author}</span>
	        </a>
	      </div>
	    );
	}
}

export default ConversationItem;