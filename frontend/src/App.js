import React, { useEffect, useState } from "react";
import { Login, Home , ClassHeader, Class } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute  from "./routes/Routes";
import store from "./redux/store/store"
import { loadUser } from "./redux/actions/userAction";
function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Switch>  
        <Route exact path="/login" component={Login}  />
        <ProtectedRoute exact path="/class/:id" component={Class} />
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;