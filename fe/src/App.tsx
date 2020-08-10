import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './pages/main/main'
import Login from './pages/login/login';
import Loading from './components/common/loading/loading'
import AuthenticatedRoute from './components/auth/authenticated-route'
import Register from './pages/register/register'
import { AuthContextProvider } from './context/auth-context'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Switch>
          <AuthenticatedRoute exact path="/" component={Main} ></AuthenticatedRoute>
          <AuthenticatedRoute exact path="/chat" component={Main} ></AuthenticatedRoute>
          <AuthenticatedRoute exact path="/teams" component={Main} ></AuthenticatedRoute>
          <AuthenticatedRoute exact path="/meeting-rooms" component={Main} ></AuthenticatedRoute>
          <AuthenticatedRoute exact path="/files" component={Main} ></AuthenticatedRoute>
          <AuthenticatedRoute exact path="/break-out" component={Main} ></AuthenticatedRoute>
          <AuthenticatedRoute exact path="/settings" component={Main} ></AuthenticatedRoute>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
