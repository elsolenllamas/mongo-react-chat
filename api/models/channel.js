const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  channelName: {
    type: String,
    required: true
  },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Channel', ChannelSchema);
