import { FETCH_CONVERSATIONS, FETCH_CHANNELS, SEND_REPLY, START_CHANNEL, START_CONVERSATION, FETCH_SINGLE_CONVERSATION, FETCH_RECIPIENTS, CHAT_ERROR } from '../actions/types';

const INITIAL_STATE = { conversations: [], channelslist: [], message: '', messages: [], recipients: [], error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CONVERSATIONS:
      return { ...state, conversations: action.payload.conversations };
    case FETCH_SINGLE_CONVERSATION:
      return { ...state, messages: action.payload.conversation };
    case FETCH_RECIPIENTS:
      return { ...state, recipients: action.payload.recipients };
    case FETCH_CHANNELS:
      return { ...state, channelslist: action.payload.channelslist };
    case START_CONVERSATION:
      return { ...state, message: action.payload.message };
    case START_CHANNEL:
      return { ...state, message: action.payload.message };
    case SEND_REPLY:
      return { ...state, message: action.payload.message };
    case CHAT_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}
