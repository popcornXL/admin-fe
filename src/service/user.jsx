'use strict';

import MMUtil from 'util/mm.jsx';

const mm = new MMUtil();

export default class User{
    // 檢查用於登錄的資訊是否合法
    checkLoginInfo(userInfo){
        if(!userInfo.username){
            return {
                state: false,
                msg: '用戶名不能為空'
            }
        }
        if(!userInfo.password){
            return {
                state: false,
                msg: '密碼不能為空'
            }
        }
        return {
            state: true,
            msg: '驗證通過'
        }
    }
    // 登錄
    login(userInfo){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/login.do'),
            method  : 'POST',
            data    : {
                username : userInfo.username || '',
                password : userInfo.password || ''
            }
        });
    }
    // 退出登錄
    logout(){
        return mm.request({
            url     : mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
        });
    }
}