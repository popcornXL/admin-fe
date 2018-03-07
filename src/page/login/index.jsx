'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import MMUtile from 'util/mm.jsx';
import User from 'service/user.jsx';

const _mm    = new MMUtile();
const _user  = new User();

const Login = React.createClass({
    getInitialState() {
        return {
            username : '',
            password : '',
            redirect : _mm.getHashParam('redirect')
        };
    },
    // 點擊登錄
    onLogin(e){
        e.preventDefault();
        let loginInfo   = {
                username: this.state.username,
                password: this.state.password
            },
            checkLogin  = _user.checkLoginInfo(loginInfo);
        if(checkLogin.state){
            // 登錄成功後進行跳轉
            _user.login(loginInfo).then(res => {
                _mm.setStorage('userInfo', res);
                window.location.href = this.state.redirect || '#/home';
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }else{
            _mm.errorTips(checkLogin.msg);
        }
    },
    // 輸入框內容變化時，更新state中的字段
    onInputChange(e){
        let ele         = e.target,
            inputValue  = e.target.value,
            inputName   = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    },
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">請登錄</h3>
                        </div>
                        <div className="panel-body">
                            <form role="form" onSubmit={this.onLogin}>
                                <div className="form-group">
                                    <input className="form-control" 
                                        placeholder="User Name" 
                                        name="username" 
                                        type="text" 
                                        autoComplete="off" 
                                        autoFocus 
                                        onChange={this.onInputChange}/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" 
                                        placeholder="Password" 
                                        name="password" 
                                        type="password" 
                                        onChange={this.onInputChange}/>
                                </div>
                                <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Login;