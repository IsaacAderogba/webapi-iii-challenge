import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import UsersList from './components/UsersList';
import User from './components/User';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Route exact path="/" component={UsersList} />
        <Route path="/user/:id" render={routeProps => <User {...routeProps} />} />
      </header>
    </div>
  );
}

export default App;
