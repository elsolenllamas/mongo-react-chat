import React, { Component } from 'react';
const moment = require('moment');

import ChannelItem from './channel-item';

class ChannelList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="channels">
       {this.props.channels.map(data => (
          <ChannelItem channelId={data._id} channelName={data.channelName}/>
            ))}
      </div>
    );
  }
}

export default ChannelList;
