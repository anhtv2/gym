export interface CreateBookingRequest {
  name?: string;
  description?: string;
}

export interface CreateBookingResponse {
  name?: string;
  description?: string;
}

export interface GetBookingsRequest {
  page?: number;
  take?: number;
  sort_enum?: string;
  sort_by?: string;
  field?: string;
  type?: string;
  value?: string;
  member_id?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
}

export interface EditBookingRequest {
  name?: string;
  description?: string;
}
