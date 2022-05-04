const { listenerCount } = require('events');
var express = require('express');
var http = require('http');
var logger = require('morgan');
var path = require('path');
var router = require('./ruter.js');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var jwt_v = require ('express-jwt');
var app = express();
const { Pool, Client } = require('pg');
const { pathToFileURL } = require('url');
var cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const e = require('express');
const { brotliDecompress } = require('zlib');
const fs = require('fs');
var base64ToImage = require('base64-to-image');
var btoa = require('btoa')
var atob = require('btoa')
var multer  = require('multer')

const storge = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'C:/Users/Aleksandar/Desktop/IT/app/public/img/proizvodi/');
    },
    filename : function(req,file,cb){
        cb(null,file.originalname);
    } 
});
var upload = multer({ storage : storge })

const db_cred = {
    user: 'postgres',
    host: 'localhost',
    database: 'Lorem ipsum',
    password: 'aleksandar1234',
    port: 5432,
};
app.use(bodyParser.json());
app.use(logger("short"));
app.use(cors());
var publicPath =  path.resolve(__dirname,"front");


  
app.post('/',async(req,res)=>{

    try{
        let data = {msg:'',data:''};
        const pool = new Pool(db_cred);
        const {rows} = await pool.query('SELECT * FROM PROIZVODI WHERE KOLICINA > 0 LIMIT 9;');
        if (rows.length == 0){
            data.msg = 'Neuspjesno';
            res.sendStatus = 200;
            res.json(data);
            return;
        }
        data.msg = 'GG';
        res.sendStatus = 200;
        data.data = [...rows];
        res.json(data);
        return;
    }
    catch(err){
        data.msg = 'Xd';
        res.sendStatus = 200;
        res.json(data);
        return;

    }
});
app.post('/admin/',async(req,res)=>{

    let ret = {msg:''};
    if( req.body == null|| req.body.password == null){
        ret.msg="Xd";
        res.statusCode = 200;
        res.json(ret);
        return;
    }
    try{
        const pool = new Pool(db_cred);
        const ll = (await pool.query('select * from admini where pass = $1',[req.body.password])).rows
        if (ll.length == 0){
            ret.msg="Pogresna šifra";
            res.statusCode = 200;
            res.json(ret);
        }
        ret.msg="GG";
        res.statusCode = 200;
        res.json(ret);
    }
    catch(err){
        ret.msg="Podaci nisu uredu";
        res.statusCode = 200;
        res.json(ret);
    }

});
var cpUpload = upload.fields([{ name: 'slika_1'}, { name: 'slika_2'}, { name: 'slika_3'}])
app.post('/dodaj/',cpUpload  ,async (req,res)=>{
    //console.log(req.file.slika_1);
    let ret = {msg:''};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
        const pool = new Pool(db_cred);
        const ll = (await pool.query('select * from admini where pass = $1',[req.body.password])).rows
        if (ll.length == 0){
            ret.msg="Pogresna šifra";
            res.statusCode = 200;
            res.json(ret);
            return;
        }
        let slika_1 ='';
        let slika_2 ='';
        let slika_3 = '';
        
            slika_1 = '/img/proizvodi/'+ req.body.n_1;
            slika_2 = '/img/proizvodi/'+ req.body.n_2;  
            slika_3 = '/img/proizvodi/'+ req.body.n_3
        
         await pool.query('insert into proizvodi (proizvodac,model,kategorija,pod_kat,cijena,popust,kolicina,opis,slika_1,slika_2,slika_3) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',[req.body.proizvodac,req.body.model,req.body.kategorija,req.body.pod_kat,req.body.cijena,req.body.popust,req.body.kolicina,req.body.opis,slika_1,slika_2,slika_3]);
        ret.msg="GG";
        
        res.statusCode = 200;
        res.json(ret);
       
    }
    catch(err){
        ret.msg="Greska";
        
        res.statusCode = 200;
        res.json(ret);
    }

});


