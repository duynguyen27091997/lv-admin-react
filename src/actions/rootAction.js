import {AxiosAdBe} from "../utils/axios";
import qs from 'querystring';

export let SET_AUTH = 'SET_AUTH';

export const setAuth = function (res) {
    return {
        type: SET_AUTH,
        res
    }
}
export let LOG_OUT = 'LOG_OUT';
export const logOut = function () {
    localStorage.removeItem('token');
    return {
        type: LOG_OUT,
        res: {}
    }
}
export const login = function (params) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            AxiosAdBe.post('api/login', qs.stringify(params))
                .then(res => {
                    if (res.data.data && res.data.data.user)
                        dispatch(setAuth(res.data.data.user))
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                    console.log(err)
                })
        })
    }
}
export const createUser = function (params) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            AxiosAdBe.post('/api/user', qs.stringify(params))
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                    console.log(err)
                })
        })
    }
}