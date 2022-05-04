import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import crypto from 'crypto';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/kontakt.css';
import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';
import jwt from 'jsonwebtoken';
import MessengerCustomerChat from 'react-messenger-customer-chat';

class Kontakt extends React.Component {
   
    componentDidMount(){
       
        if(localStorage.getItem('token') == null || jwt.decode(localStorage.getItem('token')).exp <  (new Date().getTime() + 1) / 1000){
        
            document.getElementById('yolo').innerHTML="PRIJAVA";
            document.getElementById('yolo1').href="/login1/";
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
    return (
        <div>
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
                <a href = "" class="link2"><div class="d-md-inline-flex p-2 he he1">KORPA</div></a>
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
        </div>
        <div id = "div-dim"class = " pic" >
        <center><h1 class = "h1-oo">KONTAKT</h1></center>
        <div class = "div-kon container-fluid">
            <center>
            <h3>CALL CENTAR: <a class="link2 phone"  href="tel:1924">1924</a></h3>
            <h3>E-MAIL: <a class="link2 phone" href="mailto:lorem.ipsum@gmail.com"> lorem.ipsum@gmail.com</a></h3>   
            <h3>KONTAKT ZA PRAVNA LICA: <a class="link2 phone"  href="tel:+38267333111">+38267333111</a></h3>
            <h3>KONTAKT ZA ZA ZAPOSLENJE: <a class="link2 phone"  href="tel:+38267333222">+38267333222</a></h3>
            </center>
        </div>
        <center><h1 class="h1-oo">GDJE SE NALAZIMO</h1></center>
        <div class= "container-fluid div-kon">
        <div class = "container-fluid d-md-inline-flex p-2">
        <div id='map' class="map">
                <Map className="map"
                    google={this.props.google}
                    zoom={14}
                    initialCenter={{ lat: 42.437167, lng: 19.235313}}
                    style={{width: '43vw',height: '40vh'}}
                 >
                <Marker position={{ lat: 42.437167, lng: 19.235313}} />
                </Map>
        </div>
       
            <div class="div-pro">
                <h2>Lorem ipsum - Delta City</h2>
                <span class="span-pro">
                    Adresa: <br/>Cetinjski Put b.b, Podgorica 81000<br/>
                    Radno vrijeme:<br/>
                    Ponedeljak - Petak / 09:00h do 20:00h <br/>
                    Subota / 9:00h do 17:00h <br/>
                    Broj telefona poslovnice : <a class="link2 phone"  href="tel:+38267888999">+38267888999</a>

                </span>

            </div>
            </div>
            <div class = "container-fluid d-md-inline-flex p-2">
            <div id='map1' class= "map">
                <Map className="map"
                    google={this.props.google}
                    zoom={14}
                    initialCenter={{ lat:42.775113, lng: 18.949347}}
                    style={{width: '43vw',height: '40vh'}}
                 >
                <Marker position={{ lat: 42.775113, lng: 18.949347}} />
                </Map>
            </div>
            
            <div class="div-pro">
                <h2>Lorem ipsum - Nikšić</h2>
                <span class="span-pro">
                    Adresa: <br/>Njegoševa b.b, Nikšić 81400<br/>
                    Radno vrijeme:<br/>
                    Ponedeljak - Petak / 09:00h do 20:00h <br/>
                    Subota / 9:00h do 17:00h <br/>
                    Broj telefona poslovnice :<a class="link2 phone"  href="tel:+38267999888">+38267999888</a> 

                </span>

            </div>
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

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDiS-X1YI7f9ikKv_EtyyJPmZEq01PsAq0'
})(Kontakt);

