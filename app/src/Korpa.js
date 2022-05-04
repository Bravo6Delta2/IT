import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import crypto from 'crypto';
import 'bootstrap/dist/css/bootstrap.min.css';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import jwt from 'jsonwebtoken';
import './css/korpa.css';


class Korpa extends React.Component {

    constructor(props){
        super(props);
            this.state = {s:'init',code:[],data:{},text:'Loading...',addres:0};

        }

        componentWillMount(){
            if (localStorage.getItem('token') == null || jwt.decode(localStorage.getItem('token')).exp <  (new Date().getTime() + 1) / 1000){
                this.setState(
                    {text:'Morate se prijaviti'}
                );
               
              return;  
            }

            if(localStorage.getItem('pro') == null){
              
                this.setState(
                    {text:'Korpa je prazna'}
                );
                return;
            }
           
            let xx = localStorage.getItem('pro');

            let data1 = {
                art : xx,
                token : localStorage.getItem('token')
            }

            axios.post('http://localhost:3001/korpa/',data1).then(

            (res)=>{
                    this.setState(
                        {
                            data:res.data.data,
                            s : 'comp'
                        }
                    );
            },
            (err)=>{

                window.alert('Greska 2');
            }

            );


        }

        Kupi = () =>{
            let tok = localStorage.getItem('token');
            let xic = document.getElementById('ggf').value;
            let data = {a:[],adresa:this.state.data.c[xic].id_a,token:tok};
            let x = localStorage.getItem('pro').split(',');

            let i;

            for (i=0;i<Object.keys(this.state.data.a).length;i++){
                let jjj = 0;
                x.forEach(element=>{
                    if(element == this.state.data.a[i].id_p)
                    jjj++;
                });
                let cc = [];
                cc.push(this.state.data.a[i].id_p);
                cc.push(jjj);
                data.a.push(cc);
                
        }
    

         axios.post('http://localhost:3001/kupi/',data).then(
             (res)=>{
                if (res.data.msg == 'GG'){
                    window.alert('Uspjesno obavljena kupovina');
                    localStorage.removeItem('pro');
                    this.props.history.push('/');  
                }
                    else
                    window.alert(res.data.msg);
             }
             ,
             (err)=>{
                window.alert('err 2');
             }
         );


        }

        ChangeAdrees = (e)=>{
            
            let x = document.getElementById('ggf').value;
            document.getElementById('ulica').value = this.state.data.c[x].ulica;
            document.getElementById('grad').value = this.state.data.c[x].grad;
            document.getElementById('opstina').value = this.state.data.c[x].opstina;
            document.getElementById('po_br').value = this.state.data.c[x].postanski_br;
            document.getElementById('drzava').value = this.state.data.c[x].drzava;

           
        }


