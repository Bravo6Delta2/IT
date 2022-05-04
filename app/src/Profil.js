import logo from './logo.svg';
import ReactDOM from 'react-dom';
import React from 'react';
import jwt from 'jsonwebtoken';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import axios from 'axios';
import './css/profil.css';
class Profil extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            s:'init',
            user:'',
            history:'',
            adrese:'',
            code:'',
            ulica_n:'',
            grad_n:'',
            opstina_n:'',
            po_br_n:'',
            drzava_n:'',
            pretraga:''
        };
        }
    componentWillMount(){
        let data = {token : localStorage.getItem('token')};
        axios.post('http://localhost:3001/profil/',data).then(
            (res)=>{
                if (res.data.msg == 'err'){
                    window.alert('Error 1');
                    this.props.history.push('/'); 
                }
                this.setState(
                    {
                        s:'comp',
                        user:res.data.data[0],
                        history:res.data.history,
                        adrese:res.data.adrese,
                    
                    }
                );
            },
            (err)=>{
                window.alert('Error');
            }
        );
    }

    Pretrazi = ()=>{
            
        window.location.replace('/proizvodi?page=1&sort=0&ps=0&pe=1000&pretraga='+this.state.pretraga);
    }

    textChanged = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }); 
    }
    adrese(){
        if (document.getElementById('podacioa').classList.contains('d-none')){
            document.getElementById('podacioa').classList.replace('d-none','info-div');
        }
        else{
            document.getElementById('podacioa').classList.replace('info-div','d-none');
        }
    }
    addadr(){
        if (document.getElementById('new_adr').classList.contains('d-none')){
            document.getElementById('new_adr').classList.replace('d-none','info-div');
        }
        else{
            document.getElementById('new_adr').classList.replace('info-div','d-none');
        }
    }
    send_adr = ()=>{
        let x = 0;
        if (isNaN(this.state.po_br_n) || this.state.po_br_n.length == 0){
            window.alert('Niste ispravno unijeli poštanski broj');
            console.log(document.getElementById('po_br').classList.value);
            document.getElementById('n_po_br').classList.value = 'is-invalid form-control';
            x =1;
        }
        else{
            document.getElementById('n_po_br').classList.value = 'is-valid form-control';
        }
        if (this.state.ulica_n.length == 0){
            window.alert('Morate unijeti adresu');
            document.getElementById('n_ulica').classList.value = 'is-invalid form-control';
            x=1;
        }
        else{
            document.getElementById('n_ulica').classList.value = 'is-valid form-control';
        }


        if (this.state.grad_n.length == 0){
            window.alert('Moarte unijeti grad');
            document.getElementById('n_grad').classList.value = 'is-invalid form-control';
            x=1;
        }
        else{
            document.getElementById('n_grad').classList.value = 'is-valid form-control';
        }


        if (this.state.opstina_n.length == 0){
            window.alert('Morate unijeti opstinu');
            document.getElementById('n_opstina').classList.value = 'is-invalid form-control';
            x=1;
        }
        else{
            document.getElementById('n_opstina').classList.value = 'is-valid form-control';
        }


        if (this.state.drzava_n.length == 0){
            window.alert('Morate unijeti drzavu');
            document.getElementById('n_drzava').classList.value = 'is-invalid form-control';
            x=1;
        }
        else{
            document.getElementById('n_drzava').classList.value = 'is-valid form-control';
        }

        if (x){
            return;
        }
        let data ={
            
            token : localStorage.getItem('token'),
            ulica : this.state.ulica_n,
            grad : this.state.grad_n,
            opstina : this.state.opstina_n,
            po_br: this.state.po_br_n,
            drzava:this.state.drzava_n
        }
        axios.post('http://localhost:3001/addr',data).then(

            (res)=>{
                if (res.data.msg == 'GG'){
                    window.alert('Nova adresa je uspješno dodata');
                    window.location.replace('http://localhost:3000/profil');
                }
                else{
                    window.alert('Nova adresa nije dodata');
                }
            },
            (err)=>{
                
            }

        );
    }
    ChangeAdrees = (e)=>{
            
        let x = document.getElementById('ggf').value;
        document.getElementById('ulica').value = this.state.adrese[x].ulica;
        document.getElementById('grad').value = this.state.adrese[x].grad;
        document.getElementById('opstina').value = this.state.adrese[x].opstina;
        document.getElementById('po_br').value = this.state.adrese[x].postanski_br;
        document.getElementById('drzava').value = this.state.adrese[x].drzava;

       
    }
    ImportCode(){
        //console.log(this.state);
        let xx = [];

            let yy = []; 
            let i;
            for ( i = 0; i < Object.keys(this.state.adrese).length; i++){
                if (i==0){
                    yy.push(<option id={i} value={i}  selected>Adresa{i+1} - id : {this.state.adrese[i].id_a}</option>);
                }
                else
                yy.push(<option id ={i} value={i}>Adresa{i+1} - id : {this.state.adrese[i].id_a}</option>);
            }
            xx.push(
                <div id="podacioa" className='d-none'>
                VAŠI PODACI
                <div class = "mx-4 my-2">
                <select  class="form-select" id = "ggf" onChange={this.ChangeAdrees} >{yy}</select> 

                </div>
            <div class="container-fluid d-md-inline-flex justify-content-md-around p-2">
                <div class="container-fluid">
                    <label class="form-label">IME</label>
                    <input id ="ime" name="ime" type="text" class ="form-control" value={this.state.user.ime} readOnly/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">PREZIME</label>
                    <input id="prezime" name="prezime"type="text" class ="form-control"  placeholder="Unesite vaše prezime"  value={this.state.user.prezime} readOnly/>
                </div>
            </div>
            <div class="container-fluid d-md-inline-flex justify-content-md-around p-2">
                <div class="container-fluid">
                    <label class="form-label">E-MAIL</label>
                    <input id ="email" name="email" type="email" class ="form-control"  placeholder="Unesite vašu e-mail adresu"  value={this.state.adrese[0].email} readOnly/>
                </div>
            </div>
            <div class="container-fluid p-2" > 
                <div class="container-fluid">
                    <label class="form-label">ADRESA</label>
                    <input id="ulica" name="ulica"type="text" class ="form-control"  placeholder="Unesite vašu adresu"  value={this.state.adrese[0].ulica} readOnly/>
                </div>
            </div>
           
            <div class="container-fluid d-md-inline-flex justify-content-md-around p-2">
                <div class="container-fluid">
                    <label class="form-label">GRAD</label>
                    <input id="grad" name="grad" type="text" class ="form-control"  placeholder="Unesite ime grada" value={this.state.adrese[0].grad} readOnly/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">OPŠTINA</label>
                    <input id="opstina" name="opstina" type="text" class ="form-control"  placeholder="Unesite ime opštine"  value={this.state.adrese[0].opstina} readOnly/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">POŠTANSKI BROJ</label>
                    <input id="po_br" name="po_br" type="text" class ="form-control"  placeholder="Unesite poštanski broj" value={this.state.adrese[0].postanski_br} readOnly/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">DRŽAVA</label>
                    <input id="drzava" name="drzava" type="text" class ="form-control"  placeholder="Unesite ime države" value={this.state.adrese[0].drzava} readOnly/>
                </div>
            </div>
               
                </div>

            );
            //New adr
            xx.push(
                <div id="new_adr" className='d-none'>
                    NOVA ADRESA
            <div class="container-fluid d-md-inline-flex justify-content-md-around p-2">
                <div class="container-fluid">
                    <label class="form-label">E-MAIL</label>
                    <input id ="n_email" name="email" type="email" class ="form-control"  placeholder="Unesite vašu e-mail adresu" onChange={this.textChanged} value={this.state.adrese[0].email} readOnly/>
                </div>
            </div>
            <div class="container-fluid p-2" > 
                <div class="container-fluid">
                    <label class="form-label">ADRESA</label>
                    <input id="n_ulica" name="ulica_n"type="text" class ="form-control"  placeholder="Unesite vašu adresu" onChange={this.textChanged} value={this.state.ulica}/>
                </div>
            </div>
           
            <div class="container-fluid d-md-inline-flex justify-content-md-around p-2">
                <div class="container-fluid">
                    <label class="form-label">GRAD</label>
                    <input id="n_grad" name="grad_n" type="text" class ="form-control"  placeholder="Unesite ime grada" onChange={this.textChanged} value={this.state.grad}/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">OPŠTINA</label>
                    <input id="n_opstina" name="opstina_n" type="text" class ="form-control"  placeholder="Unesite ime opštine" onChange={this.textChanged} value={this.state.opstina}/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">POŠTANSKI BROJ</label>
                    <input id="n_po_br" name="po_br_n" type="text" class ="form-control"  placeholder="Unesite poštanski broj" onChange={this.textChanged} value={this.state.po_br}/>
                </div>
                <div class="container-fluid">
                    <label class="form-label">DRŽAVA</label>
                    <input id="n_drzava" name="drzava_n" type="text" class ="form-control"  placeholder="Unesite ime države" onChange={this.textChanged} value={this.state.drzava}/>
                </div>
            </div>
               <div className ="m-3 p-1"><button type="button" class="btn btn-secondary" onClick = {this.send_adr}>POŠALJI</button></div>
                </div>

            );
                let kk = [];
                kk.push(
                    <center> <h2> ISTORIJA</h2> </center> );
                    let j;
                for (i = 0 ; i<Object.keys(this.state.history[0]).length; i++){
                    let datic = this.state.history[0][i].datum.split('T');
                    kk.push(
                        <div className = "d-flex justify-content-md-between mt-4">
                            <div class="m-2">Datum pručivanja : {datic[0]}</div>
                            <div class="m-2">Id porudžbine : {this.state.history[0][i].id_k}</div>
                            <div class="m-2">Id adrese na koju je posalat porudžbina : {this.state.history[0][i].id_a}</div>
                        </div>
                       );
                       kk.push(
                        <div className = "nncontainer">
                            <div class="nnleft m-2">Naziv</div>
                            <div class="nncenter m-2"><center>Količina</center></div>
                            <div class="nnright m-2"><span className='nnnright'>Cijena</span></div>
                        </div>
                       );
                    for(j=0;j<Object.keys(this.state.history[1]).length; j++){
                        
                        if (this.state.history[0][i].id_k == this.state.history[1][j].id_k ){
                            kk.push(
                                <div class="nncontainer">
                                <div class="nnleft m-2"><a class = 'link2 linkitemiii'href ={'http://localhost:3000/proizvod?id='+this.state.history[1][j].id_p}><h4>{this.state.history[1][j].proizvodac} {this.state.history[1][j].model}</h4></a></div>
                                <div class="m-2 nncenter"><center>{this.state.history[1][j].kolicina}</center></div>
                                <div class="m-2 nnright"><span className="nnnright">{this.state.history[1][j].cijena_k_p}€</span></div>
                              </div>
                            );
                        }
                       
                    }
                    if (i==Object.keys(this.state.history[0]).length-1  )
                    kk.push(
                        <div class="d-flex justify-content-md-end m-2"> <div><h5>Ukupno : {this.state.history[0][i].total}€</h5></div></div>);
                    else{
                    kk.push(
                        <div class="d-flex justify-content-md-end endofline m-2"> <div><h5>Ukupno : {this.state.history[0][i].total}€</h5></div></div>);} 
                        }


            xx.push(
                <div class = "div-history m-4">
                    {kk}
                </div>
            );

        this.setState({s:'fin',code:xx});
    }

 
    componentDidMount(){
        
        if(localStorage.getItem('token') == null || localStorage.getItem('token')==null || jwt.decode(localStorage.getItem('token')).exp <  (new Date().getTime() + 1) / 1000){
                
            document.getElementById('yolo').innerHTML="PRIJAVA";
            document.getElementById('yolo1').href="/login1/";
        }
        else{
            document.getElementById('yolo').innerHTML="PROFIL";
            document.getElementById('yolo1').href="/profil/";
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
componentDidUpdate(){
    if (this.state.s == 'comp'){
        this.ImportCode();
    }
}
odjava = ()=>{
    localStorage.removeItem('token');
    window.location.replace('/');
}
render(){

    if(this.state.s == 'init' || this.state.s == 'comp')
    return (
        <div class="sticky" ata-spy="affix" data-offset-top="197">
        <div id="nav" class="pic navbar navbar-inverse d-flex justify-content-md-between ce leftpad">
            <div class="d-md-inline-flex p-2 align-self-center ">
                <div class="d-inline-flex p-2 he he1" onClick={this.Drop}>KATALOG</div>
                <a href="/kontakt" class = "link2"><div class="d-inline-flex p-2 he he1">KONTAKT</div></a>
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
        <h1>Loading</h1>
  <MessengerCustomerChat
    pageId="106431294985885"
    appId="2379326438877513"/>,
       
        </div>
    );
    else{
        return (
            <div class="sticky" ata-spy="affix" data-offset-top="197">
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

            <nav class="navbar navbar-light bg-light justify-content-around">
                <div class="navbar-brand">PROFIL</div>
                <div> <button class="btn btn-outline-dark" type="button" onClick ={this.adrese}>ADRESE</button></div>
                <div> <button class="btn btn-outline-dark" type="button" onClick ={this.addadr}>DODAJ ADRESU</button></div>
                <div> <button class="btn btn-outline-dark" type="button" onClick ={this.odjava}>ODJAVA</button></div>
            </nav>
            <div>{this.state.code}</div>
      <MessengerCustomerChat
        pageId="106431294985885"
        appId="2379326438877513"/>,
           
            </div>
        );
    }

}
}



export default Profil;