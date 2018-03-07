'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import TopNav       from 'component/nav-top/index.jsx';
import SideNav      from 'component/nav-side/index.jsx';
import './index.scss';

const Layout = React.createClass({
    getInitialState() {
        return {
            hello: 'Layout Component'
        };
    },
    componentDidMount: function(){
        
    },
    render() {
        return (
            <div className="wrapper">
                <nav className="navbar navbar-default navbar-static-top" role="navigation">
                    <TopNav />
                    <SideNav />
                </nav>
                {this.props.children}
            </div>
        );
    }
});

export default Layout;
