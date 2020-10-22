import React, { Component } from 'react'
import { Table } from 'antd';
import {idnapi} from '@/api/user'

export default class Idnapi extends Component {
    state = {
        columns: [
            {
                title: '身份名称',
                dataIndex: 'identity_text',
                key: 'api_authority_id',
            },
            {
                title: 'api权限名称',
                dataIndex: 'api_authority_text',
                key: 'api_authority_id',
            },
            {
                title: 'api权限url',
                dataIndex: 'api_authority_url',
                key: 'api_authority_id',
            },
            {
                title: 'api权限方法',
                dataIndex: 'api_authority_method',
                key: 'api_authority_id',
            },
        ],
        userIndentityData: []
    }
    render() {
        return (
            <div>
               <Table columns={this.state.columns} dataSource={this.state.userIndentityData} rowKey="identity_api_authority_relation_id"/>
            </div>
        )
    }
    componentDidMount () {
        this.getUserIndentity();
        
    }
    async getUserIndentity () {
        const res = await idnapi ();
        console.log(res);
        this.setState ({
            userIndentityData: res.data.data
        })
    }
}
