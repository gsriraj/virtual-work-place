import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './pages/main/main'
import Login from './pages/login/login';
import Loading from './components/common/loading/loading'
import AuthenticatedRoute from './components/auth/authenticated-route'
import Register from './pages/register/register'

function App() {
  // const { isAuthenticated } = useAuth0();
  const [isAuthenticated, setisAuthenticated] = useState(false);

  console.log(localStorage.getItem("access_token"), ":::::", isAuthenticated)
  if (!isAuthenticated && localStorage.getItem("access_token")) setisAuthenticated(true)
  // return (
  //   <Loading />
  // );

  return (
    <div className="App">
      {/* {!isAuthenticated && (
        <Login />
      )} */}

      {/* <div> */}
      <Switch>
        <AuthenticatedRoute auth={isAuthenticated} exact path="/" component={Main} ></AuthenticatedRoute>
        <AuthenticatedRoute auth={isAuthenticated} exact path="/chat" component={Main} ></AuthenticatedRoute>
        <AuthenticatedRoute auth={isAuthenticated} exact path="/teams" component={Main} ></AuthenticatedRoute>
        <AuthenticatedRoute auth={isAuthenticated} exact path="/meeting-rooms" component={Main} ></AuthenticatedRoute>
        <AuthenticatedRoute auth={isAuthenticated} exact path="/files" component={Main} ></AuthenticatedRoute>
        <AuthenticatedRoute auth={isAuthenticated} exact path="/break-out" component={Main} ></AuthenticatedRoute>
        <AuthenticatedRoute auth={isAuthenticated} exact path="/settings" component={Main} ></AuthenticatedRoute>
        {/* <Route exact path="/" component={Main} /> */}
        {/* <Route path="/chat" component={Main} /> */}
        {/* <Route path="/teams" component={Main} /> */}
        {/* <Route path="/meeting-rooms" component={Main} /> */}
        {/* <Route path="/files" component={Main} /> */}
        {/* <Route path="/break-out" component={Main} /> */}
        {/* <Route path="/settings" component={Main} /> */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
      {/* </div>  */}
    </div>
  );
}

export default App;
