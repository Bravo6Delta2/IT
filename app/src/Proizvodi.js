import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import crypto from 'crypto';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/proizvodi.css'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import jwt from 'jsonwebtoken';
import {Slider} from '@material-ui/core'; 



class Proizvodi extends React.Component {

    constructor(props){
        super(props);
            this.state = {s:'init',data:{},start:0,end:1000,code:[],ket:'',page:1,num_p:1,pag:[],pro:[],pretraga:''};
            this.change = this.change.bind(this);
            
        }
       
        componentWillMount(){
            var search = window.location.search.substring(1);
            let data = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
            let x = data;
        
            
            axios.post('http://localhost:3001/proizvodi/',data).then(
    
            (res) =>{
                if (res.data.msg == 'GG'){
                    if (x.kategorija != null){
                    this.setState({s:'comp',data:res.data,ket:x.kategorija});
                        
                    }
                    else if (x.podkat != null){
                        this.setState({s:'comp',data:res.data,ket:x.podkat});
                    }
                    else if (x.pretraga!=null){
                        this.setState({s:'comp',data:res.data,ket:x.pretraga});
                    }
                       }
                       else if (res.data.msg == 'Neuspjesno') {
                        let xx = [];
                        xx.push(
                            <div class ="m-3 p-3 div-unre">
                                <h2>ARTIKAL NIJE PRONAĐEN</h2>
                                Molimo Vas da ponovo pokušate sa manje kljucnih riječi.
                                <a href="/" class="link2">Povratak na početnu starnu</a>
                               
                            </div>
                        );
                        this.setState({
                            s:'fin',
                            code:xx
                        })
                    }
                    else if (res.data.msg == 'Neuspjesno1'){
                        let xx = [];
                        xx.push(
                            <div class ="m-3 p-3 div-unre">
                                <h2>NEMA PROIZVODA KOJI ZADOVOLJAVAJU FILTERE</h2>
                                Molimo Vas da ponovo pokušate sa manjim ograničenjima.
                                <a href="/" class="link2">Povratak na početnu starnu</a>
                            </div>
                        );
                        this.setState({
                            s:'fin',
                            code:xx
                        })
                    }   
                else{
                    
                    let xx = [];
                    xx.push(
                        <div class ="m-3 p-3 div-unre">
                            <h2>DOŠLO JE DO GREŠKE</h2>
                            Molimo Vas da se vratite na početnu starnu.
                            <a href="/" class="link2">Povratak na početnu starnu</a>
                        </div>
                    );
                    this.setState({
                        s:'fin',
                        code:xx
                    })
                   
                }
    
            },
            (err) =>{
                    window.alert('Greska 1');
            }
    
            );
            
        }
       
