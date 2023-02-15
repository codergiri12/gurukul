import React, { useEffect, useState } from "react";
import { Login, Home , ClassHeader, Class , CreateAssignment } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {ProtectedRoute}  from "./routes/Routes";
import store from "./redux/store/store"
import { loadUser } from "./redux/actions/userAction";
function App({match}) {

  useEffect(() => {
    console.log("----------------FNNNNNNSSSSSSSS----------------")
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Switch>  
        <Route exact path="/login" component={Login}  />
        <Route exact path="/class/:id/createAssignment" component={CreateAssignment} isAdmin={true} />
        <ProtectedRoute exact path="/class/:id" component={Class}  match = {match} />
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;