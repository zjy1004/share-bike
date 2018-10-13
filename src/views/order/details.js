import React, {Component} from 'react';
import { Card } from 'antd'
import DetailHeader from '../../components/header/detailHeader'
import './details.less'
import axios from '../../axios'

 class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: {}
        };
    }
     componentDidMount() {
        this.getDetailInfo()
     }
     getDetailInfo = () => {
         const {detailid} = this.props.match.params;
         axios.get(`/order/detail`, {id: detailid}).then(res => {
             if(res.code == 0){
                 console.log(res);
                 this.initMap(res.result);
                 this.setState({
                     orderInfo: res.result
                 })
             }
         })
     };

     //初始化地图
     initMap = (result)=> {
         const BMap = window.BMap;
         this.map = new BMap.Map("bmap-container"); // 创建地图实例
         const point = new BMap.Point(result.position_list[0].lon, result.position_list[0].lat);
         // 创建点坐标
         this.map.centerAndZoom(point, 11);
         this.addMapControl();  //添加控件
         //绘制折线图
         this.drawPolyline(result.position_list);
         //绘制服务区
         this.drawServiceArea(result.area)
     };
    // 添加控件
     addMapControl = () => {
         const BMap = window.BMap;
         const map = this.map;
         map.addControl(new BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
         //添加比例尺控件
         map.addControl(new BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
     };

    //绘制路径折线图
     drawPolyline = (position_list) => {
         const map = this.map;
         const BMap = window.BMap;
         const startPoint = position_list[0];
         const endPoint = position_list[position_list.length-1];

         const startMapPoint = new BMap.Point(startPoint.lon, startPoint.lat);//绘制一个百度地图起始点
         const startIcon = new BMap.Icon("/imgs/start_point.png", new BMap.Size(36, 42), {
             imageSize: new BMap.Size(36,42)
         });// 定义起始点图标
         const endMapPoint = new BMap.Point(endPoint.lon, endPoint.lat);//绘制一个百度地图结束点
         const endIcon = new BMap.Icon("/imgs/end_point.png", new BMap.Size(36, 42), {
             imageSize: new BMap.Size(36,42)
         });// 定义结束点图标

         const startMarker = new BMap.Marker(startMapPoint, {icon: startIcon});
         const endMarker = new BMap.Marker(endMapPoint, {icon: endIcon});
         map.addOverlay(startMarker);//添加起始坐标点
         map.addOverlay(endMarker);//添加结束坐标点

         let polylineArr = position_list.map(point => {
             return new BMap.Point(point.lon, point.lat)
         });
         const polyline = new BMap.Polyline(polylineArr,
             {strokeColor:"#1869AD", strokeWeight:3, strokeOpacity:1}
         );
         map.addOverlay(polyline);
     };
     //绘制服务区
     drawServiceArea = (area) => {
         const BMap = window.BMap;
         const map = this.map;

         let serviceArr = area.map(point => {
             return new BMap.Point(point.lon, point.lat)
         });

         const polygon = new BMap.Polygon(serviceArr, {
             strokeColor: '#ff0000',
             fillColor: '#ff6700',
             fillOpacity: 0.5
         });

         map.addOverlay(polygon)
     };


    render() {
        const info = this.state.orderInfo;
        return (
            <div className="detail">
                <DetailHeader></DetailHeader>
                <Card>
                    <div className="bmap-wrap" id="bmap-container"> </div>
                    <div className="detail-info">
                        <div className="item-title">
                            基础信息
                        </div>
                        <ul>
                            <li>
                                <span className="info-left">用车模式</span>
                                <span className="info-right">{info.mode == 1 ? '服务区': '停车点'}</span>
                            </li>
                            <li>
                                <span className="info-left">订单编号</span>
                                <span className="info-right">{info.order_sn}</span>
                            </li>
                            <li>
                                <span className="info-left">车辆编号</span>
                                <span className="info-right">{info.bike_sn}</span>
                            </li>
                            <li>
                                <span className="info-left">用户姓名</span>
                                <span className="info-right">{info.user_name}</span>
                            </li>
                            <li>
                                <span className="info-left">手机号码</span>
                                <span className="info-right">{info.mobile}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-info">
                        <div className="item-title">
                            行驶轨迹
                        </div>
                        <ul className='info-wrap'>
                            <li>
                                <span className="info-left">行程起点</span>
                                <span className="info-right">{info.start_location}</span>
                            </li>
                            <li>
                                <span className="info-left">行程终点</span>
                                <span className="info-right">{info.end_location}</span>
                            </li>
                            <li>
                                <span className="info-left">行驶里程</span>
                                <span className="info-right">{info.distance/1000 + 'KM'}</span>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}
export default OrderDetails;

