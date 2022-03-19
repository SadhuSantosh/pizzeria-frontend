import "./App.css";
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from "./components/login";
import Signup from "./components/signup";
import EmailVerification from "./components/verification";
import OrderPizza from './components/orderPizza/orderPizza';
import Payment from './components/orderPizza/payment';
import AOrderConfirmation from './components/admin/orderConfirm';

function App() {
  return (
    <Router>
      <div className="main">
        <Switch>
          <Route exact path="/">
            <h3 style={{ textAlign: "center" }}>Welcome To Pizzeria !! </h3>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
          <Route exact path="/adminPortal">
            Admin Portal
          </Route>
          <Route exact path="/forgot-password">
            Forgot password
          </Route>
          <Route path="/user/verification/:id">
             <EmailVerification/>
          </Route>
          <Route exact path="/order">
             <OrderPizza/>
          </Route>
          <Route exact path="/payment">
             <Payment/>
          </Route>
          <Route exact path="/admin/orders">
             <AOrderConfirmation/>
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
