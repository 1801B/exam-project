import React, { Component } from 'react'
import echarts from 'echarts'

export default class Echarts extends Component {
    state = {
        edata: {
            title: {
                text: '1801B第三小组'
            },
            tooltip: {},
            xAxis: {
                data: ['刘涵', '杨坤朋', '高泽康', '南佳佳', '耿文彦', '刘冠宗']
            },
            yAxis: {},
            series: [{
                name: '成绩',
                type: 'bar',
                color: 'hotpink',
                data: [100, 80, 78, 65, 90, 40]
            }]
        }
    }
    e18!: HTMLDivElement | null
    render() {
        return (
            <div className="echarts">
                <div className="e18" ref={el => this.e18 = el}>
                </div>
            </div>
        )
    }
    componentDidMount () {
        const myChart = echarts.init((this.e18 as HTMLDivElement));
        myChart.setOption (this.state.edata)
    }
}
