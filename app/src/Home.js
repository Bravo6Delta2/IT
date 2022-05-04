import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import crypto from 'crypto';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import jwt from 'jsonwebtoken';
import Link from 'react-router-dom/Link';
class Home extends React.Component {

    constructor(props){
        super(props);
            this.state = {s:'init',data:{}};
        }

        
    componentDidMount(){
        let data ={};
        axios.post('http://localhost:3001/',data).then(

        (res) =>{
            if (res.data.msg == 'GG'){
                this.setState({s:'comp',data:res.data});
            }
            else{
                window.alert('Greska');
            }

        },
        (err) =>{
                window.alert('Greska');
        }

        );
      
    } 
    componentDidUpdate(){
        if (this.state.s == 'comp'){
                
            if(localStorage.getItem('token') == null || jwt.decode(localStorage.getItem('token')).exp <  (new Date().getTime() + 1) / 1000){
        
                document.getElementById('yolo').innerHTML="PRIJAVA";
                document.getElementById('yolo1').href="/login1";
            }
            else{
                document.getElementById('yolo').innerHTML="PROFIL";
                document.getElementById('yolo1').href="/profil";
            }
           
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
            <a id="yolo1"href = "" class="link2"><div id = "yolo"class="d-md-inline-flex p-2 he he1">Text</div></a>
            <a href = "/korpa" class="link2"><div class="d-md-inline-flex p-2 he he1">KORPA</div></a>
        </div>
    </div>
    
    <div class="container-fluid d-none p-2 justify-content-md-around dropdown" id = "dropdown" >
            <div>
            <Link to="/proizvodi?kategorija=KOMPONENTE&page=1&sort=0&ps=0&pe=1000"><h4>KOMPONENTE</h4></Link>
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
   <h1>Loading...</h1> 
<MessengerCustomerChat
pageId="106431294985885"
appId="2379326438877513"/>
    </div>)
    else
    return (
        <div class="sticky" ata-spy="affix" data-offset-top="197">
        <div id="nav" class="pic navbar navbar-inverse d-flex justify-content-md-between ce leftpad">
            <div class="d-md-inline-flex p-2 align-self-center ">
                <div class="d-inline-flex p-2 he he1" onClick={this.Drop}>KATALOG</div>
               <Link to='/kontakt' className="link2"><div class="d-inline-flex p-2 he he1">KONTAKT</div></Link>
            </div>
            <div class="d-md-inline-flex p-2 align-self-center">
                <div class="d-md-inline-flex p-2">
                    <input id="pretraga" class="form-control align-self-center" type="search" placeholder="Unesite tekst" aria-label="Search"/>
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
            <Link className ="link1"to="/proizvodi?kategorija=KOMPONENTE&page=1&sort=0&ps=0&pe=1000"><h4>KOMPONENTE</h4></Link>
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
        <div>
            <div class="p-2 m-2"><center><h1><strong>Izdvajamo iz ponude</strong></h1></center></div>
            <div class = "d-md-flex justify-content-md-center p-2 ">
                <div class= "div-pro-1 m-3 p-3">
                    <a href ={'/proizvod?id='+this.state.data.data[0].id_p}><img class="pic-pro" src = {this.state.data.data[0].slika_1}/></a>
                    <br/>
                    <span class="span-pro">{this.state.data.data[0].proizvodac} {this.state.data.data[0].model}</span>
                    <br/>
                    <span class="span-pro float-md-right">{this.state.data.data[0].cijena} €</span>
                </div> 
                <div class= "div-pro-1 m-3 p-3">
                    <a href ={'/proizvod?id='+this.state.data.data[1].id_p}><img class="pic-pro" src = {this.state.data.data[1].slika_1}/></a>
                    <br/>
                    <span class="span-pro">{this.state.data.data[1].proizvodac} {this.state.data.data[1].model}</span>
                    <br/>
                    <span class="span-pro float-md-right">{this.state.data.data[1].cijena} €</span>
                </div> 
                <div class= "div-pro-1 m-3 p-3">
                    <a href ={'/proizvod?id='+this.state.data.data[2].id_p}><img class="pic-pro" src = {this.state.data.data[2].slika_1}/></a>
                    <br/>
                    <span class="span-pro">{this.state.data.data[2].proizvodac} {this.state.data.data[2].model}</span>
                    <br/>
                    <span class="span-pro float-md-right">{this.state.data.data[2].cijena} €</span>
                </div> 
            </div>
            <div class = "d-md-flex justify-content-md-center p-2">
                <div class= "div-pro-1 m-3 p-3">
                    <a href ={'/proizvod?id='+this.state.data.data[3].id_p}><img class="pic-pro" src = {this.state.data.data[3].slika_1}/></a>
                    <br/>
                    <span class="span-pro">{this.state.data.data[3].proizvodac} {this.state.data.data[3].model}</span>
                    <br/>
                    <span class="span-pro float-md-right">{this.state.data.data[3].cijena} €</span>
                </div> 
                <div class= "div-pro-1 m-3 p-3">
                    <a href ={'/proizvod?id='+this.state.data.data[4].id_p}><img class="pic-pro" src = {this.state.data.data[4].slika_1}/></a>
                    <br/>
                    <span class="span-pro">{this.state.data.data[4].proizvodac} {this.state.data.data[4].model}</span>
                    <br/>
                    <span class="span-pro float-md-right">{this.state.data.data[4].cijena} €</span>
                </div> 
                <div class= "div-pro-1 m-3 p-3">
                    <a href ={'/proizvod?id='+this.state.data.data[5].id_p}><img class="pic-pro" src = {this.state.data.data[5].slika_1}/></a>
                    <br/>
                    <span class="span-pro">{this.state.data.data[5].proizvodac} {this.state.data.data[5].model}</span>
                    <br/>
                    <span class="span-pro float-md-right">{this.state.data.data[5].cijena} €</span>
                </div> 
                
            </div>
            <div class="d-flex justify-content-md-around div-pro-3">
                <div class = "m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg><br/>
                    <span class= "home-text-1">Besplatna dostava</span>
                </div>
                <div class = "m-2 pt-3">
                <span class= "home-text-1">10 GODINA </span><br/>
                <span class = "home-text-2"> SA VAMA</span>
                </div>
                <div class = "m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
                    </svg>
                    <br/>
                    <span class= "home-text-1">Plaćanje pouzećem</span>
                </div>

            </div>
        </div>   
  <MessengerCustomerChat
    pageId="106431294985885"
    appId="2379326438877513"/>
        </div>
    )

}
}

export default Home;