import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './pages/main/main'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/chat" component={Main} />
        <Route path="/teams" component={Main} />
        <Route path="/meeting-rooms" component={Main} />
        <Route path="/files" component={Main} />
        <Route path="/break-out" component={Main} />
        <Route path="/settings" component={Main} />
      </Switch>
    </div>
  );
}

export default App;
