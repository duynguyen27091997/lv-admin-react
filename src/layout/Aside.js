import React from 'react';
import './aside.scss';
import Logo from "../common/Logo";
import AsideListItem from "../components/aside/AsideListItem";

const menu = [
    {
        text: 'Quản lí khoá học',
        icon:'las la-campground',
        url:'',
        subMenu:[
            {
                text:'Tạo khoá học',
                icon:'las la-plus',
                url:'/create-courses'
            },
            {
                text:'Quản lý nội dung',
                icon:'las la-archive',
                url:'/manage-contents'
            }
        ]
    },
    {
        text: 'Nội dung',
        icon:'las la-tasks',
        url:'',
        subMenu:[
            {
                text:'Danh sách khoá học',
                icon:'las la-list',
                url:'/list-courses'
            },
            {
                text:'Danh sách người dùng',
                icon:'las la-user-alt',
                url:'/list-member'
            }
        ]
    },
    {
        text: 'Quản trị',
        icon:'las la-cog',
        url:'/setting',
    }
];

const Aside = () => {
    return (
        <aside className={'aside'}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <Logo/>
                        <ul className={'aside__list'}>
                            {
                                menu.map((li,i)=><AsideListItem key={i} content={li}/>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Aside;