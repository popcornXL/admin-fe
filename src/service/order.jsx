
'use strict';

import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class Order{
    // 獲取訂單列表
    getOrderList(listParam){
        if(listParam.listType == 'list'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/order/list.do'),
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/order/search.do'),
                data    : listParam
            });
        } 
    }
    // 獲取訂單詳情
    getOrderDetail(orderNo){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/order/detail.do'),
            data    : {
                orderNo : orderNo || 0
            }
        });
    }
    // 發貨
    sendGoods(orderNo){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/order/send_goods.do'),
            data    : {
                orderNo : orderNo || 0
            }
        });
    }
}