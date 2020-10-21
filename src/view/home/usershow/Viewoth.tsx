import React, { Component } from 'react'
import { Table } from 'antd';
import {viewoth} from '@/api/user'

export default class Viewoth extends Component {
    state = {
        columns: [
            {
                title: '视图权限名称',
                dataIndex: 'view_authority_text',
                key: 'view_authority_id',
            },
            {
                title: '视图id',
                dataIndex: 'view_id',
                key: 'view_authority_id',
            },
        ],
        userIndentityData: []
    }
    render() {
        return (
            <div>
               <Table columns={this.state.columns} dataSource={this.state.userIndentityData} rowKey="view_authority_id"/>
            </div>
        )
    }
    componentDidMount () {
        this.getUserIndentity();
        
    }
    async getUserIndentity () {
        const res = await viewoth ();
        console.log(res);
        this.setState ({
            userIndentityData: res.data.data
        })
    }
}
