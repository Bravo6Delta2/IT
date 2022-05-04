import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import crypto from 'crypto';
import 'bootstrap/dist/css/bootstrap.min.css';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import jwt from 'jsonwebtoken';
import './css/proizvod.css'
class Proizvod extends React.Component {

    constructor(props){
        super(props);
            this.state = {s:'init',code:[],data:{},pretraga:''};
            this.addItem= this.addItem.bind(this);
        }

        componentWillMount(){
            var search = window.location.search.substring(1);
            let data1 = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
            let x = data1;

            //console.log(x);

            axios.post('http://192.168.0.18:3001/proizvod/',data1).then(

                (res)=>{
                    if (res.data.msg == 'GG'){
                        if(res.data.data[0].slika_1 == null){
                            res.data.data[0].slika_1 = '/img/no_image.jpg'
                        }
                        if(res.data.data[0].slika_2 == null){
                            res.data.data[0].slika_2 = '/img/no_image.jpg'
                        }
                        if(res.data.data[0].slika_3 == null){
                            res.data.data[0].slika_3 = '/img/no_image.jpg'
                        }
                        this.setState(
                            {s:'comp',data:res.data.data[0]}
                        );
                    }
                },

                (err)=>{
                    window.alert('Greska 2');
                }
            );

        }

        addItem (){
               
            if (localStorage.getItem('pro') == null){
                let pp = [];
                pp.push(this.state.data.id_p);
                localStorage.setItem('pro',pp);
         
            }
            else{
                let pp =[];
                pp.push(localStorage.getItem('pro'));
                pp.push(this.state.data.id_p);
                localStorage.setItem('pro',pp);  
               
            }
             window.alert('Proizvod je dodat u korpu');
        }

        addItem1 =()=>{
               
            if (localStorage.getItem('pro') == null){
                let pp = [];
                pp.push(this.state.data.id_p);
                localStorage.setItem('pro',pp);
         
            }
            else{
                let pp =[];
                pp.push(localStorage.getItem('pro'));
                pp.push(this.state.data.id_p);
                localStorage.setItem('pro',pp);  
            }

            window.location.replace('/korpa');
             
        }

        componentDidUpdate(){
            if (this.state.s == "comp"){
                this.ImportCode();
             }
            

            if(localStorage.getItem('token') == null || jwt.decode(localStorage.getItem('token')).exp <  (new Date().getTime() + 1) / 1000){
        
                document.getElementById('yolo').innerHTML="PRIJAVA";
                document.getElementById('yolo1').href="/login1/";
            }
            else{
                document.getElementById('yolo').innerHTML="PROFIL";
                document.getElementById('yolo1').href="/profil";
            }
        }

