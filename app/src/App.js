import logo from './logo.svg';
import ReactDOM from 'react-dom';
import React from 'react';
import Login from './Login';
import Register from './Register';
import Kontakt from './Kontakt';
import Profil from './Profil';
import jwt from 'jsonwebtoken'
import './App.css';
import Home from './Home';
import Guard from './Guard';
import Proizvod from './Proizvod';
import Proizvodi from './Proizvodi';
import Korpa from './Korpa'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Admin from './Admin'
class App extends React.Component {
  
    render(){

        return <Router>
        
          <Switch>

              <Route exact path='/'  component={Home}/>
              <Route path='/login1/' component={Login} />
              <Route path='/proizvodi' component={Proizvodi} />
              <Route path='/register/' component={Register} />
              <Route path='/kontakt/' component={Kontakt} />
              <Guard path='/profil/' component={Profil}/>
              <Route path='/proizvod/' component={Proizvod}/>
              <Route path='/korpa/' component={Korpa}/>
              <Route path='/admin/' component={Admin}/>
          </Switch>        
      </Router>
    }
}


export default App;
