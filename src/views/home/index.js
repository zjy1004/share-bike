import React, { Component } from 'react';
import './index.less'
import Img from "../home/img.gif";


class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="home">
                好好学习react吧，将来能挣大钱
                <div className='img-wrap'>
                    <img src={Img} />
                </div>
            </div>
        );
    }
}

export default Home;