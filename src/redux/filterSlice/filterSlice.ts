import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortProperties } from '../../utils/constans';
import { RootState } from '../store';
import { IFilterState, TFilterParams, TSortType } from './models';

const initialState: IFilterState = {
  currentPage: 1,
  searchValue: '',
  sortProperty: sortProperties[0],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSortProperty(state, action: PayloadAction<TSortType>) {
      state.sortProperty = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<TFilterParams>) {
      state.sortProperty = action.payload.sortProperty;
      state.currentPage = action.payload.currentPage;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;
export const sortPropertySelector = (state: RootState) => state.filter.sortProperty;
export const currentPageSelector = (state: RootState) => state.filter.currentPage;
export const searchValueSelector = (state: RootState) => state.filter.searchValue;

export const { setSortProperty, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;