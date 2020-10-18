import * as actionTypes from '../Actions/Users/Types';

const initialState = {
  onlineUsers: [],
  offlineUsers: [],
  userConversations: [],
  totalCount: 0,
  conversation: null,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CONNECTED_USERS:
      return {
        ...state,
        onlineUsers: action.payload,
        totalCount: action.payload.length,
      };
    case actionTypes.GET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload,
      };
    case actionTypes.GET_MESSAGES:
      return {
        ...state,
        conversation: { ...state.conversation, messages: [...action.messages] },
      };
    case actionTypes.GET_ALL_CONVERSATIONS:
      return {
        ...state,
        userConversations: action.payload,
      };
    default: return state;
  }
};

export default reducer;
