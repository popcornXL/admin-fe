'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';

import MMUtile      from 'util/mm.jsx';
import Product      from 'service/product.jsx';

const _mm = new MMUtile();
const _product = new Product();


const ProductDetail = React.createClass({
    getInitialState() {
        return {
            id                  : this.props.params.pId,
            firstCategoryList   : [],
            firstCategoryId     : '',
            secondCategoryList  : [],
            secondCategoryId    : '',
            name                : '',
            subtitle            : '',
            subImages           : [],
            price               : '',
            stock               : '',
            detail              : '',
            status              : ''

        };
    },
    componentDidMount: function(){
        // 初始化一級分類
        this.loadFirstCategory();
        // 初始化產品
        this.loadProduct();
    },
    // 加載一級分類
    loadFirstCategory(){
        // 查詢一級品類時，不傳id
        _product.getCategory().then(res => {
            this.setState({
                firstCategoryList: res
            });
        }, err => {
            alert(err.msg || '哪裡出錯了~');
        });
    },
    // 加載二級分類
    loadSecondCategory(){
        // 一級品類不存在時，不初始二級分類
        if(!this.state.firstCategoryId){
            return;
        }
        // 查詢一級品類時，不傳id
        _product.getCategory(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList  : res,
                secondCategoryId    : this.state.secondCategoryId
            });
        }, err => {
            alert(err.msg || '哪裡出錯了~');
        });
    },
    // 编辑的时候，需要初始化商品信息
    loadProduct(){
        // 有id參數時，讀取商品資訊
        if(this.state.id){
            // 查詢一級品類時，不傳id
            _product.getProduct(this.state.id).then(res => {
                let product = this.productAdapter(res)
                this.setState(product);
                // 有二級分類時，load二級列表
                if(product.firstCategoryId){
                    this.loadSecondCategory();
                }
            }, err => {
                alert(err.msg || '哪裡出錯了~');
            });
        }
    },
    // 配接口返回的數據
    productAdapter(product){
        // 如果父品類是0(根品類)，則categoryId作為一級品類
        let firstCategoryId     = product.parentCategoryId === 0 ? product.categoryId : product.parentCategoryId,
            secondCategoryId    = product.parentCategoryId === 0 ? '' : product.categoryId;
        return {
            categoryId          : product.categoryId,
            name                : product.name,
            subtitle            : product.subtitle,
            subImages           : product.subImages.split(','),
            detail              : product.detail,
            price               : product.price,
            stock               : product.stock,
            firstCategoryId     : firstCategoryId,
            secondCategoryId    : secondCategoryId,
            status              : product.status
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="商品詳情"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">商品名稱</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.name}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.subtitle}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">當前狀態</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.status == 1 ? '在售' : '已下架'}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">所屬分類</label>
                                <div className="col-md-10">
                                    <select type="password" className="form-control cate-select col-md-5" value={this.state.firstCategoryId} readOnly>
                                        <option value="">請選擇一級品類</option>
                                        {
                                            this.state.firstCategoryList.map((category, index) => {
                                                return (
                                                    <option value={category.id} key={index}>{category.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                    {this.state.secondCategoryList.length ?  
                                        <select type="password" className="form-control cate-select col-md-5" value={this.state.secondCategoryId} readOnly>
                                            <option value="">請選擇二級品類</option>
                                            {
                                                this.state.secondCategoryList.map((category, index) => {
                                                    return (
                                                        <option value={category.id} key={index}>{category.name}</option>
                                                    );
                                                })
                                            }
                                        </select> : null
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price" className="col-md-2 control-label">商品價格</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" 
                                            className="form-control" 
                                            id="price" 
                                            placeholder="價格"
                                            value={this.state.price}
                                            readOnly/>
                                        <div className="input-group-addon">元</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock" className="col-md-2 control-label">商品庫存</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" 
                                            className="form-control" 
                                            id="stock"
                                            placeholder="庫存" 
                                            value={this.state.stock}
                                            readOnly/>
                                        <div className="input-group-addon">件</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">商品圖片</label>
                                <div className="img-con col-md-10">
                                    {
                                        this.state.subImages.length ? this.state.subImages.map((image, index) => {
                                            return (
                                                <div className="sub-img" key={index}>
                                                    <img className="img" src={_mm.getImageUrl(image)}/>
                                                </div>
                                            );
                                        }) : <div className="notice">沒有圖片</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">商品詳情</label>
                                <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default ProductDetail;