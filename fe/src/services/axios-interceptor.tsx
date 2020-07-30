import Axios from 'axios';
import { Conf } from '../config';
import { Util } from '../utils/utils';
import { message } from 'antd';
// const axiosApiInstance = Axios.create();

Axios.interceptors.request.use(
    async config => {
        const accessToken = localStorage.getItem("access_token")
        config.headers = {
            'Authorization': `Bearer ${accessToken}`,
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

Axios.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await refreshAccessToken();
        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return Axios(originalRequest);
    }
    return Promise.reject(error);
});

const refreshAccessToken = () => {
    Axios.post(`${Conf.API_URL}/token/refresh`, { refresh_token: localStorage.getItem("refresh_token") })
        .then((response) => {
            console.log("login response", response);
            localStorage.setItem("access_token", response.data.data.access_token);
            localStorage.setItem("refresh_token", response.data.data.refresh_token);
        })
        .catch(function (error) {
            message.destroy()
            message.error(Util.isSet(() => error.response.data.error, "Error logging in user!"), 4);
        });
}