app.post('/kupi/',async(req,res)=>{

let ret ={msg:''};


if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    else{
        try{
            jwt.verify(req.body.token,'aaaaaaaaaa');
            const pool = new Pool(db_cred);

            let c = [];
            let i;
            let total = 0.0;
            let nesto = [];
            for (i=0; i<req.body.a.length;i++){
                let kk = (await pool.query('Select cijena,popust,kolicina from proizvodi where id_p = $1',[req.body.a[i][0]])).rows;
                if(kk[0].kolicina < req.body.a[i][1]){
                    ret.msg = 'Neuspjesna kupovina previse ste stavili komada proizvoda sa id ' + req.body.a[i][0];
                    res.json(200);
                    res.json(ret);
                    return;
                }
                nesto.push(kk[0].kolicina);
                let cur = kk[0].cijena - (kk[0].cijena*kk[0].popust/100)
                c.push(cur);
                total = total + (cur * req.body.a[i][1]); 
                total = Math.floor( total *100) /100;
            }
            let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            let pp = (await pool.query('INSERT INTO KUPOVINA (ID_A,TOTAL,DATUM) VALUES ($1,$2,$3) RETURNING ID_K',[req.body.adresa,total,date])).rows;

            for (i=0; i<req.body.a.length;i++){
                await pool.query('Insert into k_p (id_k,id_p,cijena_k_p,kolicina) values ($1,$2,$3,$4)',[pp[0].id_k,req.body.a[i][0],c[i],req.body.a[i][1]]);
                let kol = nesto[i] -  req.body.a[i][1]; 
                await pool.query('Update proizvodi set kolicina = $1 where id_p = $2',[kol,req.body.a[i][0]]);
            }
            res.statusCode = 200;
            ret.msg = 'GG';
            res.json(ret);
        }

        catch(err){
            console.log(err);
            res.statusCode = 200;
            ret.msg = 'Xd';
            res.json(ret);
        }

    }


});


app.post('/korpa/',async (req,res)=>{

    let ret = {msg:'',data:{a:{},b:{},c:{}}};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
        jwt.verify(req.body.token,'aaaaaaaaaa');
        let email = jwt.decode(req.body.token).email;
        const pool = new Pool(db_cred);
        
        let art1 = req.body.art+'';
        let art = art1.split(',').map(function(item) {
            return parseInt(item, 10);
        });
       
        let rows0 = (await pool.query('SELECT * FROM PROIZVODI WHERE ID_P = any ($1);',[art])).rows;
        ret.data.a = rows0;
        let rows1 = (await pool.query('SELECT ime,prezime FROM KUPCI WHERE EMAIL = $1;',[email])).rows;
        ret.data.b = rows1;
        let rows2 = (await pool.query('SELECT * FROM ADRESS WHERE email = $1;',[email])).rows;
        ret.data.c = rows2;
        
        
        
        res.statusCode = 200;
        ret.msg = 'GG';
        res.json(ret);

    }
    catch(err){
        //console.log(err);
        res.statusCode = 200;
        ret.msg = 'Xd';
        res.json(ret);

    }



})


app.post('/register/',async (req,res)=>{

   // console.log(req.body);
    let ret = {msg:''};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
        const pool = new Pool(db_cred);
        const {rows} = await pool.query('SELECT * FROM KUPCI WHERE EMAIL = $1;',[req.body.email]);
        //console.log(rows);
        if (rows.length == 1){
            ret.msg = 'email';
            res.sendStatus = 200;
            res.json(ret);
            return;
        }
        const xx = await pool.query('INSERT INTO KUPCI (EMAIL,IME,PREZIME,PASSWORD) VALUES ($1,$2,$3,$4);',[req.body.email,req.body.ime,req.body.prezime,req.body.password]);  
        if (xx == 0){
            ret.msg = 'problem 1';
            res.sendStatus = 200;
            res.json(ret);
            return;
        }
       
        const yy = await pool.query ('INSERT INTO ADRESS (EMAIL,ULICA,GRAD,POSTANSKI_BR,OPSTINA,DRZAVA) VALUES ($1,$2,$3,$4,$5,$6);',[req.body.email,req.body.ulica,req.body.grad,req.body.po_br,req.body.opstina,req.body.drzava]);
        pool.end();
        if (yy == 0){
            ret.msg = 'problem 2';
            res.sendStatus = 200;
            res.json(ret);
            return;
        }
        res.statusCode = 200;
        ret.msg = 'GG';
        res.json(ret);
        //res.sendFile(publicPath+"/login/login.html");
    }
    catch(err){
        //console.log(err);
        res.statusCode = 200;
        ret.msg = 'Xd';
        res.json(ret);
    }


});