        ChangeVal = (e)=>{
            if(e.target.id != ''){
            let x = e.target.id.split(' ');
            
            if (x[0] == '-'){
                let y = 'in'+x[1];
                let z = parseInt(document.getElementById(y).value,10);
                if (z != 0)
                document.getElementById(y).value = z-1;

            }
            else{
                let y = 'in'+x[1];
                let z = parseInt(document.getElementById(y).value,10);
                document.getElementById(y).value = z+1;
            }
            let i;
            let sumica = 0;
            for(i=0;i< Object.keys(this.state.data.a).length;i++){
                                
                let cp1 = this.state.data.a[i].cijena - (this.state.data.a[i].cijena*this.state.data.a[i].popust/100);
                let imence = 'in' + i;
                let br = document.getElementById(imence).value;
                sumica =  Math.round( (sumica + (cp1 * br))*100)/100;
        
        }

            document.getElementById('sumall').innerHTML = sumica;

            }
        }
        ImportCode(){

            let xx = [];

            let yy = []; 
            let i;
            for ( i = 0; i < Object.keys(this.state.data.c).length; i++){
                if (i==0){
                    yy.push(<option id={i} value={i}  selected>Adresa {i+1}</option>);
                }
                else
                yy.push(<option id ={i} value={i}>Adresa {i+1}</option>);
            }
            xx.push(

                <div className='info-div'>
                VAŠI PODACI
                <div class = "mx-4 my-2">
                <select  class="form-select" id = "ggf" onChange={this.ChangeAdrees} >{yy}</select> 

                </div>
            <div class="container-fluid d-md-inline-flex justify-content-md-around p-2">
                <div class="container-fluid">
                    <label class="form-label">IME</label>
                    <input id ="ime" name="ime" type="text" class ="form-control" value={this.state.data.b[0].ime} readOnly/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">PREZIME</label>
                    <input id="prezime" name="prezime"type="text" class ="form-control"  placeholder="Unesite vaše prezime"  value={this.state.data.b[0].prezime} readOnly/>
                </div>
            </div>
            <div class="container-fluid d-md-inline-flex justify-content-md-around p-2">
                <div class="container-fluid">
                    <label class="form-label">E-MAIL</label>
                    <input id ="email" name="email" type="email" class ="form-control"  placeholder="Unesite vašu e-mail adresu"  value={this.state.data.c[0].email} readOnly/>
                </div>
            </div>
            <div class="container-fluid p-2" > 
                <div class="container-fluid">
                    <label class="form-label">ADRESA</label>
                    <input id="ulica" name="ulica"type="text" class ="form-control"  placeholder="Unesite vašu adresu"  value={this.state.data.c[this.state.addres].ulica} readOnly/>
                </div>
            </div>
           
            <div class="container-fluid d-md-inline-flex justify-content-md-around p-2">
                <div class="container-fluid">
                    <label class="form-label">GRAD</label>
                    <input id="grad" name="grad" type="text" class ="form-control"  placeholder="Unesite ime grada"  value={this.state.data.c[this.state.addres].grad} readOnly/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">OPŠTINA</label>
                    <input id="opstina" name="opstina" type="text" class ="form-control"  placeholder="Unesite ime opštine" value={this.state.data.c[this.state.addres].opstina} readOnly/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">POŠTANSKI BROJ</label>
                    <input id="po_br" name="po_br" type="text" class ="form-control"  placeholder="Unesite poštanski broj"  value={this.state.data.c[this.state.addres].postanski_br} readOnly/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">DRŽAVA</label>
                    <input id="drzava" name="drzava" type="text" class ="form-control"  placeholder="Unesite ime države"  value={this.state.data.c[this.state.addres].drzava} readOnly/>
                </div>
            </div>
                
                </div>

            );
                let zz = [];
                let sum  = 0.0;

                for(i=0;i< Object.keys(this.state.data.a).length;i++){
                    let j = 0;
                    let opo = localStorage.getItem('pro').split(',');
                        opo.forEach(element =>{
                            if (element == this.state.data.a[i].id_p)
                            j++;
                        });

                    let cp1 = this.state.data.a[i].cijena - (this.state.data.a[i].cijena*this.state.data.a[i].popust/100);
                    let br = j;
                    sum =  Math.round( (sum + (cp1 * br))*100)/100;
            
            }


                for(i=0;i< Object.keys(this.state.data.a).length;i++){
                        let j = 0;
                    let opo = localStorage.getItem('pro').split(',');
                        opo.forEach(element =>{
                            if (element == this.state.data.a[i].id_p)
                            j++;
                        });

                    



                    if (this.state.data.a[i].popust != 0){
                    let cp1 = this.state.data.a[i].cijena - (this.state.data.a[i].cijena*this.state.data.a[i].popust/100);
                    let cp2= parseFloat(cp1).toFixed(2);
                zz.push(

                    <tr>
                        <th scope="row"><div><img class = 'sm-picture' src = {this.state.data.a[i].slika_1}></img></div></th>
                        <td><div>{this.state.data.a[i].proizvodac} {this.state.data.a[i].model}</div></td>
                        <td><div className='d-md-flex justify-content-md-start'>
                            <div id = {'-- '+i}  className='plusplus'><svg id = {'- '+i} onClick={this.ChangeVal} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                </svg></div>
                            <div><input id={'in'+i} type='number' class="form-control" value={j}/></div>
                            <div id = {'++ '+i}   className='plusplus'><svg  id = {'+ '+i} onClick={this.ChangeVal} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg></div>
                            </div></td>
                        <td><span class= 'adj-price'>{cp2}</span></td>
                        </tr>

                );}

                else{
                    zz.push(
                        <tr>
                        <th scope="row"><div><img class = 'sm-picture' src = {this.state.data.a[i].slika_1}></img></div></th>
                        <td><div>{this.state.data.a[i].proizvodac} {this.state.data.a[i].model}</div></td>
                        <td><div><div className='d-md-flex justify-content-md-start'>
                            <div id = {'-- '+i}  className='plusplus'><svg id = {'- '+i} onClick={this.ChangeVal} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                </svg></div>
                            <div><input id={'in'+i} type='number' class="form-control" value={j}/></div>
                            <div id = {'++ '+i}   className='plusplus'><svg  id = {'+ '+i} onClick={this.ChangeVal} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg></div>
                            </div></div></td>
                        <td><span class= ''>{this.state.data.a[i].cijena}</span></td>
                        </tr>
    
                    );


                }
                }

                let dd = [];
                dd.push(

                    <table class='table  table-striped '>
                        <thead>
                        <tr>
                        <th scope="col">SLIKA</th>
                        <th scope="col">NAZIV</th>
                        <th scope="col">KOLIČINA</th>
                        <th scope="col">CIJENA</th>
                        </tr>
                        </thead>
                        <tbody>
                            {zz}
                        </tbody>

                    </table>



                );
                   
                xx.push(

                    <div class=" d-md-flex justify-content-md-around ">

                    <div className=' div-itemii m-3'>
                        {dd}
                    </div>

                    <div className = "div-itemii p-5 m-3 outter">
                           <h2>UKUPNO : <span id = "sumall">{sum} </span></h2>
                          
                               <div class ="inner">
                              
                           <button type="button" class="btn btn-primary btn-lg" onClick={this.Kupi}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                                </svg>
                                &nbsp;	 KUPI
                                </button>
                                
                                </div>
                             
                    </div> 

                    </div>

                );
                this.setState({s:'done',code:xx});
        }


