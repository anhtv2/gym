import { AxiosResponse } from 'axios'
import { SearchResponse } from '../response'
import axios from '@/common/utils/axios'
import endpoints from '../endpoints'
import { CommonResponse } from '../response'
import { CreateTrainerResponse, GetTrainersRequest } from './interfaces'

export const getTrainers = async (
  request: GetTrainersRequest,
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
    endpoints.trainers.list,
    { params: params },
  )

  return response.data
}

export const createTrainer = async (formData: FormData): Promise<any> => {
  const response: AxiosResponse<CommonResponse<CreateTrainerResponse>> =
    await axios.post(endpoints.trainers.create, formData)

  return response.data
}

export const getDetailTrainer = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.get(
    endpoints.trainers.detail(id),
  )

  return response.data
}

export const editTrainer = async (
  id: string,
  formData: FormData,
): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.put(
    endpoints.trainers.update(id),
    formData,
  )

  return response.data
}

export const deleteTrainer = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.delete(
    endpoints.trainers.delete(id),
  )

  return response.data
};

export const getAvailableWorkouts = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.get(
    endpoints.trainers.availableWorkouts(id),
  )

  return response.data
};

export const getWorkSchedule = async (id: string): Promise<any> => {
  const response: AxiosResponse<CommonResponse<any>> = await axios.get(
    endpoints.trainers.workSchedule(id),
  )

  return response.data
}
export const updateWorkSchedule = async (
  id: string,
  schedules: { day: number; shift: number; isSelected: boolean }[]
): Promise<CommonResponse<any>> => {
  try {
    const response: AxiosResponse<CommonResponse<any>> = await axios.patch(
      endpoints.trainers.updateWorkSchedule(id),
      schedules 
    );

    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error("Failed to update work schedules", error);
    throw error;
  }
};
