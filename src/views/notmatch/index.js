import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import notFoundImg from './img.gif'
import './index.less'


class NotMatch extends Component {
    render() {
        return (
            <div className='not-found clearfix'>
                <div className='not-found-left fll'>
                    <div className="title">
                        Sorry!
                    </div>
                    <h2 className="desc">
                        404 您要的页面我没有找到！
                    </h2>
                    <div className="not-found-content">
                        <p>如有不满，请你自己找原因</p>
                        <ul>
                            <li><Link to="/admin/home">或者你可以滚去首页</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='img-wrap fll'>
                    <img src={notFoundImg} />
                </div>
            </div>
        );
    }
}

export default NotMatch;