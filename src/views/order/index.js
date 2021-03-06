import React, {Component} from 'react';
import './index.less';
import axios from '../../axios/index';
import { Form, Select, Card, DatePicker, Button ,Table, message, Modal} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class Order extends Component {
    constructor(props) {
    super(props);
    this.state = {
            dataSource: [],
            pageSize: '',
            total: '',
            isLoading: false,
            selectedRowKeys: [],
            endItem: {}
        };
 }
    componentWillMount() {
        this.getTable()
    };
    params = {
        pn: 1
    };
    //获取数据
    getTable = () => {
        this.setState({
            isLoading: true
        });
      axios.get('/order/list', this.params).then(res => {
          if (res.code == 0) {
                this.setState({
                    dataSource: res.result.item_list.map((item, index) => {
                        item.key = index;
                        return item
                    }),
                    pageSize: 10,
                    total: res.result.total_count,
                    isLoading: false
                })
          }
      })
    };

    //查询获取表单数据
    handleSearch = () => {
        const form = this.props.form.getFieldsValue();
        console.log(form);
};
    //重置表单数据
    handleReset = () => {
        this.props.form.resetFields()
    };
    //结束订单(弹出确认框，展示数据并让用用户决定是否结束订单)
    handleDone = () => {
        let selectedItem = this.state.selectedItem;
        if (selectedItem) {
            axios.get('/order/ebike_info', {id: selectedItem[0].id}).then(res => {
                console.log(res);
                this.setState({
                    endItem: res.result,
                    isShowModal: true
                })
            })
        } else {
            Modal.info({
                title: '操作提示',
                content: '请选择一条订单结束',
                onOk(){},
            })
        }
    };
    //用户已经决定去结束这个订单
    handleEnd = () => {
        let id = this.state.selectedItem[0].id;
        this.setState({
            isShowModal: false
        });
        axios.get('/order/finish_order', {id}).then(res => {
            if (res.code == 0) {
                message.success('结束订单成功');
                this.getTable()
            }
        })
    };
    //跳转到订单详情
    handleDetail = () => {
        let item = this.state.selectedItem;
        if (item) {
            window.open(`/#/common/order/details/${item[0].id}`, '_blank')
        } else {
            Modal.info({
                title: '提示',
                content: '请选择一个订单'
            })
        }
    };

render() {
    const cityData = [
        {
            label: '北京',
            id: '0'
        },
        {
            label: '上海',
            id: '1'
        },
        {
            label: '广东',
            id: '2'
        }
    ];
    const orderData = [
        {
            label: '全部',
            id: 0
        },
        {
            label: '进行中',
            id: 1
        },
        {
            label: '结束行程',
            id: 2
        }
    ];
    const { getFieldDecorator } = this.props.form;
    const tableColumns = [
        {
            title:'订单编号',
            dataIndex:'order_sn',
            key: 'order_sn'
        },
        {
            title: '车辆编号',
            dataIndex: 'bike_sn',
            key: 'bike_sn'
        },
        {
            title: '用户名',
            dataIndex: 'user_name',
            key: 'user_name'
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile'
        },
        {
            title: '里程',
            dataIndex: 'distance',
            render(distance){
                return distance/1000 + 'Km';
            },
            key: 'distance'
        },
        {
            title: '行驶时长',
            dataIndex: 'total_time',
            key: 'total_time'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
            key: 'start_time'
        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
            key: 'end_time'
        },
        {
            title: '订单金额',
            dataIndex: 'total_fee',
            key: 'total_fee'
        },
        {
            title: '实付金额',
            dataIndex: 'user_pay',
            key: 'user_pay'
        }
    ];
    const pagination = {
      total: this.state.total,
      pageSize: 10,
      onChange:(index) => {
          this.params.pn = index;
          this.getTable()
      }
    };
    const rowSelection = {
        type: 'radio',
        selectedRowKeys: this.state.selectedIndex,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys, selectedRows);
            this.setState({
                selectedItem: selectedRows,
                selectedIndex: selectedRowKeys

            })
        }
    };

    return (
        <div className="order">
            <Card>
                <Form layout="inline">
                    <FormItem label='城市'>
                        {
                            getFieldDecorator('city')(
                                <Select placeholder='请选择一个城市' style={{width: 180}}>
                                    {cityData.map(item => <Option value={item.id} key={item.id}>{item.label}</Option>)}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label='订单时间'>
                        {
                            getFieldDecorator('date')(
                                <RangePicker></RangePicker>
                            )
                        }
                    </FormItem>
                    <FormItem label='订单状态'>
                        {
                            getFieldDecorator('orderStatus')(
                                <Select placeholder='请选择一个状态' style={{width: 220}}>
                                    {orderData.map(item => <Option value={item.id} key={item.id}>{item.label}</Option>)}
                                </Select>
                            )
                        }
                    </FormItem>
                </Form>
                <div className="btn-wrap">
                    <Button type='primary' onClick={this.handleSearch} className="mgr20">
                        查询
                    </Button>
                    <Button onClick={this.handleReset}>
                        重置
                    </Button>
                </div>
            </Card>
            <Card style={{marginTop: '-1px'}}>
                <Button type="primary" className="mgr20" onClick={this.handleDetail}>订单详情</Button>
                <Button onClick={this.handleDone}>结束订单</Button>
            </Card>
            <Card>
                <Table
                    pagination={pagination}
                    dataSource={this.state.dataSource}
                    columns={tableColumns}
                    loading={this.state.isLoading}
                    rowSelection={rowSelection}
                > </Table>
            </Card>
            <Modal
                title="结束订单"
                visible={this.state.isShowModal}
                onOk={this.handleEnd}
                onCancel={() => this.setState({isShowModal: false})}
            >
                <ul className='ul-data'>
                    <li>
                        <span className='car-num li-title'>车辆编号：</span>
                        {this.state.endItem.bike_sn}
                    </li>
                    <li>
                        <span className='car-num li-title'>剩余电量：</span>
                        {this.state.endItem.battery}
                    </li>
                    <li>
                        <span className='car-num li-title'>行程开始时间：</span>
                        {this.state.endItem.start_time}
                    </li>
                    <li>
                        <span className='car-num li-title'>当前位置：</span>
                        {this.state.endItem.location}
                    </li>
                </ul>

            </Modal>
        </div>
    )
 }
}

export default Form.create()(Order);


