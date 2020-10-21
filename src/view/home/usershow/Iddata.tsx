import React, { Component } from 'react'
import { Table } from 'antd';
import {userIdentity} from '@/api/user'

export default class Iddata extends Component {
    state = {
        columns: [
            {
                title: '身份名称',
                dataIndex: 'identity_text',
                key: 'identity_text',
            },
        ],
        userIndentityData: []
    }
    render() {
        return (
            <div>
               <Table columns={this.state.columns} dataSource={this.state.userIndentityData} rowKey="identity_id"/>
            </div>
        )
    }
    componentDidMount () {
        this.getUserIndentity();
        
    }
    async getUserIndentity () {
        const res = await userIdentity ();
        this.setState ({
            userIndentityData: res.data.data
        })
    }
}
