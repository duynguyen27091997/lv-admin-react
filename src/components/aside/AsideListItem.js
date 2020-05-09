import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

const AsideListItem = ({content}) => {
    let [show, setShow] = useState(false);

    const {text, url = '#', icon, subMenu = []} = content;
    let sub = null;

    if (subMenu.length) {
        sub = subMenu.map((li, i) => <li key={i}><NavLink exact={true} to={li.url}><i className={li.icon}/>{li.text}
        </NavLink></li>)
    }

    let div = <li className={''}>
        <span onClick={() => setShow(!show)}><i className={icon}/>{text}
            {sub && show ? <i className="las la-angle-up"/> : <i className="las la-angle-down"/>}
        </span>
        {
            sub
            &&
            show ?
                <ul className={'aside__sub-list'}>
                    {sub}
                </ul>
                :
                null
        }

    </li>;
    let link =<li className={''}>
        <NavLink exact={true} onClick={() => setShow(!show)} to={url}><i className={icon}/>{text}
        </NavLink>
    </li>;
    return (
        url ? link : div
    );
};

export default AsideListItem;