        componentDidUpdate(){
            if (this.state.s == 'comp'){
                this.ImportCode();
            }
                    
                if(localStorage.getItem('token') == null || jwt.decode(localStorage.getItem('token')).exp <  (new Date().getTime() + 1) / 1000){
            
                    document.getElementById('yolo').innerHTML="PRIJAVA";
                    document.getElementById('yolo1').href="/login1";
                }
                else{
                    document.getElementById('yolo').innerHTML="PROFIL";
                    document.getElementById('yolo1').href="/profil";
                }
               
            
        }

        Drop(){
        
            if (document.getElementById('dropdown').classList.contains('d-none')){
                document.getElementById('dropdown').classList.replace('d-none','d-md-inline-flex');
                document.getElementById('picrure1').classList.replace('pic','pic1');
                
            }
            else{
                document.getElementById('dropdown').classList.replace('d-md-inline-flex','d-none');
                document.getElementById('picrure1').classList.replace('pic1','pic');
               
            }
            
    }

    Pretrazi = ()=>{
        
        window.location.replace('/proizvodi?page=1&sort=0&ps=0&pe=1000&pretraga='+document.getElementById('pretraga').value);
    }

    render(){

        if (this.state.s == 'init')
        return ( <div class="sticky" ata-spy="affix" data-offset-top="197">
        <div id="nav" class="pic navbar navbar-inverse d-flex justify-content-md-between ce leftpad">
            <div class="d-md-inline-flex p-2 align-self-center ">
                <div class="d-inline-flex p-2 he he1" onClick={this.Drop}>KATALOG</div>
                <a href="kontakt/" class = "link2"><div class="d-inline-flex p-2 he he1">KONTAKT</div></a>
            </div>
            <div class="d-md-inline-flex p-2 align-self-center">
            <div class="d-md-inline-flex p-2">
                    <input id="pretraga" class="form-control mr-sm-2 align-self-center" type="search" placeholder="Unesite tekst" aria-label="Search"/>
                    <button class="btn btn-outline-light my-2 my-sm-0 align-self-center" onClick={this.Pretrazi}>PRETRAGA</button>
                </div>
            </div>
            <div class="d-md-inline-flex p-2 align-self-center">
                <a id="yolo1" class="link2"  href="/login1"><div id = "yolo"class="d-md-inline-flex p-2 he he1">PRIJAVA</div></a>
                <a href = "/korpa" class="link2"><div class="d-md-inline-flex p-2 he he1">KORPA</div></a>
            </div>
        </div>
        
        <div class="container-fluid d-none p-2 justify-content-md-around dropdown" id = "dropdown" >
                <div>
                <h4><a href="/proizvodi?kategorija=KOMPONENTE&page=1&sort=0&ps=0&pe=1000" class="link1">KOMPONENTE</a></h4>
                    <ul>
                    <li class="li1"><a href="/proizvodi?podkat=CPU&page=1&sort=0&ps=0&pe=1000" class="link1" >CPU</a></li>
                        <li class="li1"><a href="/proizvodi?podkat=GPU&page=1&sort=0&ps=0&pe=1000" class="link1">GPU</a></li>
                        <li class="li1"><a href="/proizvodi?podkat=MATP&page=1&sort=0&ps=0&pe=1000" class="link1">MATIČNA PLOČA</a></li>
                        <li class="li1"><a href="/proizvodi?podkat=NAPAJANJE&page=1&sort=0&ps=0&pe=1000" class="link1">NAPAJANJE</a></li>
                        <li class="li1"><a href="/proizvodi?podkat=RAM&page=1&sort=0&ps=0&pe=1000" class="link1">RAM</a></li>
                        <li class="li1"><a href="/proizvodi?podkat=SSD&page=1&sort=0&ps=0&pe=1000" class="link1">SSD</a></li>
                        <li class="li1"><a href="/proizvodi?podkat=HDD&page=1&sort=0&ps=0&pe=1000" class="link1">HDD</a></li>
                        <li class="li1"><a href="/proizvodi?podkat=HLD&page=1&sort=0&ps=0&pe=1000" class="link1">HLAĐENJE</a></li>
                    </ul>
                </div>
                <div >
                <h4><a href="/proizvodi?kategorija=PERIFERIJE&page=1&sort=0&ps=0&pe=1000" class="link1">PERIFERIJE</a></h4>
                    <ul>
                        <li class="li1"><a href="/proizvodi?podkat=MIŠ&page=1&sort=0&ps=0&pe=1000" class="link1">MIŠEVI</a></li>
                        <li class="li1"><a href="/proizvodi?podkat=TASTATURA&page=1&sort=0&ps=0&pe=1000" class="link1">TASTATURE</a></li>
                        <li class="li1"><a href="/proizvodi?podkat=MONITOR&page=1&sort=0&ps=0&pe=1000" class="link1">MONITORI</a></li>
                        <li class="li1"><a href="/proizvodi?podkat=SLUŠALICE&page=1&sort=0&ps=0&pe=1000" class="link1">SLUŠALICE</a></li>
                        <li class="li1"><a href="/proizvodi?podkat=WEBCAM&page=1&sort=0&ps=0&pe=1000" class="link1">WEB KAMERE</a></li>
                    </ul>
                     </div>
                <div>
                    <br/>
                    <br/>
                    <div>
                    <a href="/proizvodi?kategorija=TELEVIZOR&page=1&sort=0&ps=0&pe=1000" class="link1"><h4>TELEVIZORI</h4></a>
                    </div>
                    <br/>
                    <br/><br/>
                    <div>
                    <a href="/proizvodi?kategorija=TELEFON&page=1&sort=0&ps=0&pe=1000" class="link1"><h4>TELEFONI</h4></a>
                    </div>     
                </div>
            </div>
       <h1><center>{this.state.text}</center></h1>
       <div id ="tt22"></div>
    <MessengerCustomerChat
    pageId="106431294985885"
    appId="2379326438877513"/>
        </div>);

        else
        return(
            <div class="sticky" ata-spy="affix" data-offset-top="197">
            <div id="nav" class="pic navbar navbar-inverse d-flex justify-content-md-between ce leftpad">
                <div class="d-md-inline-flex p-2 align-self-center ">
                    <div class="d-inline-flex p-2 he he1" onClick={this.Drop}>KATALOG</div>
                    <a href="kontakt/" class = "link2"><div class="d-inline-flex p-2 he he1">KONTAKT</div></a>
                </div>
                <div class="d-md-inline-flex p-2 align-self-center">
                <div class="d-md-inline-flex p-2">
                    <input id="pretraga" class="form-control mr-sm-2 align-self-center" type="search" placeholder="Unesite tekst" aria-label="Search"/>
                    <button class="btn btn-outline-light my-2 my-sm-0 align-self-center" onClick={this.Pretrazi}>PRETRAGA</button>
                </div>
                </div>
                <div class="d-md-inline-flex p-2 align-self-center">
                    <a id="yolo1"href = "" class="link2"><div id = "yolo"class="d-md-inline-flex p-2 he he1">Text</div></a>
                    <a href = "/korpa" class="link2"><div class="d-md-inline-flex p-2 he he1">KORPA</div></a>
                </div>
            </div>
            
            <div class="container-fluid d-none p-2 justify-content-md-around dropdown" id = "dropdown" >
                    <div>
                    <h4><a href="/proizvodi?kategorija=KOMPONENTE&page=1&sort=0&ps=0&pe=1000" class="link1">KOMPONENTE</a></h4>
                        <ul>
                        <li class="li1"><a href="/proizvodi?podkat=CPU&page=1&sort=0&ps=0&pe=1000" class="link1" >CPU</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=GPU&page=1&sort=0&ps=0&pe=1000" class="link1">GPU</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=MATP&page=1&sort=0&ps=0&pe=1000" class="link1">MATIČNA PLOČA</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=NAPAJANJE&page=1&sort=0&ps=0&pe=1000" class="link1">NAPAJANJE</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=RAM&page=1&sort=0&ps=0&pe=1000" class="link1">RAM</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=SSD&page=1&sort=0&ps=0&pe=1000" class="link1">SSD</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=HDD&page=1&sort=0&ps=0&pe=1000" class="link1">HDD</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=HLD&page=1&sort=0&ps=0&pe=1000" class="link1">HLAĐENJE</a></li>
                        </ul>
                    </div>
                    <div >
                    <h4><a href="/proizvodi?kategorija=PERIFERIJE&page=1&sort=0&ps=0&pe=1000" class="link1">PERIFERIJE</a></h4>
                        <ul>
                            <li class="li1"><a href="/proizvodi?podkat=MIŠ&page=1&sort=0&ps=0&pe=1000" class="link1">MIŠEVI</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=TASTATURA&page=1&sort=0&ps=0&pe=1000" class="link1">TASTATURE</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=MONITOR&page=1&sort=0&ps=0&pe=1000" class="link1">MONITORI</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=SLUŠALICE&page=1&sort=0&ps=0&pe=1000" class="link1">SLUŠALICE</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=WEBCAM&page=1&sort=0&ps=0&pe=1000" class="link1">WEB KAMERE</a></li>
                        </ul>
                         </div>
                    <div>
                        <br/>
                        <br/>
                        <div>
                        <a href="/proizvodi?kategorija=TELEVIZOR&page=1&sort=0&ps=0&pe=1000" class="link1"><h4>TELEVIZORI</h4></a>
                        </div>
                        <br/>
                        <br/><br/>
                        <div>
                        <a href="/proizvodi?kategorija=TELEFON&page=1&sort=0&ps=0&pe=1000" class="link1"><h4>TELEFONI</h4></a>
                        </div>     
                    </div>
                </div>
                {this.state.code}
        <MessengerCustomerChat
        pageId="106431294985885"
        appId="2379326438877513"/>
            </div>
            
        );


    }

}

export default Korpa;





