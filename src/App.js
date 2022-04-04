import "./App.css";
import React,{useState} from 'react';
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
import ForgotPassword from './components/forgotPassword';
import Home from './components/home';

function App() {
  const [selCategory, setCategory] = useState(0);
  return (
    <Router>
      <div className="main">
        <Switch>
          <Route exact path="/">
            <Home/>
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
            <ForgotPassword/>
          </Route>
          <Route exact path="/change-password/:id">
            change password
          </Route>
          <Route exact path="/user/verification/:id">
             <EmailVerification/>
          </Route>
          <Route exact path="/order">
             <OrderPizza selCategory={selCategory} setCategory={setCategory}/>
          </Route>
          <Route exact path="/payment">
             <Payment />
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
