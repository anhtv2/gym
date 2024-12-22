export interface CreateWorkoutRequest {
  name?: string;
  description?: string;
  duration?: number;
  thumbnail?: any;
}

export interface CreateWorkoutResponse {
  name?: string;
  description?: string;
  duration?: number;
  thumbnail?: any;
}

export interface GetWorkoutsRequest {
  page?: number;
  take?: number;
  sort_enum?: string;
  sort_by?: string;
  status?: string;
  field?: string;
  type?: string;
  value?: string;
}
