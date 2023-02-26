import {createSlice} from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {}
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

const {actions, reducer} = userSlice;

export const {addUser} = actions;

export default reducer;
