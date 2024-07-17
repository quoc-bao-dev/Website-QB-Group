import axios from 'axios';
import toastr from 'toastr';
import { BASE_URL } from '../config/config';

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
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
            let errorMessage = data.message || 'An error occurred';

            switch (status) {
                case 400:
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
                                console.log('end refrsh token::::::::::::');

                                localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
                                return axios(originalRequest);
                            } catch (error) {
                                console.log('refresh token fail:::::::::::::::');
                                console.log(error);
                            }
                        }
                    }

                    break;
                case 403:
                case 404:
                case 409:
                case 422:
                case 500:
                case 503:
                    // toastr.error(errorMessage);
                    break;
                default:
                    // toastr.error('Unknown Error');
                    break;
            }
        } else if (error.request) {
            toastr.error('No response received from server');
        } else {
            toastr.error(error.message);
        }

        return Promise.reject(error);
    }
);
