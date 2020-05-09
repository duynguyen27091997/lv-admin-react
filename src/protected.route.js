import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const user = useSelector(state => state.main.user)
    return (
        <Route {...rest} render={
            props => {
                if (Object.keys(user).length !== 0)
                    return <Component {...rest} {...props}/>
                else
                    return <Redirect to={
                        {
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }
                    }/>
            }
        }/>

    );
};

export default ProtectedRoute;