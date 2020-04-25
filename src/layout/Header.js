import React from 'react';
import User from "../components/user/User";

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-6">

                    </div>
                    <div className="col-6">
                        <div className={'d-flex justify-content-end'}>
                            <User/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;