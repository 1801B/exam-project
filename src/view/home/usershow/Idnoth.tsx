import React, { Component } from 'react'
import { Table } from 'antd';
import {idnoth} from '@/api/user'

export default class Idnoth extends Component {
    state = {
        columns: [
            {
                title: '身份',
                dataIndex: 'identity_text',
                key: 'identity_view_authority_relation_id',
            },
            {
                title: '视图权限名称',
                dataIndex: 'view_authority_text',
                key: 'identity_view_authority_relation_id',
            },
            {
                title: '视图id',
                dataIndex: 'view_id',
                key: 'identity_view_authority_relation_id',
            },
        ],
        userIndentityData: []
    }
    render() {
        return (
            <div>
               <Table columns={this.state.columns} dataSource={this.state.userIndentityData} rowKey="identity_view_authority_relation_id"/>
            </div>
        )
    }
    componentDidMount () {
        this.getUserIndentity();
        
    }
    async getUserIndentity () {
        const res = await idnoth ();
        console.log(res);
        this.setState ({
            userIndentityData: res.data.data
        })
    }
}
