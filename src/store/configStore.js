import { createStore, combineReducers } from 'redux'
import reducer from './reducers/storefile'

const rootReducer = combineReducers({
    chatroom: reducer
});


const configureStore = () => {
    return createStore(rootReducer)
}

export default configureStore