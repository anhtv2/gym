export interface CreateMemberRequest {
  name: string;
  gender: string;
  avatar: any;
  birth_date: string;
  phone: string;
  email: string;
  password: string;
  address: string;
}

export interface CreateMemberResponse {
  name?: string;
  avatar?: any;
  birth_date?: string;
  gender?: string;
  email?: string;
  phone?: string;
  address?: string;
  start_date?: string;
  end_date?: string;
  membership_plan_name?: string;
}

export interface CreateMemberMembershipRequest {
  membership_plan_id?: string;
  start_date?: string;
  end_date?: string;
}

export interface CreateMemberMembershipPaymentRequest {
  payment_date?: string;
  payment_amount?: number;
  payment_type?: string;
  payment_note?: string;
}
