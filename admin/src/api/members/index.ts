import { AxiosResponse } from 'axios'
import { SearchResponse } from '../response'
import axios from '@/common/utils/axios'
import endpoints from '../endpoints'
import { GetMembersRequest } from './interfaces/list'
import { CommonResponse } from '../response'
import {
  CreateMemberMembershipPaymentRequest,
  CreateMemberMembershipRequest,
  CreateMemberResponse,
} from './interfaces/create'

export const getMembers = async (request: GetMembersRequest): Promise<any> => {
  const params = new URLSearchParams();
  if (request.page !== undefined) params.append('page', request.page.toString());
  if (request.take !== undefined) params.append('take', request.take.toString());
  if (request.sort_enum) params.append('sort_enum', request.sort_enum);
  if (request.sort_by) params.append('sort_by', request.sort_by);
  if (request.status) params.append('status', request.status);
  if (request.field && request.type && request.value) {
    params.append('field', request.field);
    params.append('type', request.type);
    params.append('value', request.value);
  }

  const response: AxiosResponse<SearchResponse<any>> = await axios.get(
    endpoints.members.list,
    { params: params },
  )

  return response.data
}

export const createMember = async (formData: FormData): Promise<any> => {
  const response: AxiosResponse<CommonResponse<CreateMemberResponse>> =
    await axios.post(endpoints.members.create, formData)

  return response.data
}

export const getDetailMember = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.get(
    endpoints.members.detail(id),
  )

  return response.data
}

export const editMember = async (
  id: string,
  formData: FormData,
): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.put(
    endpoints.members.update(id),
    formData,
  )

  return response.data
}

export const deleteMember = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.delete(
    endpoints.members.delete(id),
  )

  return response.data
};

export const getmemberMemberships = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.get(
    endpoints.members.memberships(id),
  )

  return response.data
}

export const createMemberMembership = async (
  id: string,
  request: CreateMemberMembershipRequest,
): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.post(
    endpoints.members.createMemberships(id),
    request,
  )

  return response.data
};

export const getMemberMembershipPayments = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.get(
    endpoints.members.membershipsPayment(id),
  )

  return response.data
};

export const createMemberMembershipPayment = async (
  id: string,
  request: CreateMemberMembershipPaymentRequest,
): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.post(
    endpoints.members.createMembershipsPayment(id),
    request,
  )

  return response.data
};

export const getMemberFinancials = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.get(
    endpoints.members.financials(id),
  )

  return response.data
};

export const getMemberMeasurements = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.get(
    endpoints.members.measurements(id),
  )

  return response.data
};
