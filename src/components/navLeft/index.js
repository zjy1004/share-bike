import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
import './index.less'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class NavLeft extends Component {
render() {
    return (
        <div className="nav-left">
            <Menu mode='vertical' theme='dark'>
                <MenuItem key='首页'>
                    <Link to='/admin/home'>首页</Link>
                </MenuItem>
                <MenuItem key='order'>
                    <Link to='/admin/order'>订单管理</Link>
                </MenuItem>
                <SubMenu
                    title="图例"
                >
                    <MenuItem key='/secondPage'>
                        <Link to='/admin/secondPage'>第二页</Link>
                    </MenuItem>
                    <MenuItem key='/admin/echarts/bar'>
                        <Link to='/admin/echarts/bar'>条形图</Link>
                    </MenuItem>
                    <MenuItem key='/admin/echarts/pie'>
                        <Link to='/admin/echarts/pie'>饼状图</Link>
                    </MenuItem>
                </SubMenu>
            </Menu>
        </div>
    );
}
}

export default NavLeft;