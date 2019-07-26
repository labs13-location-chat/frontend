import { UPDATE_CHATROOM_LIST } from '../actions/chatroom' 


const initialState = {
    user: [],
    updateChatList: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CHATROOM_LIST:
            return {
                ...state,
                updateChatList: state.updateChatList + 1
            }
        default:
            return state;
    }
}

export default reducer