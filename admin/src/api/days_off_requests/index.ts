import axios from '@/common/utils/axios'
import { AxiosResponse } from 'axios'
import endpoints from '../endpoints'
import {
    CreateDaysOffRequestRequest,
    CreateDaysOffRequestResponse,
    EditDaysOffRequestRequest,
    GetDaysOffRequestsRequest,
} from './interfaces'
import { CommonResponse, SearchResponse } from '../response';

export const createDaysOffRequest = async (
    request: CreateDaysOffRequestRequest,
): Promise<CreateDaysOffRequestResponse> => {
    const response: AxiosResponse<CreateDaysOffRequestResponse> = await axios.post(
        endpoints.daysOff.create,
        request,
    )
    return response.data
}

export const getDaysOffRequests = async (
    request: GetDaysOffRequestsRequest,
): Promise<any> => {
    const params = new URLSearchParams();
    if (request.page !== undefined) params.append('page', request.page.toString());
    if (request.take !== undefined ) params.append('take', request.take.toString());
    if (request.sort_enum) params.append('sort_enum', request.sort_enum);
    if (request.sort_by) params.append('sort_by', request.sort_by);
    if (request.status) params.append('status', request.status);
    if (request.field && request.type && request.value) {
        params.append('field', request.field);
        params.append('type', request.type);
        params.append('value', request.value);
    }

    const response: AxiosResponse<SearchResponse<any>> = await axios.get(
        endpoints.daysOff.list,
        { params: params },
    )
    return response.data
}

export const deleteDaysOffRequest = async (id: string): Promise<any> => {
    const response: AxiosResponse<CommonResponse<any>> = await axios.delete(
        endpoints.daysOff.delete(id),
    )

    return response.data
};

export const getDetailDaysOffRequest = async (id: string): Promise<any> => {
    const response: AxiosResponse<CommonResponse<any>> = await axios.get(
        endpoints.daysOff.detail(id),
    )
    return response.data
};

export const editDaysOffRequest = async (
    id: string,
    request: EditDaysOffRequestRequest,
): Promise<any> => {
    const response: AxiosResponse<CommonResponse<any>> = await axios.put(
        endpoints.daysOff.update(id),
        { ...request },
    )

    return response.data
};

export const approveDaysOffRequest = async (id: string): Promise<any> => {
    const response: AxiosResponse<CommonResponse<any>> = await axios.patch(
        endpoints.daysOff.approve(id),
    )

    return response.data
}

export const rejectDaysOffRequest = async (id: string): Promise<any> => {
    const response: AxiosResponse<CommonResponse<any>> = await axios.patch(
        endpoints.daysOff.reject(id),
    )

    return response.data
}

