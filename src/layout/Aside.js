import React from 'react';
import './aside.scss';
import Logo from "../common/Logo";
import AsideListItem from "../components/aside/AsideListItem";

const menu = [
    {
        text: 'Trang chủ',
        icon:'las la-campground',
        url:'/',
    },
    {
        text: 'Quản lí khoá học',
        icon:'las la-book',
        url:'',
        subMenu:[
            {
                text:'Tạo khoá học',
                icon:'las la-plus',
                url:'/create-courses'
            },
            {
                text:'Khoá học của tôi',
                icon:'las la-archive',
                url:'/manage-contents'
            }
        ]
    },
    {
        text: 'Danh sách',
        icon:'las la-tasks',
        url:'',
        subMenu:[
            {
                text:'Danh sách khoá học',
                icon:'las la-list',
                url:'/list-courses'
            },
            {
                text:'Danh sách học viên',
                icon:'las la-user-circle',
                url:'/list-members'
            }
        ]
    },
    {
        text: 'Quản trị',
        icon:'las la-cog',
        url:'',
        subMenu:[
            {
                text:'Thêm người dùng',
                icon:'las la-plus',
                url:'/create-user'
            },
            {
                text:'Quản trị người dùng',
                icon:'las la-user-alt',
                url:'/list-users'
            }
        ]
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