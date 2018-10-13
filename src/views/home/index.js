import React, { Component } from 'react';
import './index.less'
import Img from "../home/img.gif";


class Home extends Component {


    render() {
        return (
            <div className="home">
                好好学习react吧，将来能挣大钱
                <div className='img-wrap'>
                    <img src={Img} alt=""/>
                </div>
            </div>
        );
    }
}

export default Home;