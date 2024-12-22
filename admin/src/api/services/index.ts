import axios from '@/common/utils/axios'
import { AxiosResponse } from 'axios'

import { GetServicesRequest } from './interfaces'
import { SearchResponse } from '../response'
import endpoints from '../endpoints'

export const getServices = async (
  request: GetServicesRequest,
): Promise<any> => {
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
    endpoints.services.list,
    { params: params },
  )

  return response.data
};

export const getDetailService = async (id: string): Promise<any> => {
  const response: AxiosResponse<any> = await axios.get(
    endpoints.services.detail(id),
  )
  return response.data
}

export const createService = async (request: FormData): Promise<any> => {
  const response: AxiosResponse<any> = await axios.post(
    endpoints.services.create,
    request,
  )
  return response.data
}

export const editService = async (id: string, request: FormData): Promise<any> => {
  const response: AxiosResponse<any> = await axios.put(
    endpoints.services.update(id),
    request,
  )
  return response.data
}

export const getServiceSessions = async (id: string): Promise<any> => {
  const response: AxiosResponse<any> = await axios.get(
    endpoints.services.session(id),
  )
  return response.data
}

export const getServiceSessionWorkouts = async (id: string, session_id: string): Promise<any> => {
  const response: AxiosResponse<any> = await axios.get(
    endpoints.services.workout(id, session_id),
  )
  return response.data
}