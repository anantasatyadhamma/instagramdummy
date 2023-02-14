import {createSlice} from '@reduxjs/toolkit';


const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notification: [
        {
            created_time: '1440501087',
            title: "Like Post",
            text: "Your posts are liked by john"
        },
        {
            created_time: '1440501087',
            title: "Like Post",
            text: "Your posts are liked by salmankhan"
        },
        {
            created_time: '1440501087',
            title: "Like Post",
            text: "Your posts are liked by sam"
        }
    ],
    modified: new Date().getTime()
  },
  reducers: {
    addNotification: (state, action) => {
        state.notification.push(action.payload);
        state.modified = new Date().getTime();
    }
  },
});

const {actions, reducer} = notificationSlice;

export const {addNotification} = actions;

export default reducer;
