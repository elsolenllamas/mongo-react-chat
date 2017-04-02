import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { sendReply } from '../../../actions/messaging';

const form = reduxForm({
  form: 'replyMessage',
});

const renderField = field => (
  <div>
    <input className="form-control" autoComplete="off" placeholder="Type here to chat..." {...field.input} />
  </div>
);

class ReplyMessage extends Component {
  handleFormSubmit(formProps) {
    this.props.sendReply(this.props.replyTo, formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="input-group">
          <span className="input-group-addon add-message">
          <button action="submit" className="add-message-btn"><i className="fa fa-plus"></i></button>
          </span>
          <Field name="composedMessage" className="form-control" component={renderField} type="text" />
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipients: state.communication.recipients,
    errorMessage: state.communication.error,
  };
}

export default connect(mapStateToProps, { sendReply })(form(ReplyMessage));
