export interface CreateRoomRequest {
  name?: string;
  description?: string;
}

export interface CreateRoomResponse {
  name?: string;
  description?: string;
}

export interface GetRoomsRequest {
  page: number;
  take: number;
  sort_enum: string;
  sort_by: string;
  status?: string;
  field?: string;
  type?: string;
  value?: string;
}

export interface EditRoomRequest {
  name?: string;
  description?: string;
}
