
'use strict';

import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';

import Product      from 'service/product.jsx'

const _product = new Product();

const ProductCategoryAdd = React.createClass({
    getInitialState() {
        return {
            pageName        : '所屬品類',
            parentId        : 0,  // 所屬品類
            categoryName    : '', // 品類名稱
            categoryList    : []  // 品類集合
        };
    },
    componentDidMount: function(){
        // 查詢一級品類時，不傳id
        _product.getCategory().then(res => {
            this.setState({
                categoryList: res
            });
        }, errMsg => {
            alert(errMsg);
        });
    },
    onValueChange(e){
        let name   = e.target.name;
        this.setState({
            [name] : e.target.value
        });
    },
    onSubmit(e){
        e.preventDefault();
        if(!this.state.categoryName){
            alert('請輸入品類名稱');
            return;
        }
        // 請求接口
        _product.saveCategory({
            parentId      : this.state.parentId,
            categoryName    : this.state.categoryName
        }).then(res => {
            alert('商品添加成功');
            window.location.href='#/product.category/index';
        }, errMsg => {
            alert(errMsg);
        });
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="品類管理 -- 添加品類"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <form className="form-horizontal" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="col-md-2 control-label">{this.state.pageName}</label>
                                <div className="col-md-10">
                                    <select className="form-control cate-select" name="parentId" onChange={this.onValueChange}>
                                        <option value="0">/所有</option>
                                        {
                                            this.state.categoryList.map(function(category, index) {
                                                return (
                                                    <option value={category.id} key={index}>/所有/{category.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="category-name" className="col-md-2 control-label">品類名稱</label>
                                <div className="col-md-3">
                                    <input type="text" 
                                        className="form-control" 
                                        id="category-name" 
                                        name="categoryName"
                                        autoComplete="off"
                                        placeholder="請輸入品類名稱"
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-xl btn-primary">提交</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

export default ProductCategoryAdd;