app.post('/proizvod',async (req,res)=>{

    let ret = {msg:'',data:{}};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
        const pool = new Pool(db_cred);
        const {rows}  = await pool.query('SELECT * FROM PROIZVODI WHERE ID_P = $1',[req.body.id]);
        if(rows.length == 0){
            ret.msg = 'Nema';
            res.sendStatus = 200;
            res.json(ret);
            return;
        }
        ret.msg = 'GG';
        ret.data = [...rows];
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    catch(err){
        ret.msg = 'Xd';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }

});

app.post('/login', async(req,res)=>{
    //console.log(req.body);
    let ret = {token:null,msg:''};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
        let pool = new Pool(db_cred); 
        const { rows } = await pool.query('SELECT * FROM KUPCI WHERE EMAIL = $1 AND PASSWORD = $2;',[req.body.email,req.body.password]);
        pool.end();
        if (rows.length == 0){
            ret.msg = 'Pogresno unijeti podaci';
            res.statusCode = 200;
            res.json(ret);
            return;
        }
        tok = jwt.sign( {email : req.body.email},'aaaaaaaaaa',{expiresIn : '6h'});
        ret.token = tok;
        ret.msg ='GG';
        res.statusCode = 200;
        res.json(ret); 
        
    }
    catch(err){
        console.log(err);
        ret.msg ='Xd';
        res.statusCode = 200;
        res.json(ret); 
    }
});
app.post('/addr',async (req,res)=>{

    let data = {msg:''}

    if (req.body == null){
        data.msg = 'xD';
        res.statusCode = 200;
        res.json(data);
    }

    try{
        jwt.verify(req.body.token,'aaaaaaaaaa');
        let email = jwt.decode(req.body.token).email;
        const pool = new Pool(db_cred);
        const {rows} = await pool.query('insert into adress (email,ulica,grad,postanski_br,opstina,drzava) values ($1,$2,$3,$4,$5,$6);',[email,req.body.ulica,req.body.grad,req.body.po_br,req.body.opstina,req.body.drzava]); 
      
        data.msg = 'GG';
        res.statusCode = 200;
        res.json(data);
    }
    catch(err){
    //console.log(err);
        res.statusCode = 200;
        data.msg='err';
        res.json(data);

    }



});
app.post("/profil/", async (req,res)=>{
    let data ={msg:'',data:'',history:[],adrese:''};
    try{
    jwt.verify(req.body.token,'aaaaaaaaaa');
    let email = jwt.decode(req.body.token).email;
    const pool = new Pool(db_cred);
    const { rows } = await pool.query('SELECT IME,PREZIME FROM KUPCI WHERE EMAIL = $1;',[email]);
    const x = (await pool.query('select * from adress where email = $1;',[email])).rows;
    let xx = [];
    x.forEach(element=>{
        xx.push(element.id_a);
    });
    const rows2 = (await pool.query('Select * from kupovina where id_a = any ($1);',[xx])).rows;
    let yy = [];
    rows2.forEach(element=>{
        yy.push(element.id_k);
    });
    const rows3 = (await pool.query('Select i.id_k,i.id_p,i.cijena_k_p,i.kolicina,p.proizvodac,p.model from k_p i inner join proizvodi p on i.id_p = p.id_p where i.id_k = any ($1);',[yy])).rows;
    res.statusCode=200;
    data.data = [...rows];
    data.history.push(rows2);
    data.history.push(rows3);
    data.adrese = [...x];
    data.msg = 'GG';
    res.json(data);
}
    catch(err){
        //console.log(err);
        res.statusCode = 401;
        data.msg='err';
        res.json(data);
    }
   
});

