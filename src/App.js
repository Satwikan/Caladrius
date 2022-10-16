import React from 'react';
import Error from './pages/Error'
import Login from './pages/Login'
import AuthWrapper from './pages/AuthWrapper'
import PrivateRoute from './pages/PrivateRoute'
import './index.css'
import './App.css'


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home'


function App() {
  return (
    
      <AuthWrapper>
      <Router>
        <Switch>
          <PrivateRoute path='/' exact={true}>
            <Home/>
          </PrivateRoute>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='*'>
           <Error />
          </Route>
        </Switch>
      </Router>
      </AuthWrapper>
      
    
  );
}

export default App;
