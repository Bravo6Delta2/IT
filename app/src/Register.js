import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import crypto from 'crypto';
import './css/register.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Register extends React.Component{

    constructor(props){
    super(props);
    this.state = {
        ime:'',
        prezime:'',
        email:'',
        password:'',
        ulica:'',
        grad:'',
        opstina:'',
        po_br:'',
        drzava:''
    };
    }

    textChanged = (e) => {
     
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    Send = ()=>{
        //console.log(this.state);
        let x = 0;
        if (isNaN(this.state.po_br) || this.state.po_br.length == 0){
            window.alert('Niste ispravno unijeli poštanski broj');
            
            document.getElementById('po_br').classList.value = 'is-invalid form-control';
            x =1;
        }
        else{
            document.getElementById('po_br').classList.value = 'is-valid form-control';
        }

        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)){
            document.getElementById('email').classList.value = 'is-valid form-control';
            }
        else{
            window.alert('Niste ispravno email adresu');
            document.getElementById('email').classList.value = 'is-invalid form-control';
            x = 1;
            }

        let pass= new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        if(pass.test(this.state.password)){
            document.getElementById('password').classList.value = 'is-valid form-control';
        }
        else{
            window.alert('Lozinka nije dovoljno jaka mora imati malo i veliko slovo, karakter i imati najmanje 8 karaktera ');
            document.getElementById('password').classList.value = 'is-invalid form-control';
            x = 1;
        }


        if (this.state.ime.length == 0){
            window.alert('Morate unijeti svoje ime');
            document.getElementById('ime').classList.value = 'is-invalid form-control';
            x=1;
        }
        else{
            document.getElementById('ime').classList.value = 'is-valid form-control';
        }


        if (this.state.prezime.length == 0){
            window.alert('Morate unijeti svoje prezime');
            document.getElementById('prezime').classList.value = 'is-invalid form-control';
            x=1;
        }
        else{
            document.getElementById('prezime').classList.value = 'is-valid form-control';
        }


        if (this.state.ulica.length == 0){
            window.alert('Morate unijeti adresu');
            document.getElementById('ulica').classList.value = 'is-invalid form-control';
            x=1;
        }
        else{
            document.getElementById('ulica').classList.value = 'is-valid form-control';
        }


        if (this.state.grad.length == 0){
            window.alert('Moarte unijeti grad');
            document.getElementById('grad').classList.value = 'is-invalid form-control';
            x=1;
        }
        else{
            document.getElementById('grad').classList.value = 'is-valid form-control';
        }


        if (this.state.opstina.length == 0){
            window.alert('Morate unijeti opstinu');
            document.getElementById('opstina').classList.value = 'is-invalid form-control';
            x=1;
        }
        else{
            document.getElementById('opstina').classList.value = 'is-valid form-control';
        }


        if (this.state.drzava.length == 0){
            window.alert('Morate unijeti drzavu');
            document.getElementById('drzava').classList.value = 'is-invalid form-control';
            x=1;
        }
        else{
            document.getElementById('drzava').classList.value = 'is-valid form-control';
        }

        if (x){
            return;
        }
        let data ={
            ime : this.state.ime,
            prezime : this.state.prezime,
            email : this.state.email,
            password : crypto.createHash('sha256').update(this.state.password).digest('hex'),
            ulica : this.state.ulica,
            grad : this.state.grad,
            opstina : this.state.opstina,
            po_br: this.state.po_br,
            drzava:this.state.drzava
        }

        axios.post('http://localhost:3001/register/',data)
        .then(

            (res)=>{
                if (res.data.msg == 'GG'){
                    window.alert('Morate se ulogovati');
                    this.props.history.push('/login/'); 
                }
                else if (res.data.msg == 'email'){
                window.alert('Email adresa je vec u upoterbi');
                document.getElementById('email').classList.value = 'is-invalid form-control';
            }
            else{
                window.alert('Neuspjesna registarcija');
            }
        },
        (err)=>{
            window.alert('Neuspjesna registarcija');
        }
                

        );

    }
    Reset = ()=>{
        this.setState({
            ime:'',
            prezime:'',
            email:'',
            password:'',
            ulica:'',
            grad:'',
            opstina:'',
            po_br:'',
            drzava:''
          });
          document.getElementById('email').classList.value = 'form-control';
          document.getElementById('ime').classList.value = 'form-control';
          document.getElementById('prezime').classList.value = 'form-control';
          document.getElementById('password').classList.value = 'form-control';
          document.getElementById('ulica').classList.value = 'form-control';
          document.getElementById('grad').classList.value = 'form-control';
          document.getElementById('opstina').classList.value = 'form-control';
          document.getElementById('po_br').classList.value = 'form-control';
          document.getElementById('drzava').classList.value = 'form-control';
        
    }
    render(){
        return(
            
            <form id = 'form' class="div-register pic " data-toggle="validator">
            <center><h2>STRANICA ZA KREIRANJE PROFILA</h2></center>
                <div class = "p-3"><button type="reset" class="btn-close" aria-label="Close" onClick={this.Reset}></button></div>
            <div class="container-fluid d-md-inline-flex justify-content-md-around p-2">
                <div class="container-fluid">
                    <label class="form-label">IME</label>
                    <input id ="ime" name="ime" type="text" class ="form-control"  placeholder="Unesite vaše ime" onChange = {this.textChanged} value={this.state.ime}/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">PREZIME</label>
                    <input id="prezime" name="prezime"type="text" class ="form-control"  placeholder="Unesite vaše prezime" onChange = {this.textChanged} value={this.state.prezime}/>
                </div>
            </div>
            <div class="container-fluid d-md-inline-flex justify-content-md-around p-2">
                <div class="container-fluid">
                    <label class="form-label">E-MAIL</label>
                    <input id ="email" name="email" type="email" class ="form-control"  placeholder="Unesite vašu e-mail adresu" onChange = {this.textChanged} value={this.state.email}/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">PASSWORD</label>
                    <input id="password" name="password"type="password" class ="form-control"  placeholder="Unesite šifru" onChange = {this.textChanged} value={this.state.password}/>
                </div>
            </div>
            <div class="container-fluid p-2" > 
                <div class="container-fluid">
                    <label class="form-label">ADRESA</label>
                    <input id="ulica" name="ulica"type="text" class ="form-control"  placeholder="Unesite vašu adresu" onChange = {this.textChanged} value={this.state.ulica}/>
                </div>
            </div>
           
            <div class="container-fluid d-md-inline-flex justify-content-md-around p-2">
                <div class="container-fluid">
                    <label class="form-label">GRAD</label>
                    <input id="grad" name="grad" type="text" class ="form-control"  placeholder="Unesite ime grada" onChange = {this.textChanged} value={this.state.grad}/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">OPŠTINA</label>
                    <input id="opstina" name="opstina" type="text" class ="form-control"  placeholder="Unesite ime opštine" onChange = {this.textChanged} value={this.state.opstina}/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">POŠTANSKI BROJ</label>
                    <input id="po_br" name="po_br" type="text" class ="form-control"  placeholder="Unesite poštanski broj" onChange = {this.textChanged} value={this.state.po_br}/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">DRŽAVA</label>
                    <input id="drzava" name="drzava" type="text" class ="form-control"  placeholder="Unesite ime države" onChange = {this.textChanged} value={this.state.drzava}/>
                </div>
            </div>
            <div class="container-fluid p-3">
                <button type="button" class="btn btn-primary" onClick={this.Send}>POŠALJI</button>
            </div>
          </form>

        )

    }
}
export default Register;