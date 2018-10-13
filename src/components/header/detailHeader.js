import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './detailHeader.less'

 class DetailHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="detail-header clearfix">
                <div className="header-left fll ">
                    <h1>共享单车后台系统</h1>
                </div>
                <div className="header-right flr ">
                    <span className="username">
                        欢迎，James
                    </span>
                    <span className="logout">
                        <Link to='/common/login'>退出</Link>
                    </span>
                </div>
            </div>
        )
    }
}
export default DetailHeader;

