export interface CommonResponse<T> {
  statusCode: number | string;
  message: string | null;
  data: T;
}

export interface SearchResponse<T> {
  statusCode: number | string;
  message: string | null;
  data: Array<T>;
  meta: Array<T>;
}
