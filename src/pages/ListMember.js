import React, {useEffect, useState} from 'react';
import {AxiosAdBe} from "../utils/axios";
import {Table} from "react-bootstrap";
import {toDateString} from "../helpers/helpers";


const ListMembers = () => {
    const [list, setList] = useState([])
    useEffect(_ => {
        AxiosAdBe.get('api/coder')
            .then(({data: res}) => {
                if (res.success) {
                    setList(res.data);
                }
            })
            .catch(err => {
                setList([]);
            })
    }, [])
    return (
        <div className={'content edit-content'}>
            <div className={'box'}>
                <h1 className={'title'}>Danh sách <i className="las la-angle-right"/> Danh sách học viên </h1>
                <Table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Tên đăng nhập</th>
                        <th>Ngày tạo</th>
                        <th>Dăng nhập lần cuối</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        list.map(member => <tr key={member.id}>
                            <td>{member.id}</td>
                            <td>{member.email}</td>
                            <td>{member.username}</td>
                            <td>{toDateString(member.createdAt)}</td>
                            <td>{toDateString(member.lastLogin)}</td>
                        </tr>)
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ListMembers;