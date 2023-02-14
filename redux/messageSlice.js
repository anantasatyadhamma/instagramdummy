import {createSlice} from '@reduxjs/toolkit';


const messageSlice = createSlice({
  name: 'notification',
  initialState: {
    messages: [
        {
            created_time: '1440501087',
            profile_picture: "https://randomuser.me/api/portraits/men/31.jpg",
            username: "david",
            lastChat: "ok, i'll do it"
        },
        {
            created_time: '1440501087',
            profile_picture: "https://randomuser.me/api/portraits/men/21.jpg",
            username: "mark",
            lastChat: "see you tommorow"
        },
        {
            created_time: '1440501087',
            profile_picture: "https://randomuser.me/api/portraits/men/15.jpg",
            username: "louis",
            lastChat: "where are you  know ?"
        }
    ],
    modified: new Date().getTime()
  },
  reducers: {
    addMessages: (state, action) => {
        console.log('this is for dummy reducer')
    }
  },
});

const {actions, reducer} = messageSlice;

export const {addNotification} = actions;

export default reducer;
