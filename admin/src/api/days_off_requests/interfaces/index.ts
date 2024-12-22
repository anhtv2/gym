export interface CreateDaysOffRequestRequest {
    trainer_id: number;
    start_date: string;
    note: string;
    status: number;
}

export interface CreateDaysOffRequestResponse {
    trainer_name: string;
    trainer_avatar: string;
    id: number;
    date: string;
    note: string;
    status: number;
}

export interface GetDaysOffRequestsRequest {
  page?: number;
  take?: number;
  sort_enum?: string;
  sort_by?: string;
  status?: string;
  field?: string;
  type?: string;
  value?: string;
}

export interface EditDaysOffRequestRequest {
    trainer_id: number;
    start_date: string;
    note: string;
    status: number;
}
