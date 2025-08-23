export default interface PageResponse<T> {
  content: T[];
  page: Page;
}

export interface Page {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
