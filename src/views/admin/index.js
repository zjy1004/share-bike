import React, { Component } from 'react';
import NavLeft from '../../components/navLeft'
import Header from '../../components/header'
import Footer from '../../components/footer'
import {Row, Col} from 'antd'
import './index.less'

class Admin extends Component {

    render() {
        return (
            <div className="admin">
                <Row>
                    <Col span={4} className="nav-left-wrap"><NavLeft /></Col>
                    <Col span={20} style={{height: '100vh', overflow: 'auto'}}>
                        <Header />
                        <div className="content-wrap">
                            <div className="content">
                                {this.props.children}
                            </div>
                        </div>
                    </Col>
                    <Footer/>
                </Row>
            </div>
        );
    }
}

export default Admin;