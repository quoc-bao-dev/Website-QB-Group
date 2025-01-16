import axios from 'axios';
import toastr from 'toastr';
import { BASE_URL } from '../config/config';
import toast from '../util/toast';

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('accessToken')!);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response) {
            const { status, data } = error.response;
            let errorMessage = data.error || 'An error occurred';

            switch (status) {
                case 400:
                    toast.error(errorMessage);
                    break;
                case 401:
                    // refresh token

                    if (!originalRequest._retry) {
                        originalRequest._retry = true;
                        const refreshToken = localStorage.getItem('refreshToken');
                        if (refreshToken) {
                            try {
                                console.log('refresh token::::: ');

                                const response = (await axios({
                                    method: 'post',
                                    url: `${BASE_URL}authen/refresh-token`,
                                    data: {
                                        refreshToken: JSON.parse(refreshToken),
                                    },
                                })) as any;
                                console.log('end refresh token::::::::::::');

                                localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
                                return axios(originalRequest);
                            } catch (error) {
                                console.log('refresh token fail:::::::::::::::');
                            }
                        }
                    }

                    break;
                case 403:
                    toast.error(errorMessage);
                    break;
                case 404:
                    toast.error(errorMessage);
                    break;
                case 409:
                    toast.error(errorMessage);
                    break;
                case 422:
                    toast.error(errorMessage);
                    break;
                case 500:
                    toast.error(errorMessage);
                    break;
                case 503:
                    toast.error(errorMessage);
                    break;
                default:
                    // toastr.error('Unknown Error');
                    break;
            }
        } else if (error.request) {
            toastr.error('No response received from server');
        } else {
        }

        return Promise.reject(error);
    }
);
