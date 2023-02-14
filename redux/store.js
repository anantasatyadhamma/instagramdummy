import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import userReducer from './userSlice';
import notificationReducer from './notificationSlice';
import messagesReducer from './messageSlice';

const reducer = combineReducers({
    post: postReducer,
    user: userReducer,
    notification: notificationReducer,
    messages: messagesReducer
});

const store = configureStore({
    reducer,
})

export default store;

export const State = store.getState();
