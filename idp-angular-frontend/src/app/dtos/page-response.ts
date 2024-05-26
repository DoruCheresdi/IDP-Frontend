
export class PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;

    constructor(content: T[], totalPages: number, totalElements: number, last: boolean, size: number, number: number, first: boolean, numberOfElements: number) {
        this.content = content;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.last = last;
        this.size = size;
        this.number = number;
        this.first = first;
        this.numberOfElements = numberOfElements;
    }
}