        componentDidUpdate(){
            if (this.state.s == "comp"){
                this.ImportCode();
             }
             else{

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
        changePage = (e) =>{
            let curr = this.state.page;
            let next = Number(e.target.innerHTML);
            let x = 1;
            if (e.target.innerHTML == 'Sledeća'){
                if (curr == this.state.num_p)
                    return;
                x = curr + 1;
            }
            else if (e.target.innerHTML == "Prethodna"){
                if (curr == 1)
                return;
                x = curr - 1;
            }
            else{
                x = next;
            }
            var search = window.location.search.substring(1);
            let data11 = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
            data11.page = x;
            let oo = new URLSearchParams(data11).toString();
        
            window.location.replace('/proizvodi?'+oo);
        }
        ImportCode(){
           
            let i = 0;
            let d=[];
            let x = Object.keys(this.state.data.data).length;
            while ( i < x){
               
                d .push(
                <div class= "div-pro-1 m-3 p-3">
                <a href ={'/proizvod?id='+this.state.data.data[i].id_p}><img class="pic-pro" src = {this.state.data.data[i].slika_1}/></a>
                <br/>
                <span class="span-pro">{this.state.data.data[i].proizvodac} {this.state.data.data[i].model}</span>
                <br/>
                <span class="span-pro float-md-right">{this.state.data.data[i].cijena} €</span>
                </div> 
                
                );
               
                
                i++;
            }
            let e = [];
            i = 0;
            while (i <= (x/4)){
            e.push(<div class = "d-md-flex justify-content-md-center p-2 ">
                {d[i*4]}{d[(i*4)+1]}{d[(i*4)+2]}{d[(i*4)+3]}
                </div>);
            i++;
            }
           
            i=1;
           
            let pag1 = [];
            pag1.push(
                <li class="page-item"><span class="page-link" id ="--"name="--" value="--" onClick={this.changePage} >Prethodna</span></li>
            );
            while(i<=(this.state.data.page_num[0].count/12)+1){
                let strin = i.toString(10);
                pag1.push(
                    <li class="page-item"><span id = {strin} name = {strin} class="page-link" onClick={this.changePage} value={i}>{i}</span></li>
                );
                i++;
            }
            pag1.push(
                <li class="page-item"><span id ="++" name ="++" class="page-link" value="++" onClick={this.changePage}>Sledeća</span></li>
            );
            
            let proo = [];
            x = Object.keys(this.state.data.pro).length;
            i = 0;
            while(i<x){

                proo.push(
                    <div class="form-check m-2">
                            <input class="form-check-input" type="checkbox" value="" id={this.state.data.pro[i].proizvodac}/>
                            <label class="form-check-label">
                              {this.state.data.pro[i].proizvodac}
                            </label>
                          </div>
                );
                
                i++;
            }

            this.setState(
                {
                    code : e,
                    s : 'finish',
                    num_p : Math.floor(this.state.data.page_num[0].count/12)+1,
                    page: 1,
                    pag : pag1,
                    pro:proo
                }
            );
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
        change (e,number){
          this.setState({
            start : number[0],
            end : number[1]
        } );
            
        }
        ShowFilter(){
            if(document.getElementById('filter').classList.contains('d-none')){
                document.getElementById('filter').classList.replace('d-none','d-flex');
               // document.getElementById('filter-b').classList.replace('d-none','d-flex');
            }
            else{
                document.getElementById('filter').classList.replace('d-flex','d-none');
              //  document.getElementById('filter-b').classList.replace('d-flex','d-none');
            }
        }
        Filter = () =>{
            var search = window.location.search.substring(1);
            let data11 = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
            data11.page = 1;
            data11.sort = document.getElementById('sort').value;
            console.log(this.state);
            data11.ps = this.state.start;
            data11.pe = this.state.end;
            
            let x = Object.keys(this.state.data.pro).length;
            let i = 0;
            let kkk = 0;
            let arri ='&arr=';
            while (i<x){

                if(document.getElementById(this.state.data.pro[i].proizvodac).checked){
                    kkk++;
                    if (i+1 == x){
                        arri = arri+this.state.data.pro[i].proizvodac;
                    }
                    else{
                    arri = arri+this.state.data.pro[i].proizvodac+',';}

                }

                i++;
            }
            let oo = new URLSearchParams(data11).toString();
            if(kkk==0){
                window.location.replace('/proizvodi?'+oo);
            }
            else{
                window.location.replace('/proizvodi?'+oo+arri);
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

        if (this.state.s == "init"){
            return(
                <div>
                    <div class="sticky" ata-spy="affix" data-offset-top="197">
        <div id="nav" class=" navbar navbar-inverse d-flex justify-content-md-between ce leftpad">
            <div class="d-md-inline-flex p-2 align-self-center ">
                <div class="d-inline-flex p-2 he he1" onClick={this.Drop}>KATALOG</div>
                <a href = "/kontakt" class="link2"><div class="d-inline-flex p-2 he he1">KONTAKT</div></a>
            </div>
            <div class="d-md-inline-flex p-2 align-self-center">
            <div class="d-md-inline-flex p-2">
                    <input id="pretraga" name="pretraga" onChange={this.textChanged} class="form-control mr-sm-2 align-self-center" type="search" placeholder="Unesite tekst" aria-label="Search"/>
                    <button class="btn btn-outline-light my-2 my-sm-0 align-self-center" onClick={this.Pretrazi}>PRETRAGA</button>
                </div>
            </div>
            <div class="d-md-inline-flex p-2 align-self-center">
                <a id ="yolo1" href="" class="link2"><div id = "yolo" class="d-md-inline-flex p-2 he he1">PROFIL/KATALOG</div></a>
                <a href="/korpa" class="link2"><div class="d-md-inline-flex p-2 he he1">KORPA</div></a>
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
        <div id = "div-dim p-2 m-2"  class="pic">
            <center><h2>{this.state.ket}</h2></center>
    
           <div class= "icon">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-filter icon" viewBox="0 0 16 16" onClick={this.ShowFilter}>
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
           </div>
           <div className="div-filter m-3">
           <div id="filter" class="p-2 d-none">
                <div class="container-fluid p-2">
                    <p>
                    <label class="form-label">CIJENOVNI OKVIR:</label>
                    <Slider
                        value={[this.state.start,this.state.end]}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min = {0}
                        max = {1000}
                        onChange = {this.change}
                    />
                    </p>
                    <div id="slider-range" class="container-fluid"></div>
                </div>
               
                <div class=" p-2">
                    <label class="form-label">PROIZVOĐAČ</label> <br/>
                    <div class=" p-2 d-md-inline-flex">
                        <div class="form-check m-2">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label class="form-check-label">
                              Default checkbox
                            </label>
                          </div>
                          <div class="form-check m-2">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label class="form-check-label">
                              Default checkbox
                            </label>
                          </div>
                          <div class="form-check m-2">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label class="form-check-label">
                              Default checkbox
                            </label>
                          </div>
                          <div class="form-check m-2">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label class="form-check-label">
                              Default checkbox
                            </label>
                          </div>
                     
                    </div>
                 
                </div>
               
            </div>
            <div id = "div-dim-1" className = "p-2 d-none">
                        <div>
                            <label class="form-check-label"> Sortriaj proizvode:</label><br/>
                            <select class="form-select form-select-md" aria-label=".form-select-sm example">
                                <option selected>Izabeite nacin sortiranja</option>
                                <option value="1">Najskuplje prvo</option>
                                <option value="2">Najjeftinije pro</option>
                                <option value="3">A-Z</option>
                            </select>
                        </div>
    
            </div>
            </div>
        </div>
                <div><h1>Loading</h1></div>
                </div>
    
            )
        }
        else
        return(
            <div>
            <div class="sticky" ata-spy="affix" data-offset-top="197">
        <div id="nav" class=" navbar navbar-inverse d-flex justify-content-md-between ce leftpad">
            <div class="d-md-inline-flex p-2 align-self-center ">
                <div class="d-inline-flex p-2 he he1" onClick={this.Drop}>KATALOG</div>
                <a href = "/kontakt" class="link2"><div class="d-inline-flex p-2 he he1">KONTAKT</div></a>
            </div>
            <div class="d-md-inline-flex p-2 align-self-center">
            <div class="d-md-inline-flex p-2">
                    <input id="pretraga" name="pretraga" onChange={this.textChanged} class="form-control mr-sm-2 align-self-center" type="search" placeholder="Unesite tekst" aria-label="Search"/>
                    <button class="btn btn-outline-light my-2 my-sm-0 align-self-center" onClick={this.Pretrazi}>PRETRAGA</button>
                </div>
            </div>
            <div class="d-md-inline-flex p-2 align-self-center">
                <a id ="yolo1" href="" class="link2"><div id = "yolo" class="d-md-inline-flex p-2 he he1">PROFIL/KATALOG</div></a>
                <a href="/korpa" class="link2"><div class="d-md-inline-flex p-2 he he1">KORPA</div></a>
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
    <div id = "div-dim p-2 m-2"  class="pic">
        <center><h2>{this.state.ket}</h2></center>
    </div>
       <div class= "icon">
        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-filter icon" viewBox="0 0 16 16" onClick={this.ShowFilter}>
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
          </svg>
       </div>
       <div id="filter" className="div-filter m-3 d-none flex-column">
           
       <div  class="p-2 d-md-inline-flex">
        	<div class="p-2 container-fluid" >
            <div id="slider-range">
                <p>
                <label class="form-label">CIJENOVNI OKVIR:</label>
                <Slider
                    value={[this.state.start,this.state.end]}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min = {0}
                    max = {1000}
                    onChange = {this.change}
                />
                </p>
                </div>
            </div>
           
            <div class="p-2 container-fluid">
                <label class="form-label">PROIZVOĐAČ</label> <br/>
                <div class=" p-2 d-md-inline-flex">
                    {this.state.pro}
                </div>
             
            </div>
           
        </div>
        <div class= "d-md-inline-flex justify-content-between">
        <div  className = "p-2 m-2">
                 
                        <label class="form-check-label"> Sortriaj proizvode:</label><br/>
                        <select id="sort"class="form-select form-select-md" aria-label=".form-select-sm example">
                            <option value="0"selected>Izabeite nacin sortiranja</option>
                            <option value="1">Najskuplje prvo</option>
                            <option value="2">Najjeftinije pro</option>
                            <option value="3">A-Z</option>
                        </select>
                   

        </div>
        <div class ="p-4 mt-2">
                <button class =" btn btn-primary" onClick={this.Filter}> FILTRIRAJ</button>
        </div>
        </div>
        </div>
     
        
            {this.state.code}
            <nav aria-label="Page navigation example" className="p-2 m-2">
                <ul class="pagination justify-content-center">
                   {this.state.pag}
                 </ul>
            </nav>
            <MessengerCustomerChat
            pageId="106431294985885"
            appId="2379326438877513"/>
        </div>

        )
    };
    }
export default Proizvodi;