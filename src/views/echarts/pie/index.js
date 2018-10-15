import React, { Component } from 'react';
import {Card} from 'antd'
// import echarts from 'echarts/lib/echarts' // 引入echarts核心包
// import lightTheme from '../themeLight'

import 'echarts/lib/chart/pie'  // 引入饼状图
import 'echarts/lib/component/legend' // 引入legend组件
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import ReactEcharts from 'echarts-for-react'

 class Pie extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
     // componentWillMount() {
     //     echarts.registerTheme('huashan', lightTheme)
     //     this.Pie1()
     //     this.Pie2()
     // }

     pie1 = () => {
         return {
             title : {
                 text: '用户骑行订单',
                 x:'center'
             },
             tooltip : {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             legend: {
                 orient: 'vertical',
                 right: '20',
                 top: '20',
                 data: ['周一','周二','周三','周四','周五','周六','周日']
             },
             series : [
                 {
                     name: '骑行订单',
                     type: 'pie',
                     radius : '70%',
                     center: ['50%', '60%'],
                     data:[
                         {value:335, name:'周一'},
                         {value:310, name:'周二'},
                         {value:234, name:'周三'},
                         {value:135, name:'周四'},
                         {value:1548, name:'周五'},
                         {value:420, name:'周六'},
                         {value:548, name:'周日'}
                     ],
                     itemStyle: {
                         emphasis: {
                             shadowBlur: 10,
                             shadowOffsetX: 0,
                             shadowColor: 'rgba(0, 0, 0, 0.4)'
                         }
                     }
                 }
             ]
         }
     };
     pie2 = () => {
         return {
             title : {
                 text: '用户骑行订单',
                 x:'center'
             },
             tooltip : {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             legend: {
                 orient: 'vertical',
                 right: '20',
                 top: '20',
                 data: ['周一','周二','周三','周四','周五','周六','周日']
             },
             series : [
                 {
                     name: '骑行订单',
                     type: 'pie',
                     radius : ['55%', '75%'],
                     center: ['50%', '60%'],
                     data:[
                         {value:335, name:'周一'},
                         {value:310, name:'周二'},
                         {value:234, name:'周三'},
                         {value:135, name:'周四'},
                         {value:1548, name:'周五'},
                         {value:420, name:'周六'},
                         {value:548, name:'周日'}
                     ],
                     itemStyle: {
                         emphasis: {
                             shadowBlur: 10,
                             shadowOffsetX: 0,
                             shadowColor: 'rgba(0, 0, 0, 0.4)'
                         }
                     }
                 }
             ]
         }
     };

    render() {
        return (
            <div>
                <Card
                    title="饼状图一"
                >
                    <ReactEcharts option={this.pie1()}></ReactEcharts>
                </Card>
                <Card
                    title="饼状图二"
                >
                    <ReactEcharts option={this.pie2()}></ReactEcharts>
                </Card>
            </div>
        )
    }
}
export default Pie;

