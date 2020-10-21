import React, { Component } from 'react'
import {observer,inject} from 'mobx-react'
import { Table } from 'antd';

interface Iprops {
    user: any,
    userData: Array<any>
}

@inject('user')
@observer
export default class Userdata extends Component<Iprops> {
    state = {
        columns: [
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name',
            },
            {
                title: '密码',
                dataIndex: 'user_pwd',
                key: 'user_pwd',
            },
            {
                title: '身份',
                dataIndex: 'identity_text',
                key: 'identity_text',
            }
        ],
    }
    render() {
        const {userData} = this.props.user;
        return (
            <div className="userdata">
                <Table columns={this.state.columns} dataSource={userData} rowKey="user_id"/>
            </div>
        )
    }
    componentDidMount () {
        const {getUserData} = this.props.user;
        getUserData ();
    }
}
