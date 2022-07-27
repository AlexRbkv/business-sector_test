import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TFilterParams } from '../filterSlice/models';
import { RootState } from '../store';
import { IPostState, TPostType, Status, TFetchPostsResponse } from './models';

const initialState: IPostState = {
    posts: [],
    total: 0,
    status: Status.LOADING, // loading | success | error
    loading: false,
}

export const fetchPosts = createAsyncThunk<TFetchPostsResponse, TFilterParams>('fetchPosts', async (params) => {
    const { currentPage, sortProperty, searchValue } = params;
    const sortType = sortProperty.order === true ? 'asc' : 'desc';
    const response = await axios.get<TPostType[]>(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_sort=${sortProperty.sortBy}&_order=${sortType}&q=${searchValue}`
    );
		return { data: response.data, total: Number(response.headers['x-total-count'])};
})

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = Status.LOADING;
      state.posts = [];   
      state.loading = true;
      state.total = 0;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<TFetchPostsResponse>) => {
      state.posts = action.payload.data;
      state.status = Status.SUCCESS;
      state.loading = false;
      state.total = action.payload.total;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.status = Status.ERROR;
      state.posts = [];
      state.loading = false;
      state.total = 0;
    });
  },
});

export const postsSelector = (state: RootState) => state.post.posts;
export const totalPostsSelector = (state: RootState) => state.post.total;
export const loadingSelector= (state: RootState) => state.post.loading;

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;