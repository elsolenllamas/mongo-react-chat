import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChannelItem extends Component {

	constructor(props){
    	super(props);
  	}

	render() {
	    return (
	      <div className="channel">
	        <a href={`/conversations/${this.props.channelId}`}>
	           <span className="channel-name"># {this.props.channelName}</span>
	        </a>
	      </div>
	    );
	}
}

export default ChannelItem;