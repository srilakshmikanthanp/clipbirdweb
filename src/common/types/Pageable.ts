export interface Sortable {
  property: string;
  order: 'ASC' | 'DESC';
}

export interface Pageable {
  page: number;
  size: number;
  sort?: Sortable[];
}