const client = new OAuth2Client('');
app.post("/api/v1/auth/google", async (req, res) => {
  
   
    const token = req.body.token
    if (token == null){
        res.statusCode= 404;
        res.end('eeeeeeee');
    }

   
    const ticket =  await client.verifyIdToken({
        idToken: token,
        audience: '7412223076-fhpbstpairfhm55t2v73rosvp517o02v.apps.googleusercontent.com'
    });


    const { name, email, picture } = await ticket.getPayload(); 
    let ret = {token:null,msg:''};   
    try{
        const pool = new Pool(db_cred);
        const { rows } = await pool.query('SELECT * FROM KUPCI WHERE EMAIL = $1;',[email]);
        pool.end();
        if (rows.lenght == 0){
            ret.msg = 'Pogresno unijeti podaci';
            res.statusCode = 200;
            res.json(ret);
            return;
        }
        tok = jwt.sign( {email :email},'aaaaaaaaaa',{expiresIn : '1h'});
        ret.token = tok;
        ret.msg ='GG';
        res.statusCode = 200;
        res.json(ret); 
    }
    catch(err){
        ret.msg ='Xd';
        res.statusCode = 200;
        res.json(ret); 
    }

})
app.use(express.static(publicPath));
app.post('/proizvodi/',async(req,res)=>{
    let data = {msg:'',data:'',page_num:'',pro:''};
    try{
        
        const pool = new Pool(db_cred);
        if (req.body.podkat != null && req.body.page != null && req.body.sort != null && req.body.ps!=null && req.body.pe!=null){
            let start = (12*(req.body.page-1));
            let rows;
            if(req.body.arr == null){
                
                if ( req.body.sort == "0"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE KOLICINA > 0 AND POD_KAT = $1 AND CIJENA >= $3 AND CIJENA <= $4 LIMIT 12 OFFSET $2;',[req.body.podkat,start,req.body.ps,req.body.pe])).rows;
                }
                else if ( req.body.sort == "1"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE KOLICINA > 0 AND POD_KAT = $1 AND CIJENA >= $3 AND CIJENA <= $4 order by cijena desc LIMIT 12 OFFSET $2 ;',[req.body.podkat,start,req.body.ps,req.body.pe])).rows;
                }
                else if ( req.body.sort == "2"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE KOLICINA > 0 AND POD_KAT = $1 AND CIJENA >= $3 AND CIJENA <= $4 order by cijena asc LIMIT 12 OFFSET $2 ;',[req.body.podkat,start,req.body.ps,req.body.pe])).rows;
                }
                else if ( req.body.sort == "3"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE KOLICINA > 0 AND POD_KAT = $1 AND CIJENA >= $3 AND CIJENA <= $4 order by proizvodac,model desc LIMIT 12 OFFSET $2 ;',[req.body.podkat,start,req.body.ps,req.body.pe])).rows;
                }
            }
            else{
                let arr = req.body.arr.split(',');
                if ( req.body.sort == "0"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE proizvodac = any ($5) and KOLICINA > 0 AND POD_KAT = $1 AND CIJENA >= $3 AND CIJENA <= $4 LIMIT 12 OFFSET $2;',[req.body.podkat,start,req.body.ps,req.body.pe,arr])).rows;
                }
                else if ( req.body.sort == "1"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE proizvodac = any ($5) and KOLICINA > 0 AND POD_KAT = $1 AND CIJENA >= $3 AND CIJENA <= $4 order by cijena desc LIMIT 12 OFFSET $2 ;',[req.body.podkat,start,req.body.ps,req.body.pe,arr])).rows;
                }
                else if ( req.body.sort == "2"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE proizvodac = any ($5) and KOLICINA > 0 AND POD_KAT = $1 AND CIJENA >= $3 AND CIJENA <= $4 order by cijena asc LIMIT 12 OFFSET $2 ;',[req.body.podkat,start,req.body.ps,req.body.pe,arr])).rows;
                }
                else if ( req.body.sort == "3"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE proizvodac = any ($5) and KOLICINA > 0 AND POD_KAT = $1 AND CIJENA >= $3 AND CIJENA <= $4 order by proizvodac,model desc LIMIT 12 OFFSET $2 ;',[req.body.podkat,start,req.body.ps,req.body.pe,arr])).rows;
                }


            }
            if (rows.length == 0){
                data.msg = 'Neuspjesno1';
                res.sendStatus = 200;
                res.json(data);
                return;
            }
            const kk = (await pool.query('SELECT COUNT(id_p) FROM PROIZVODI WHERE KOLICINA > 0 AND POD_KAT = $1;',[req.body.podkat])).rows;
            data.msg = 'GG';
            res.sendStatus = 200;
            data.data = [...rows];
            data.page_num= [...kk];
            let  xx = (await pool.query('SELECT DISTINCT PROIZVODAC FROM PROIZVODI WHERE KOLICINA > 0 AND POD_KAT = $1;',[req.body.podkat])).rows; 
            data.pro =  [...xx];
            res.json(data);
            return;
            }

        else if (req.body.kategorija != null && req.body.page != null && req.body.ps!=null && req.body.pe != null){
        let start = (12*(req.body.page-1));
      
        let rows;
            if(req.body.arr == null){
               
                if ( req.body.sort == "0"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE KOLICINA > 0 AND kategorija = $1 AND CIJENA >= $3 AND CIJENA <= $4 LIMIT 12 OFFSET $2;',[req.body.kategorija,start,req.body.ps,req.body.pe])).rows;
                }
                else if ( req.body.sort == "1"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE KOLICINA > 0 AND kategorija = $1 AND CIJENA >= $3 AND CIJENA <= $4 order by cijena desc LIMIT 12 OFFSET $2 ;',[req.body.kategorija,start,req.body.ps,req.body.pe])).rows;
                }
                else if ( req.body.sort == "2"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE KOLICINA > 0 AND kategorija = $1 AND CIJENA >= $3 AND CIJENA <= $4 order by cijena asc LIMIT 12 OFFSET $2 ;',[req.body.kategorija,start,req.body.ps,req.body.pe])).rows;
                }
                else if ( req.body.sort == "3"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE KOLICINA > 0 AND kategorija = $1 AND CIJENA >= $3 AND CIJENA <= $4 order by proizvodac,model desc LIMIT 12 OFFSET $2 ;',[req.body.kategorija,start,req.body.ps,req.body.pe])).rows;
                }
            }
            else{
                let arr = req.body.arr.split(',');
                if ( req.body.sort == "0"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE proizvodac = any ($5) and KOLICINA > 0 AND kategorija = $1 AND CIJENA >= $3 AND CIJENA <= $4 LIMIT 12 OFFSET $2;',[req.body.kategorija,start,req.body.ps,req.body.pe,arr])).rows;
                }
                else if ( req.body.sort == "1"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE proizvodac = any ($5) and KOLICINA > 0 AND kategorija = $1 AND CIJENA >= $3 AND CIJENA <= $4 order by cijena desc LIMIT 12 OFFSET $2 ;',[req.body.kategorija,start,req.body.ps,req.body.pe,arr])).rows;
                }
                else if ( req.body.sort == "2"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE proizvodac = any ($5) and KOLICINA > 0 AND kategorija = $1 AND CIJENA >= $3 AND CIJENA <= $4 order by cijena asc LIMIT 12 OFFSET $2 ;',[req.body.kategorija,start,req.body.ps,req.body.pe,arr])).rows;
                }
                else if ( req.body.sort == "3"){
                    rows = (await pool.query('SELECT * FROM PROIZVODI WHERE proizvodac = any ($5) and KOLICINA > 0 AND kategorija = $1 AND CIJENA >= $3 AND CIJENA <= $4 order by proizvodac,model desc LIMIT 12 OFFSET $2 ;',[req.body.kategorija,start,req.body.ps,req.body.pe,arr])).rows;
                }
            }
            
        if (rows.length == 0){
            data.msg = 'Neuspjesno1';
            res.sendStatus = 200;
            res.json(data);
            return;
        }
        data.data = [...rows];
        const kk = (await pool.query('SELECT COUNT(id_p) FROM PROIZVODI WHERE KOLICINA > 0 AND KATEGORIJA = $1;',[req.body.kategorija])).rows;
            data.msg = 'GG';
            res.sendStatus = 200;
            data.data = [...rows];
            data.page_num= [...kk];
            let  xx = (await pool.query('SELECT DISTINCT PROIZVODAC FROM PROIZVODI WHERE KOLICINA > 0 AND KATEGORIJA = $1;',[req.body.kategorija])).rows; 
            data.pro =  [...xx];
            res.json(data);
            return;
        }
        else if (req.body.pretraga != null && req.body.page != null && req.body.ps!=null && req.body.pe != null){
            let start = (12*(req.body.page-1));
                let nesto = req.body.pretraga.toUpperCase();
            let rows;
                if(req.body.arr == null){
                   
                    if ( req.body.sort == "0"){
                        rows = (await pool.query('SELECT * FROM PROIZVODI WHERE KOLICINA > 0 AND proizvodac like $1 or model like $1 AND CIJENA >= $3 AND CIJENA <= $4 LIMIT 12 OFFSET $2;',[`%${nesto}%`,start,req.body.ps,req.body.pe])).rows;
                    }
                    else if ( req.body.sort == "1"){
                        rows = (await pool.query('SELECT * FROM PROIZVODI WHERE KOLICINA > 0 AND proizvodac like $1 or model like $1 AND CIJENA >= $3 AND CIJENA <= $4 order by cijena desc LIMIT 12 OFFSET $2 ;',[`%${nesto}%`,start,req.body.ps,req.body.pe])).rows;
                    }
                    else if ( req.body.sort == "2"){
                        rows = (await pool.query('SELECT * FROM PROIZVODI WHERE KOLICINA > 0 AND proizvodac like $1 or model like $1 AND CIJENA >= $3 AND CIJENA <= $4 order by cijena asc LIMIT 12 OFFSET $2 ;',[`%${nesto}%`,start,req.body.ps,req.body.pe])).rows;
                    }
                    else if ( req.body.sort == "3"){
                        rows = (await pool.query('SELECT * FROM PROIZVODI WHERE KOLICINA > 0 AND proizvodac like $1 or model like $1 AND CIJENA >= $3 AND CIJENA <= $4 order by proizvodac,model desc LIMIT 12 OFFSET $2 ;',[`%${nesto}%`,start,req.body.ps,req.body.pe])).rows;
                    }
                }
                else{
                    let arr = req.body.arr.split(',');
                    if ( req.body.sort == "0"){
                        rows = (await pool.query('SELECT * FROM PROIZVODI WHERE proizvodac = any ($5) and KOLICINA > 0 AND 	proizvodac like $1 or model like $1 AND CIJENA >= $3 AND CIJENA <= $4 LIMIT 12 OFFSET $2;',[`%${nesto}%`,start,req.body.ps,req.body.pe,arr])).rows;
                    }
                    else if ( req.body.sort == "1"){
                        rows = (await pool.query('SELECT * FROM PROIZVODI WHERE proizvodac = any ($5) and KOLICINA > 0 AND 	proizvodac like $1 or model like $1 AND CIJENA >= $3 AND CIJENA <= $4 order by cijena desc LIMIT 12 OFFSET $2 ;',[`%${nesto}%`,start,req.body.ps,req.body.pe,arr])).rows;
                    }
                    else if ( req.body.sort == "2"){
                        rows = (await pool.query('SELECT * FROM PROIZVODI WHERE proizvodac = any ($5) and KOLICINA > 0 AND 	proizvodac like $1 or model like $1 AND CIJENA >= $3 AND CIJENA <= $4 order by cijena asc LIMIT 12 OFFSET $2 ;',[`%${nesto}%`,start,req.body.ps,req.body.pe,arr])).rows;
                    }
                    else if ( req.body.sort == "3"){
                        rows = (await pool.query('SELECT * FROM PROIZVODI WHERE proizvodac = any ($5) and KOLICINA > 0 AND 	proizvodac like $1 or model like $1 AND CIJENA >= $3 AND CIJENA <= $4 order by proizvodac,model desc LIMIT 12 OFFSET $2 ;',[`%${nesto}%`,start,req.body.ps,req.body.pe,arr])).rows;
                    }
                }
                    if (rows.length == 0){
                    data.msg = 'Neuspjesno';
                    res.sendStatus = 200;
                    res.json(data);
                    return;
                }
                    data.data = [...rows];
                    const kk = (await pool.query('SELECT COUNT(id_p) FROM PROIZVODI WHERE KOLICINA > 0 AND proizvodac like $1 or model like $1;',[`%${nesto}%`])).rows;
                    data.data = [...rows];
                    data.page_num= [...kk];
                    let  xx = (await pool.query('SELECT DISTINCT PROIZVODAC FROM PROIZVODI WHERE KOLICINA > 0 AND proizvodac like $1 or model like $1;',[`%${nesto}%`])).rows; 
                    data.pro =  [...xx];
                    data.msg = 'GG';
                    res.sendStatus = 200;
                    res.json(data);
                    return;
            
            }
    }
    catch(err){
       //console.log(err);
        data.msg = 'Xd';
        res.sendStatus = 200;
        res.json(data);
        return;

    }
});


