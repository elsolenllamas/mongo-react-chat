import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute } from 'react-router';

// Import miscellaneous routes and other requirements
import App from './components/app';

// Import authentication related pages
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import ForgotPassword from './components/auth/forgot_password';
import ResetPassword from './components/auth/reset_password';

// Import dashboard pages
import ViewProfile from './components/dashboard/profile/view-profile';
import Conversations from './components/dashboard/messaging/conversations';
import Conversation from './components/dashboard/messaging/conversation';
import ComposeMessage from './components/dashboard/messaging/compose-message';

// Import higher order components
import RequireAuth from './components/auth/require_auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute path="conversations" component={RequireAuth(Conversations)} />
    <Route path="conversations" component={RequireAuth(Conversations)} >
      <Route path="new" component={RequireAuth(ComposeMessage)} />
      <Route path=":conversationId" component={RequireAuth(Conversation)} handler={Conversation} />
    </Route>


    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="forgot-password" component={ForgotPassword} />
    <Route path="reset-password/:resetToken" component={ResetPassword} />

    <Route path="profile" component={ViewProfile} />
    <Route path="profile/:userId" component={ViewProfile} />
  </Route>
);
