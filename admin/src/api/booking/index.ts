import { AxiosResponse } from 'axios'
import { GetBookingsRequest } from './interfaces'
import axios from '@/common/utils/axios'
import endpoints from '../endpoints'

export const getBookings = async (
  request?: Partial<GetBookingsRequest>,
): Promise<any> => {
  const params = new URLSearchParams();

  // Conditionally append parameters only if they are provided
  if (request?.page !== undefined)
    params.append('page', request.page.toString());
  if (request?.take !== undefined)
    params.append('take', request.take.toString());
  if (request?.sort_enum) params.append('sort_enum', request.sort_enum);
  if (request?.sort_by) params.append('sort_by', request.sort_by);
  if (request?.status) params.append('status', request.status);
  if (request?.field && request?.type && request?.value) {
    params.append('field', request.field);
    params.append('type', request.type);
    params.append('value', request.value);
  }

  if (request?.member_id) {
    params.append('member_id', request.member_id)
  }

  if (request?.start_date && request?.end_date) {
    params.append('start_date', request.start_date)
    params.append('end_date', request.end_date)
  }
  if (request?.status) {
    params.append('status', request.status)
  }

  const response: AxiosResponse<any> = await axios.get(
    endpoints.bookings.list,
    { params: params },
  );

  return response.data;
}

export const createListBooking = async (request: any): Promise<any> => {
  const response: AxiosResponse<any> = await axios.post(
    endpoints.bookings.create,
    request,
  );
  return response.data;
}

export const autoAssignBooking = async (request: any): Promise<any> => {
  const response: AxiosResponse<any> = await axios.post(
    endpoints.bookings.autoAssign,
    request,
  );
  return response.data;
}

export const recommendTrainers = async (id: string): Promise<any> => {
  const response: AxiosResponse<any> = await axios.get(
    endpoints.bookings.recommend(id),
  );
  return response.data;
}

export const saveBooking = async (request: any): Promise<any> => {
  const response: AxiosResponse<any> = await axios.put(
    endpoints.bookings.saveSchedule,
    request,
  );
  return response.data;
}