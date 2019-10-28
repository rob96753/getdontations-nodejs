import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap-grid.min.css";
import logo from "./blood-donation-svgrepo-com.svg";
import {BrowserRouter as Router, Route}from "react-router-dom";

import Navbar from "./components/navbar.component";
import DonorEditor from "./components/donor-editor.component";
import DonorAdd from "./components/donor-add.component";
import DonorGet from "./components/donor-get.component";
import ProductGet from "./components/product-get.component";
import Home from "./components/account-registration.component";
import Login from "./components/login.component";
import DonorReport from "./components/donor-report.component"

class App extends Component {
  render () {
      return (
      <Router>
          <div className="App">
              <div className="row">
                  <div className="col-xs pl-3 pr-0  bg-dark mh-100">
                      <img src={logo} className="App-logo" alt="logo" width={80} height={80} mode='fit' vspace="20"/>
                  </div>
                  <div className="col-xl-11">
                      <Navbar/>
                      <br/>
                      <Route path="/Home" component={Home}/>
                      <Route path="/edit-donor" component={DonorEditor}/>
                      <Route path="/add-donor" component={DonorAdd}/>
                      <Route path="/donor-report" component={DonorReport}/>
                      <Route path="/get-donor/:id" component={DonorGet}/>
                      <Route path="/get-products" component={ProductGet}/>
                      <Route path="/login" component={Login}/>
                      <hr/>
                  </div>
              </div>
          </div>
      </Router>
      );
  }
}

export default App;
