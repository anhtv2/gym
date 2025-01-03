import { AxiosResponse } from 'axios'
import { GetEquipmentsRequest } from './interfaces'
import axios from '@/common/utils/axios'
import endpoints from '../endpoints'

export const getEquipments = async (
  request?: Partial<GetEquipmentsRequest>,
): Promise<any> => {
  const params = new URLSearchParams();

  // Conditionally append parameters only if they are provided
  if (request?.page !== undefined)
    params.append('page', request.page.toString());
  if (request?.take !== undefined)
    params.append('take', request.take.toString());
  if (request?.sort_enum) params.append('sort_enum', request.sort_enum);
  if (request?.sort) params.append('sort', request.sort);
  if (request?.status) params.append('status', request.status);
  if (request?.field && request?.type && request?.value) {
    params.append('field', request.field);
    params.append('type', request.type);
    params.append('value', request.value);
  }

  const response: AxiosResponse<any> = await axios.get(
    endpoints.equipments.list,
    { params: params },
  );

  return response.data;
}
