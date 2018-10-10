import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './index.less'
import {formatDate} from '../../utils/inedx'
import axios from 'axios'


class Header extends Component {
    state = {
        time: '2018-08-01 22:22:22',
        weather: '低温4℃-高温16℃ 东北风微风'
    };
    getTime = () => {
      setInterval(() => {
          let unixDate = new Date().getTime();
          let timeStr = formatDate(unixDate);
          this.setState({
              time: timeStr
          })
      }, 1000)
    };
    getWeather = () => {
        axios.get(`http://t.weather.sojson.com/api/weather/city/101010100`).then(res => {
            let weatherData = res.data.data.forecast[0];
            let weatherStr = `${weatherData.low} ~ ${weatherData.high} ${weatherData.fx} ${weatherData.fl}`;
            this.setState({
                weather: weatherStr
            })
        })
    };
    componentWillMount() {
        this.getTime();
        this.getWeather()
    }
    render() {
        return (
            <div className="header">
                <div className="user-info clearfix">
                    <div className="flr exit">
                        <Link to='login'>退出</Link>
                    </div>
                    <div className="user-detail flr">
                        欢迎，<span className="username">James</span>
                    </div>
                </div>
                <div className="weather-wrap clearfix">
                    <div className="breadcrumb fll">首页</div>
                    <div className="weather flr clearfix">
                        <div className="date fll">{this.state.time}</div>
                        <div className="weather-detail fll">{this.state.weather}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;