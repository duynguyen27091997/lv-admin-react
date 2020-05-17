import React from 'react';
import logo from '../assets/img/logo_transparent.png';
import {Link} from "react-router-dom";
const Logo = () => {
    return (
        <div className={'aside__logo p-5'}>
            <Link to={'/'}>
            <img src={logo} alt=""/>
            </Link>
        </div>
    );
};

export default Logo;