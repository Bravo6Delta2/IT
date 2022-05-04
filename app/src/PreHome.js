import React from 'react';
import { Route, Redirect } from "react-router-dom";
import jwt from 'jsonwebtoken';
import axios from 'axios';
class PreHome extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {};
        }

             xx(){
            
        }
    render() {
        const Component = this.props.component;
  
        
        //console.log('Xd');
        this.xx();
        
        


        return  (
            <Component  data = {this.state}/>
        ) 
    }
}

export default PreHome;