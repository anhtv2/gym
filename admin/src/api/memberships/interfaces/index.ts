export interface CreateMembershipRequest {
  name?: string;
  price?: number;
  free_service?: number[];
  duration?: number;
  description?: string;
}

export interface CreateMembershipResponse {
  name?: string;
  price?: number;
  free_service?: number[];
  duration?: number;
  description?: string;
}

export interface GetMembershipsRequest {
  page?: number;
  take?: number;
  sort_enum?: string;
  sort_by?: string;
  status?: string;
  field?: string;
  type?: string;
  value?: string;
}

export interface EditMembershipRequest {
  name?: string;
  price?: number;
  free_service?: number[];
  duration?: number;
  description?: string;
}
