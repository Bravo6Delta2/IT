import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import crypto from 'crypto';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleLogin from 'react-google-login';
import { compileFunction } from 'vm';



class Login extends React.Component {
    constructor(props) {
       super(props);
       this.state = {user: '', pass : ''};
    }
      handleLogin = (response) => {
      let data = {token:response.tokenId};

   
      axios.post('http://localhost:3001/api/v1/auth/google', data).then(
           (response) => {
      if(!response.data.token)
         window.alert(response.data.msg);
      else{
                  
                  localStorage.setItem('token', response.data.token);
                    console.log('aaaaa')
                 }
              } ,
              (err) => window.alert('Neuspjesno logovanje'));
    }
    onButtonClick = () => {
      let data = {email:this.state.user, password :crypto.createHash('sha256').update(this.state.pass).digest('hex')}
      axios.post('http://localhost:3001/login/', data).then(
        (response) => {
	if(response.data.msg != 'GG')
	   window.alert(response.data.msg);
	else{
	            localStorage.setItem('token', response.data.token);
                 this.props.history.push('/');  
              }
           } ,
           (err) => window.alert('Neuspjesno logovanje'));
    }

    textChanged = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      
    }

    render() {
      return (
          <form class=" div-login pic">
        <center><h2>STRANICA ZA PRIJAVU<br/><br/></h2></center>
        <center><input id="email" name = "user" value={this.state.user}type="email" placeholder="Unesite email adresu" class="form-control form-c" onChange = {this.textChanged} required/> <br/><br/></center> 
        <center> <input id="password" name="pass" value = {this.state.pass} type="password" placeholder="Unesite sifru" class="form-control form-c" onChange = {this.textChanged} required/></center> 
        <br/>
        <br/>
        <div class = "container-fludi d-md-inline-flex m-2 p-2">
           <div class ="m-2 p-2">
            <button type="button" onClick = {this.onButtonClick} class="btn btn-primary float-md-left">PRIJAVITE SE</button>
            </div>
            <div class ="m-2 p-2">
            <GoogleLogin
               clientId={'7412223076-fhpbstpairfhm55t2v73rosvp517o02v.apps.googleusercontent.com'}
               buttonText="Log in with Google"
               onSuccess={this.handleLogin}
               onFailure={this.handleLogin}
               cookiePolicy={'single_host_origin'}
            />
            </div>
            </div>
            <br/>
            <span>Ako nemate profil napravite ga na <a href="/register/register.html" class="link2 link">linku</a></span>
            </form>
		)
	}
}
export default Login; 
