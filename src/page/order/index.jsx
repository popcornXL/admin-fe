
'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';
import Pagination   from 'component/pagination/index.jsx';

import MMUtile      from 'util/mm.jsx';
import Order        from 'service/order.jsx';

const _mm = new MMUtile();
const _order = new Order();

// import './index.scss';

const OrderList = React.createClass({
    getInitialState() {
        return {
            list            : [],
            listType        : 'list', // list / search
            orderNumber     : '',
            pageNum         : 1,
            pages           : 0
        };
    },
    componentDidMount(){
       this.loadOrderList();
    },
    // 加載產品列表
    loadOrderList(){
        let listParam       = {};
        listParam.listType  = this.state.listType;
        listParam.pageNum   = this.state.pageNum;
        // 按商品名搜索
        if(this.state.listType ==='search'){
            listParam.orderNo = this.state.orderNumber;
        }
        // 查詢
        _order.getOrderList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    // 關鍵詞變化
    onOederNumberChange(e){
        let orderNumber = e.target.value.trim();
        this.setState({
            orderNumber : orderNumber
        });
    },
    // 搜索
    onSearch(){
        if(this.state.orderNumber){
            // setState是異步的
            this.setState({
                listType    : 'search',
                pageNum     : 1
            }, () => {
                this.loadOrderList();
            });
        }else{
            // setState是異步的
            this.setState({
                listType    : 'list',
                pageNum     : 1
            }, () => {
                this.loadOrderList();
            });
        }
            
    },
    // 頁數變化
    onPageNumChange(pageNum){
        this.setState({
            pageNum     : pageNum
        }, () => {
            this.loadOrderList();
        });
    },
    
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="訂單管理"/>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <select className="form-control">
                                    <option value="orderNumber">按訂單號查詢</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="訂單號" onChange={this.onOederNumberChange}/>
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>查詢</button>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>訂單號</th>
                                    <th>收件人</th>
                                    <th>訂單狀態</th>
                                    <th>訂單總額</th>
                                    <th>創建時間</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.length ? this.state.list.map((order, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <Link className="opear" to={ '/order/detail/' + order.orderNo}>{order.orderNo}</Link>
                                                </td>
                                                <td>{order.receiverName}</td>
                                                <td>{order.statusDesc}</td>
                                                <td>${order.payment}</td>
                                                <td>{order.createTime}</td>
                                                <td>
                                                    <Link className="opear" to={ '/order/detail/' + order.orderNo}>查看</Link>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                    (
                                        <tr>
                                            <td colSpan="6" className="text-center">沒有找到相對應的結果!</td>
                                        </tr>
                                    )
                                }
                                            
                            </tbody>
                        </table>
                    </div>
                    {
                    this.state.pages > 1 ? <Pagination onChange={this.onPageNumChange} 
                        current={this.state.pageNum} 
                        total={this.state.total} 
                        showLessItems/>: null
                    }
                </div>
            </div>
        );
    }
});

export default OrderList;