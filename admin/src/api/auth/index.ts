import { LoginRequest, LoginResponse } from './interfaces/login'
import { AxiosResponse } from 'axios'
import axios from '@/common/utils/axios'
import endpoints from '../endpoints'

export const postLogin = async (
  request: LoginRequest,
): Promise<LoginResponse> => {
  const response: AxiosResponse<LoginResponse> = await axios.post(
    endpoints.auth.login,
    { ...request },
  )

  return response.data
};
