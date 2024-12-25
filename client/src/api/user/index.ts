import axiosInstance from "api/axios";
import { endpoint } from "api/endpoint";

export const getMe = async () => {
    const response = await axiosInstance.get(endpoint.user.me);
    return response.data;
}