export interface GetServicesRequest {
  page?: number;
  take?: number;
  sort_enum?: string;
  sort_by?: string;
  status?: string;
  field?: string;
  type?: string;
  value?: string;
}

export interface CreateServiceRequest {
  name?: string;
  price?: number;
  duration?: number;
  max_participant?: number;
  description?: string;
  service_type?: string;
  thumbnail?: string;
}
