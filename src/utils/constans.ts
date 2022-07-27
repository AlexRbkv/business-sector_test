import { TSortType } from "../redux/filterSlice/models";

type THeaders = {
	name: string,
	title: string,
}

export const sortProperties: TSortType[] = [
	{id: 1, sortBy: 'id',  order: true},
	{id: 2, sortBy: 'id',  order: false},
	{id: 3, sortBy: 'title',  order: true},
	{id: 4, sortBy: 'title',  order: false},
	{id: 5, sortBy: 'body',  order: true},
	{id: 6, sortBy: 'body',  order: false},
];

export const headersList: THeaders[] = [
	{name: 'id', title: 'ID'},
	{name: 'title', title: 'Заголовок'},
	{name: 'body', title: 'Описание'},
]