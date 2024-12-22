import endpoints from '@/api/endpoints'
import axios from '@/common/utils/axios'
import { AxiosResponse } from 'axios'


export const createSession = async (request: any): Promise<any> => {
    const response: AxiosResponse<any> = await axios.post(
        endpoints.session.create,
        request,
    )
    return response.data
}

export const updateSession = async (id: string, request: any): Promise<any> => {
    const response: AxiosResponse<any> = await axios.put(
        endpoints.session.update(id),
        request,
    )
    return response.data
}

export const deleteSession = async (id: string): Promise<any> => {
    const response: AxiosResponse<any> = await axios.delete(
        endpoints.session.delete(id),
    )
    return response.data
}

export const addWorkoutToSession = async (id: string, workoutId: string): Promise<any> => {
    const response: AxiosResponse<any> = await axios.post(
        endpoints.session.workout(id, workoutId),
    )
    return response.data
}

export const removeWorkoutFromSession = async (id: string, workoutId: string): Promise<any> => {
    const response: AxiosResponse<any> = await axios.delete(
        endpoints.session.workout(id, workoutId),
    )
    return response.data
}