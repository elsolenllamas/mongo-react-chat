const AuthenticationController = require('./controllers/authentication');
const UserController = require('./controllers/user');
const ChatController = require('./controllers/chat');

const express = require('express');
const passport = require('passport');

const passportService = require('./config/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router(),
    chatRoutes = express.Router();

  apiRoutes.use('/auth', authRoutes);
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', requireLogin, AuthenticationController.login);
  authRoutes.post('/forgot-password', AuthenticationController.forgotPassword);
  authRoutes.post('/reset-password/:token', AuthenticationController.verifyToken);

  apiRoutes.use('/user', userRoutes);
  userRoutes.get('/:userId', requireAuth, UserController.viewProfile);
  apiRoutes.use('/chat', chatRoutes);
  chatRoutes.get('/recipients', requireAuth, ChatController.getRecipients);
  chatRoutes.get('/channels', requireAuth, ChatController.getChannels);
  chatRoutes.get('/channels/list', requireAuth, ChatController.getChannelList);
  chatRoutes.get('/channels/:channelId', requireAuth, ChatController.getChannel);


  chatRoutes.get('/', requireAuth, ChatController.getConversations);
  chatRoutes.get('/:conversationId', requireAuth, ChatController.getConversation);
  chatRoutes.post('/:conversationId', requireAuth, ChatController.sendReply);
  chatRoutes.post('/new/:recipient', requireAuth, ChatController.newConversation);
  chatRoutes.post('/new/channel/:channel', requireAuth, ChatController.newChannel);

  app.use('/api', apiRoutes);
};
