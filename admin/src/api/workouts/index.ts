import axios from '@/common/utils/axios'
import { AxiosResponse } from 'axios'
import endpoints from '../endpoints'
import {
  CreateWorkoutRequest,
  CreateWorkoutResponse,
  GetWorkoutsRequest,
} from './interfaces'
import { CommonResponse, SearchResponse } from '../response';

export const createWorkout = async (
  request: CreateWorkoutRequest,
): Promise<CreateWorkoutResponse> => {
  const response: AxiosResponse<CreateWorkoutResponse> = await axios.post(
    endpoints.workouts.create,
    request,
  )
  return response.data
}

export const getWorkouts = async (
  request: GetWorkoutsRequest,
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
    endpoints.workouts.list,
    { params: params },
  )

  return response.data
}

export const deleteWorkout = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.delete(
    endpoints.workouts.delete(id),
  )

  return response.data
};

export const getDetailWorkout = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.get(
    endpoints.workouts.detail(id),
  )
  return response.data
};

export const editWorkout = async (
  id: string,
  request: CreateWorkoutRequest,
): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.put(
    endpoints.workouts.update(id),
    { ...request },
  )

  return response.data
};

export const getWorkoutEquipments = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.get(
    endpoints.workouts.equipment(id),
  )
  return response.data
}

export const createWorkoutEquipment = async (
  id: string,
  request: any,
): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.post(
    endpoints.workouts.equipment(id),
    request,
  )
  return response.data
}

export const deleteWorkoutEquipment = async (
  id: string,
  equipment_id: string,
): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.delete(
    endpoints.workouts.deleteEquipment(id, equipment_id),
  )
  return response.data
}