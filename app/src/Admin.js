import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import crypto from 'crypto';
import './css/admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'react-router-dom/Link';

class Admin extends React.Component{

    constructor(props){
    super(props);
    this.state = {s:'init',password:'',proizvodac:'',
                    kategorija:'',
                    pod_kat:'',
                    model:'',
                    opis:'',
                    cijena:'',
                    popust:'',
                    kolicina:'',
                    slika_1:null,
                    slika_2:null,
                    slika_3:null
    };
    }

    textChanged = (e) => {
        const { name, value } = e.target;
        if (name == 'slika_1' || name == 'slika_2' || name == 'slika_3'){
              
            this.setState({ [name]: e.target.files[0]
                });
               
                
        }
        else
        this.setState({ [name]: value });
    }
    Prijava = ()=>{
        let data = {password:crypto.createHash('sha256').update(this.state.password).digest('hex')};
        axios.post('http://localhost:3001/admin',data).then(
            (res)=>{

                if(res.data.msg=='GG'){
                    this.setState({s:'init2'})
                }else
                window.alert(res.data.msg);
            },
            (err)=>{
                window.alert('Xd');
            }
        );
    }

    Posalji = () =>{
        if (this.slika_1!=null){
            window.alert('Niste izabrali file kao sliku na prvom mjestu');
            return; 
        }
        if(this.slika_2!=null){
            window.alert('Niste izabrali file kao sliku na drugom mjestu');
            return;
        }
        if(this.slika_3!=null){
            window.alert('Niste izabrali file kao sliku na trećem mjestu');
            return;
        }
        if(document.getElementById('nnn').value == 0 ){
            window.alert('Morate izabrati kategoriju');
            return;
        }
        
        let data = new FormData();
        data.append("proizvodac",this.state.proizvodac);
        data.append("kategorija",document.getElementById('nnn').value);
        data.append("pod_kat",this.state.pod_kat);
        data.append("model",this.state.model);
        data.append("opis",this.state.opis);
        data.append("cijena",this.state.cijena);
        data.append("popust",this.state.popust);
        data.append("kolicina",this.state.kolicina);
        data.append("slika_1",this.state.slika_1);
        data.append("slika_2",this.state.slika_2);
        data.append("slika_3",this.state.slika_3);
        data.append("n_1",this.state.slika_1.name);
        data.append("n_2",this.state.slika_2.name);
        data.append("n_3",this.state.slika_3.name);
        data.append("password",crypto.createHash('sha256').update('aleksandar1234').digest('hex'));
        
         axios.post('http://localhost:3001/dodaj',data).then(
            (res)=>{
                window.alert('GG');
                this.setState({
                    s:'init2',
                    proizvodac:'',
                    kategorija:'',
                    pod_kat:'',
                    model:'',
                    opis:'',
                    cijena:'',
                    popust:'',
                    kolicina:'',
                    slika_1:null,
                    slika_2:null,
                    slika_3:null
            });
            },
            (err)=>{}
        );

        
    }
    render(){

        if (this.state.s == 'init'){
            return(
                <div class='d-flex admindiv flex-column justify-content-md-center'>
                <div class = 'm-3 d-flex justify-content-md-center align-items-center'>
                    <input class='form-control passinput' type="password" name="password" value={this.state.password} onChange={this.textChanged} placeholder='Unesite admin šifru'/>
                    
                </div>
                <div class = 'm-3 d-flex justify-content-md-center align-items-center'>
                <button type="button" class="btn btn-dark" onClick={this.Prijava}>Prijavi se</button>
               </div>   
               </div>
            );
        }
        else {
            return(

                <div class ="admindiv1">
                  
                    <div class= " m-2 d-flex justify-content-md-evenly">
                    <div>
                        <label class="form-label">PROIZVOĐAČ</label>
                        <input class="form-control" type="text" name='proizvodac'value={this.state.proizvodac} onChange={this.textChanged} placeholder='Upišite ime proizvođača'/>
                    </div>
                    <div>
                        <label class="form-label">MODEL</label>
                        <input class="form-control" type="text" name='model'value={this.state.model} onChange={this.textChanged}  placeholder='Upišite model proizvoda' />
                    </div>
                    </div>

                    <div class = 'm-2 d-flex justify-content-md-evenly'>
                    <div>
                        <label class="form-label">KATEGORIJA</label>
                        <select id = "nnn"class="form-select" aria-label="Default select example">
                        <option selected value="0">KATEGORIJA</option>
                        <option value="KOPMONENTE">KOPMONENTE</option>
                        <option value="TELEFONI">TELEFONI</option>
                        <option value="TELEVIZORI">TELEVIZORI</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label">POD KATEGORIJA</label>
                        <input class="form-control" type="text" name='pod_kat'value={this.state.pod_kat} onChange={this.textChanged}  placeholder='Upišite ime proizvođača'/>
                    </div>
                    </div>

                    <div class= "m-2 d-flex justify-content-md-evenly">
                    <div>
                        <label class="form-label">CIJENA</label>
                        <input class="form-control" type="number" name='cijena'value={this.state.cijena} onChange={this.textChanged}  placeholder='Upišite ime proizvođača'/>
                    </div>
                    <div>
                        <label class="form-label">POPUST</label>
                        <input class="form-control" type="number" name='popust'value={this.state.popust} onChange={this.textChanged}  placeholder='Upišite ime proizvođača'/>
                    </div>
                    <div>
                        <label class="form-label">KOLIČINA</label>
                        <input class="form-control" type="number" name='kolicina'value={this.state.kolicina} onChange={this.textChanged}  placeholder='Upišite ime proizvođača'/>
                    </div>
                        </div>
                    <div class='m-4 d-flex justify-content-md-evenly'>
                        <div>
                        <label class="form-label">OPIS</label>
                        <textarea class="form-control"cols='60' rows='4' name='opis' value ={this.state.opis} onChange={this.textChanged} />
                        </div>
                    </div>
                    <div class='m-4 d-flex justify-content-md-evenly'>
                        <div>
                        <label class="form-label">SLIKA 1</label>
                        <input id="slika_1" type="file" accept=".png, .jpg, .jpeg" name="slika_1"  onChange={this.textChanged}/>
                        </div>

                        <div>
                        <label class="form-label">SLIKA 2</label>
                        <input type="file" name="slika_2" accept=".png, .jpg, .jpeg" onChange={this.textChanged}/>
                        </div>
                        <div>
                        <label class="form-label">SLIKA 3</label>
                        <input type="file" name="slika_3" accept=".png, .jpg, .jpeg"  onChange={this.textChanged}/>
                        </div>
                    </div>
                    <button class="btn btn-primary" onClick={this.Posalji}>POŠALJI</button>
                
                </div>
            );
        } 
    }

}
export default Admin;