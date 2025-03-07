export interface Pagination {
    page : number,
    size : number,
    totalPage : number
}

export interface PageResponse {
    content : any[],
    totalPages : number,
    size : number,
    number : number
}