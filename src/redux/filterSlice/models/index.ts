export type TSortType = {
	id: number,
	sortBy: 'id' | 'title' | 'body',
	order: boolean,
}

export type TFilterParams = {
	searchValue: string,
	currentPage: number,
	sortProperty: TSortType,
}
  
export interface IFilterState {
  currentPage: number,
  searchValue: string,
  sortProperty: TSortType,
}