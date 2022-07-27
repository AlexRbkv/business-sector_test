export type TPostType = {
    userId: number,
    id: number,
    title: string,
    body: string,
}

export enum Status {
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error"
}

export interface IPostState {
    posts: TPostType[],
    status: Status,
    total: number,
    loading: boolean,
}

export type TFetchPostsResponse = {
    data: TPostType[],
    total: number,
}