app.post('/register2/',async (req,res)=>{

    // console.log(req.body);
     let ret = {msg:''};
     if (!req.body){
         ret.msg = 'Neuspjesno';
         res.sendStatus = 200;
         res.json(ret);
         return;
     }
     try{
         const pool = new Pool(db_cred);
         const {rows} = await pool.query('SELECT * FROM KUPCI WHERE EMAIL = $1;',[req.body.email]);
         //console.log(rows);
         if (rows.length == 1){
             ret.msg = 'email';
             res.sendStatus = 200;
             res.json(ret);
             return;
         }
         const xx = await pool.query('INSERT INTO KUPCI (EMAIL,IME,PREZIME,PASSWORD) VALUES ($1,$2,$3,$4);',[req.body.email,req.body.ime,req.body.prezime,req.body.password]);  
         if (xx == 0){
             ret.msg = 'problem 1';
             res.sendStatus = 200;
             res.json(ret);
             return;
         }
        
         res.statusCode = 200;
         ret.msg = 'GG';
         res.json(ret);
         //res.sendFile(publicPath+"/login/login.html");
     }
     catch(err){
         //console.log(err);
         res.statusCode = 200;
         ret.msg = 'Xd';
         res.json(ret);
     }});


     app.post('/dodajmo/',async (req,res)=>{

        // console.log(req.body);
         let ret = {msg:''};
         if (!req.body){
             ret.msg = 'Neuspjesno';
             res.sendStatus = 200;
             res.json(ret);
             return;
         }
         try{
             const pool = new Pool(db_cred);
             jwt.verify(req.body.token,'aaaaaaaaaa');
             let email = jwt.decode(req.body.token).email;
             const xx = await pool.query('INSERT INTO omiljeni (EMAIL,ID,OCJENA) VALUES ($1,$2,$3);',[email,req.body.id,req.body.ocjena]);  
             if (xx == 0){
                 ret.msg = 'problem 1';
                 res.sendStatus = 200;
                 res.json(ret);
                 return;
             }
            
             res.statusCode = 200;
             ret.msg = 'GG';
             res.json(ret);
         }
         catch(err){
             console.log(err);
             res.statusCode = 200;
             ret.msg = 'Xd';
             res.json(ret);
         }
 });

 app.post('/omiljeni/',async (req,res)=>{
    let ret = {msg:'',data:null};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
        const pool = new Pool(db_cred);
        jwt.verify(req.body.token,'aaaaaaaaaa');
        let email = jwt.decode(req.body.token).email;
        const {rows} = await pool.query('Select id,ocjena From omiljeni where email = $1',[email]);  
        if (rows.length == 0){
            ret.msg = 'problem 1';
            res.sendStatus = 200;
            res.json(ret);
            return;
        }
        ret.data = [...rows];
        res.statusCode = 200;
        ret.msg = 'GG';
        res.json(ret);
    }
    catch(err){
        console.log(err);
        res.statusCode = 200;
        ret.msg = 'Xd';
        res.json(ret);
    }
 });
    
http.createServer(app).listen(3001);

