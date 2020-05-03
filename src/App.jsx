import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/Admin';
import {AUTH} from './firebase';


function App() {

  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    AUTH.onAuthStateChanged(user => {
      console.log(user);
      if(user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    })
  },[]);

  return firebaseUser !== false ? (
    <Router>
    <div className="Container">
      <Navbar firebaseUser={firebaseUser}/>
      <Switch>
        <Route exact path="/">
          Inicio...
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/admin">
          <Admin/>
        </Route>
      </Switch>
    </div>
    </Router>
  ) : (
    <p>Cargando...</p>
  )
}

export default App;
