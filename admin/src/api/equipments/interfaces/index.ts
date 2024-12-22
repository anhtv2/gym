export interface CreateEquipmentRequest {
  name?: string;
  description?: string;
}

export interface CreateEquipmentResponse {
  name?: string;
  description?: string;
}

export interface GetEquipmentsRequest {
  page?: number;
  take?: number;
  sort_enum?: string;
  sort_by?: string;
  status?: string;
  field?: string;
  type?: string;
  value?: string;
}

export interface EditEquipmentRequest {
  name?: string;
  description?: string;
}
