import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import crypto from 'crypto';
class login2 extends React.Component {
    constructor(props) {
       super(props);
       this.state = {user: '', pass : ''};
    }
	
    onButtonClick = () => {
      let data = {email:this.state.user, password :crypto.createHash('sha256').update(this.state.pass).digest('hex')}
      let x = axios.post('http://localhost:3001/login/', data)
      .then((response) => {
        //console.log(response);
      }, (error) => {
        //console.log(error);
      });
          // console.log(x);
    }

    textChanged = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
      return (
        <div>
	<input type="text" value={this.state.user} name="user" onChange={this.textChanged}/>
	<input type="password" value={this.state.pass} name="pass" onChange={this.textChanged}/>
	<button onClick={this.onButtonClick}>Loguj se</button>
    </div>
		)
	}
}
export default login2; 
