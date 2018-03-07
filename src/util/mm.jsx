'use strict';

const conf = {
    // online
    // serverHost: 'http://admin.popcornxl.com'
    // dev
    serverHost: '',
    imageHost: 'http://img.popcornxl.com/',
}

class MMUtil{
    // 請求server
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type       : param.method   || 'get',
                url        : param.url      || '',
                dataType   : param.type     || "json",
                data       : param.data     || null,
                success    : res => {
                    // 數據成功
                    if(0 === res.status){
                        typeof resolve === 'function' && resolve(res.data || res.msg);
                    }
                    // 沒登錄狀態，且強制登錄，自動跳轉到登錄頁
                    else if(res.status === 10){
                        this.doLogin();
                    }
                    // 其他狀態，調用error
                    else{
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error: err => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    }
    // 獲取請求url地址
    getServerUrl(path){
        return conf.serverHost + path;
    }
    // 獲取圖片地址
    getImageUrl(path){
        return conf.imageHost + path;
    }
    // 獲取url參數
    getHashParam(name){
        var reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            queryString = window.location.hash.split('?')[1] || '',
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    // alert
    successTips(msg){
        alert(msg || '操作成功');
    }
    // alert
    errorTips(msg){
        alert(msg || '哪裡錯了~');
    }
    // 向本地儲存放數據
    setStorage(name, data){
        // array / json
        if(typeof data === 'object'){
            let jsonString = JSON.stringify(data);
            window.localStorage.setItem(name, jsonString);
        }
        // number / string / boolean
        else if(typeof data === 'number' || typeof data === 'string' || typeof data === 'boolean'){
            window.localStorage.setItem(name, jsonString);
        }
        // undefined / function
        else{
            alert('該資料類型不能用於本地儲存');
        }
    }
    // 從本地儲存獲取資料
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            // JSON.parse
            return JSON.parse(data);
        }else{
            return '';
        }
    }
    // 刪除本地儲存
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
    // 跳轉登錄
    doLogin(){
        window.location.href = '#/login?redirect=' + encodeURIComponent(window.location.hash);
    }
}
export default MMUtil;