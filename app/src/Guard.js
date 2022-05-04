import React from 'react';
import { Route, Redirect } from "react-router-dom";
import jwt from 'jsonwebtoken';
class Guard extends React.Component {

    render() {
        const Component = this.props.component;
        let isAuthenticated = true;
        if(localStorage.getItem('token') == null || jwt.decode(localStorage.getItem('token')).exp <  (new Date().getTime() + 1) / 1000)
        isAuthenticated = false ;
        
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/login1/' }} />
        );
    }
}

export default Guard;