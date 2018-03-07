'use strict';
import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class Product{
    
    // 獲取商品資訊
    getProduct(productId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/product/detail.do'),
            data    : {
                productId : productId || 0
            }
        });
    }
    // 獲得商品資訊
    getProductList(listParam){
        if(listParam.listType == 'list'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/product/list.do'),
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/product/search.do'),
                data    : listParam
            });
        }
            
    }
    // 儲存商品資訊
    saveProduct(product){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/product/save.do'),
            data    : product
        });
    }
    // 改變商品狀態
    setProductStatus(productId, status){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/product/set_sale_status.do'),
            data    : {
                productId   : productId,
                status      : status
            }
        });
    }
    // 獲得品類
    getCategory(parentCategoryId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/get_category.do'),
            data    : {
                categoryId : parentCategoryId || 0
            }
        });
    }
    // 新增品類
    saveCategory(category){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/add_category.do'),
            data    : {
                parentId        : category.parentId    || 0,
                categoryName    : category.categoryName  || ''
            }
        });
    }
    // 更新品類名稱
    updateCategoryName(category){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/set_category_name.do'),
            data    : category
        });
    }
}