        ImportCode(){
            let d = [];
            let cp = [];
            if (this.state.data.kolicina == 0 ){
                cp.push(<div><center><h2>PROIZVOD JE NEDOSTUPAN</h2></center></div>);
            }
            else if (this.state.data.popust == 0 && this.state.data.kolicina > 0 ){
                cp.push(
                <div>
                <div><center><h2>CIJENA: {this.state.data.cijena} €</h2></center></div>
                <div class= "m-4">
                <br/>
                <center><button type="button" class="btn btn-primary btn-lg" onClick={this.addItem}>Dodaj u korpu</button></center>
                </div>
                <div class= "m-4">
                <center><button type="button" class="btn btn-success btn-lg">Kupi odmah</button></center>
                </div>
                </div>)
            }
            else {
                let cp1 = this.state.data.cijena - (this.state.data.cijena*this.state.data.popust/100);
                let cp2= parseFloat(cp1).toFixed(2);
                cp.push(<div>
                   <div> <center><h4>Orginalna cijena: {this.state.data.cijena} €</h4></center></div>
                   <div> <center><h4>Popust: {this.state.data.popust} %</h4></center></div>
                   <div> <center><h2>TRENUTNA CIJENA: <span class="cp"> {cp2} €</span></h2></center></div>
                   <div class= "m-4">
                    <center><button type="button" class="btn btn-primary btn-lg" onClick={this.addItem}>Dodaj u korpu</button></center>
                    </div>
                    <div class= "m-4">
                    <center><button type="button" class="btn btn-success btn-lg"onClick={this.addItem1}>Kupi odmah</button></center>
                    </div>
                   </div>
                   );
            }
            d.push(
                <div class = "m-2">
               <center> <h1>{this.state.data.proizvodac} {this.state.data.model}</h1></center>
               <div class="m-3 container-fluid d-md-flex flex-md-row justify-content-md-around">
                <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="carousel">
  <div class="carousel-indicators ">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active padslidic" data-bs-interval="10000">
      <img src={this.state.data.slika_1} class="d-block  slidic" alt="..."/>
    </div>
    <div class="carousel-item padslidic " data-bs-interval="10000">
      <img src={this.state.data.slika_2} class="d-block slidic" alt="..."/>
    </div>
    <div class="carousel-item padslidic" data-bs-interval="10000">
      <img src={this.state.data.slika_3} class="d-block  slidic" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Prethodna</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Sledeća</span>
  </button>
</div>
<div class ="m-3 leftside ">
    <div class="leftside1">
    {cp}
    </div>
    </div>
</div>
<div class="d-flex  ">
<fieldset class="customLegend p-3"><legend class="customLegend">OPIS</legend>
{this.state.data.opis}</fieldset>
</div>
</div> 
  
               );

            this.setState(
               {s:'done',code:d}
            )


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
        textChanged = (e) => {
            const { name, value } = e.target;
            this.setState({ [name]: value });
        }

        Pretrazi = ()=>{
            
            window.location.replace('/proizvodi?page=1&sort=0&ps=0&pe=1000&pretraga='+this.state.pretraga);
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
                    <input id="pretraga" name="pretraga" onChange={this.textChanged} class="form-control mr-sm-2 align-self-center" type="search" placeholder="Unesite tekst" aria-label="Search"/>
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
            <h1>Loading...</h1> 
            <MessengerCustomerChat
            pageId="106431294985885"
            appId="2379326438877513"/>
        </div>);
        else{
            return ( <div class="sticky" ata-spy="affix" data-offset-top="197">
            <div id="nav" class="pic navbar navbar-inverse d-flex justify-content-md-between ce leftpad">
                <div class="d-md-inline-flex p-2 align-self-center ">
                    <div class="d-inline-flex p-2 he he1" onClick={this.Drop}>KATALOG</div>
                    <a href="kontakt/" class = "link2"><div class="d-inline-flex p-2 he he1">KONTAKT</div></a>
                </div>
                <div class="d-md-inline-flex p-2 align-self-center">
                <div class="d-md-inline-flex p-2">
                    <input id="pretraga" name="pretraga" onChange={this.textChanged} class="form-control mr-sm-2 align-self-center" type="search" placeholder="Unesite tekst" aria-label="Search"/>
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
                    <h4><a href="/proizvodi?kategorija=KOMPONENTE" class="link1">KOMPONENTE</a></h4>
                        <ul>
                        <li class="li1"><a href="/proizvodi?podkat=CPU" class="link1" >CPU</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=GPU" class="link1">GPU</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=MATP" class="link1">MATIČNA PLOČA</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=NAPAJANJE" class="link1">NAPAJANJE</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=RAM" class="link1">RAM</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=SSD" class="link1">SSD</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=HDD" class="link1">HDD</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=HLD" class="link1">HLAĐENJE</a></li>
                        </ul>
                    </div>
                    <div >
                    <h4><a href="/proizvodi?kategorija=PERIFERIJE" class="link1">PERIFERIJE</a></h4>
                        <ul>
                            <li class="li1"><a href="/proizvodi?podkat=MIŠ" class="link1">MIŠEVI</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=TASTATURA" class="link1">TASTATURE</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=MONITOR" class="link1">MONITORI</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=SLUŠALICE" class="link1">SLUŠALICE</a></li>
                            <li class="li1"><a href="/proizvodi?podkat=WEBCAM" class="link1">WEB KAMERE</a></li>
                        </ul>
                         </div>
                    <div>
                        <br/>
                        <br/>
                        <div>
                        <a href="/proizvodi?kategorija=TELEVIZOR" class="link1"><h4>TELEVIZORI</h4></a>
                        </div>
                        <br/>
                        <br/><br/>
                        <div>
                        <a href="/proizvodi?kategorija=TELEFON" class="link1"><h4>TELEFONI</h4></a>
                        </div>     
                    </div>
                </div>
                    <div>
                        {this.state.code}
                    </div>
                    <MessengerCustomerChat
                    pageId="106431294985885"
                    appId="2379326438877513"/>
                </div>);


        }

    }
}


export default Proizvod;