import { AxiosResponse } from 'axios'
import axios from '@/common/utils/axios'

import {
  CreateRoomRequest,
  CreateRoomResponse,
  GetRoomsRequest,
} from './interfaces'
import endpoints from '../endpoints'

export const createRoom = async (
  request: CreateRoomRequest,
): Promise<CreateRoomResponse> => {
  const response: AxiosResponse<CreateRoomResponse> = await axios.post(
    endpoints.rooms.create,
    request,
  )
  return response.data
}

export const getRooms = async (request: GetRoomsRequest): Promise<any> => {
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

  const response: AxiosResponse<any> = await axios.get(endpoints.rooms.list, {
    params: params,
  })

  return response.data
}

export const deleteRoom = async (id: string): Promise<any> => {
  const response: AxiosResponse<any> = await axios.delete(
    endpoints.rooms.delete(id),
  )

  return response.data
};

export const getDetailRoom = async (id: string): Promise<any> => {
  const response: AxiosResponse<any> = await axios.get(
    endpoints.rooms.detail(id),
  )
  return response.data
};

export const editRoom = async (
  id: string,
  request: CreateRoomRequest,
): Promise<any> => {
  const response: AxiosResponse<any> = await axios.patch(
    endpoints.rooms.update(id),
    request,
  )
  return response.data
}

export const getEquipmentsByRoomId = async (id: string): Promise<any> => {
  const response: AxiosResponse<any> = await axios.get(
    endpoints.rooms.listEquipment(id),
  )
  return response.data
};
