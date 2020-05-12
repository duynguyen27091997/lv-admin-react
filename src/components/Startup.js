import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {AxiosAdBe, AxiosUsBe} from "../utils/axios";
import {setAuth} from "../actions/rootAction";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "../protected.route";
import App from "../App";
import Loading from "./common/Loading";
import {sleep} from "../helpers/helpers";

const Startup = (props) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(_ => {
        let token = localStorage.getItem('token');
        AxiosAdBe.post('api/check-login', {token})
            .then(({data: res}) => {
                if (res.success) {
                    dispatch(setAuth(res.data.user));
                    AxiosUsBe.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                    AxiosAdBe.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                }
            })
            .catch(err => {
                dispatch(setAuth({}));
            })
            .finally(_ => {
                sleep(1000).then(_ => setLoading(false))
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (!loading)
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <ProtectedRoute path='/' component={App}/>
                </Switch>
            </BrowserRouter>
        )
    else
        return <Loading/>
};

export default Startup;