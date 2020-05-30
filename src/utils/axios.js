import axios from 'axios';
/* request pre-processing */
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export const AxiosAdBe = axios.create({
    baseURL: 'http://api.smallcode.info/admin/',
});
export const AxiosUsBe = axios.create({
    baseURL: 'http://api.smallcode.info/users/',
});