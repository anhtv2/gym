import axios from '@/common/utils/axios'
import { AxiosResponse } from 'axios'
import endpoints from '../endpoints'
import {
  CreateMembershipRequest,
  CreateMembershipResponse,
  EditMembershipRequest,
  GetMembershipsRequest,
} from './interfaces'
import { CommonResponse, SearchResponse } from '../response';

export const createMembership = async (
  request: CreateMembershipRequest,
): Promise<CreateMembershipResponse> => {
  const response: AxiosResponse<CreateMembershipResponse> = await axios.post(
    endpoints.memberships.create,
    request,
  )
  return response.data
}

export const getMemberships = async (
  request: GetMembershipsRequest,
): Promise<any> => {
  const params = new URLSearchParams();
  if (request.page) params.append('page', request.page.toString());
  if (request.take) params.append('take', request.take.toString());
  if (request.sort_enum) params.append('sort_enum', request.sort_enum);
  if (request.sort_by) params.append('sort_by', request.sort_by);
  if (request.status) params.append('status', request.status);
  if (request.field && request.type && request.value) {
    params.append('field', request.field);
    params.append('type', request.type);
    params.append('value', request.value);
  }

  const response: AxiosResponse<SearchResponse<any>> = await axios.get(
    endpoints.memberships.list,
    { params: params },
  )

  return response.data
}

export const deleteMembership = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.delete(
    endpoints.memberships.delete(id),
  )

  return response.data
};

export const getDetailMembership = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.get(
    endpoints.memberships.detail(id),
  )
  return response.data
};

export const editMembership = async (
  id: string,
  request: EditMembershipRequest,
): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.put(
    endpoints.memberships.update(id),
    { ...request },
  )

  return response.data
};
