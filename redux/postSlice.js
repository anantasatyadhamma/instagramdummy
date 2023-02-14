import {createSlice} from '@reduxjs/toolkit';


const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    modifiedTime: new Date().getTime(),
  },
  reducers: {
    addPost: (state, action) => {
      state.posts = action.payload;
    },
    addToBookmark: (state, action) => {
      const item = state.posts.find(item => item.id === action.payload);
      item.bookmarked = true;
  
      state.modifiedTime = new Date().getTime();
    },
    removeBookmark: (state, action) => {
      const item = state.posts.find(item => item.id === action.payload);
      item.bookmarked = false;
  
      state.modifiedTime = new Date().getTime();
    },
    likePost: (state, action) => {
      const item = state.posts.find(item => item.id === action.payload);
      item.likes = item.likes + 1;
      item.user_has_liked = true;
  
      state.modifiedTime = new Date().getTime();
    },
    commentPost: (state, action) => {
      let item = state.posts.find(item => item.id === action.payload.id);
      let comments = [...item.comments, action.payload.userComment];

      item.comments = comments;

      state.modifiedTime = new Date().getTime();
    },
  },
});

const {actions, reducer} = postSlice;

export const {
  addPost,
  likePost,
  commentPost,
  addToBookmark,
  removeBookmark
} = actions;

export default reducer;
