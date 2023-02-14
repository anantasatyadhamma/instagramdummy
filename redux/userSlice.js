import {createSlice} from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
        name: "Ananta",
        username: "ananta",
        profile_picture: "https://randomuser.me/api/portraits/men/35.jpg"
    }
  },
  reducers: {
    changeUser: (state, action) => {
        console.log('this is just for dummy');
    }
  },
});

const {actions, reducer} = userSlice;

export const {changeUser} = actions;

export default reducer;
