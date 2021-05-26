import React, { useState }   from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Login from './components/Login/Login';
import useToken from './components/App/useToken';

import ResetPassword from './components/ResetPassword/ResetPassword';
import Settings from './components/Settings/Settings';
import Header from './components/Header/Header';
import Users from './components/Users/Users';
import Audit from './components/Audit/Audit';
import Demo from './components/Dashboard/Demo';

function App() {




  const { token, setToken } = useToken();
  const [profile, setProfile] = useState(localStorage.getItem('name'));
  

  if (!token) {

    return (<BrowserRouter>
      <Switch>
        <Route path="/enviar-codigo">
          <ForgotPassword />
        </Route>
        <Route path="/cambiar-clave">
          <ResetPassword />
        </Route>
        <Route path="/iniciar-sesion">
          <Login setToken={setToken} setProfile={setProfile} />
        </Route>
        <Route path="/">
          <Login setToken={setToken} setProfile={setProfile}/>
        </Route>
      </Switch>
    </BrowserRouter>)

  } else {

    


    return (

      <div className="Wrapper">

        <Header profile={profile}></Header>
        <div className="content-wrapper">
          <BrowserRouter>
            <Switch>
              <Route path="/escritorio">
                <Dashboard />
              </Route>
              <Route path="/configuracion">
                <Settings setProfile={setProfile} />
              </Route>
              <Route path="/usuarios">
                <Users/>
              </Route>
              <Route path="/monitoreos">
                <Audit/>
              </Route>
              <Route path="/demo">
                <Demo/>
              </Route>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );

  }
}

export default App;
