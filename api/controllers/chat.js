const Conversation = require('../models/conversation'),
  Message = require('../models/message'),
  Channel = require('../models/channel'),
  User = require('../models/user');


exports.getConversations = function (req, res, next) {
  Conversation.find({ participants: req.user._id })
    .select('_id')
    .exec((err, conversations) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      const fullConversations = [];
      conversations.forEach((conversation) => {
        Message.find({ conversationId: conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: 'author',
            select: 'profile.firstName profile.lastName'
          })
          .exec((err, message) => {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
            fullConversations.push(message);
            if (fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations });
            }
          });
      });
    });
};

exports.getRecipients = function (req, res, next) {
  User.find()
    .exec((err, users) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      return res.status(200).json({ recipients: users });
    });
};

exports.getChannelList = function (req, res, next) {
  Channel.find()
    .exec((err, channels) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      return res.status(200).json({ channelslist: channels });
    });
};


exports.getChannels = function (req, res, next) {
  Channel.find({ channelId: req._id })
    .exec((err, channels) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      const fullChannels = [];
      channels.forEach((channel) => {
        Message.find({ channelId: channel._id })
          .sort('-createdAt')
          .exec((err, message) => {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
            fullChannels.push(message);
            if (fullChannels.length === channels.length) {
              return res.status(200).json({ channels: fullChannels });
            }
          });
      });
    });
};

exports.getConversation = function (req, res, next) {
  Message.find({ conversationId: req.params.conversationId })
    .select('createdAt body author')
    .sort('-createdAt')
    .populate({
      path: 'author',
      select: 'profile.firstName profile.lastName'
    })
    .exec((err, messages) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      return res.status(200).json({ conversation: messages });
    });
};

exports.getChannel = function (req, res, next) {
  Message.find({ channelId: req.params.channelId })
    .select('createdAt body author')
    .sort('-createdAt')
    .populate({
      path: 'author',
      select: 'profile.firstName profile.lastName'
    })
    .exec((err, messages) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      return res.status(200).json({ channel: messages });
    });
};

exports.newConversation = function (req, res, next) {
  if (!req.params.recipient) {
    res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    return next();
  }

  if (!req.body.composedMessage) {
    res.status(422).send({ error: 'Please enter a message.' });
    return next();
  }

  const conversation = new Conversation({
    participants: [req.user._id, req.params.recipient]
  });

  conversation.save((err, newConversation) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    const message = new Message({
      conversationId: newConversation._id,
      body: req.body.composedMessage,
      author: req.user._id
    });

    message.save((err, newMessage) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      return res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
    });
  });
};

exports.newChannel = function (req, res, next) {

  const channel = new Channel({
    channelName: req.params.channel
  });

  channel.save((err, newChannel) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    return res.status(200).json({ message: 'Channel created!', channelId: channel._id });

  });
};

exports.sendReply = function (req, res, next) {
  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.composedMessage,
    author: req.user._id
  });

  reply.save((err, sentReply) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    return res.status(200).json({ message: 'Reply successfully sent!' });
  });
};
