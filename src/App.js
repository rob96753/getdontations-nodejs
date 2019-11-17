import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap-grid.min.css";
import {BrowserRouter as Router, Route}from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from "./actions/auth.action";

import Navbar from "./components/navbar.component";
import DonorEditor from "./components/donor-editor.component";
import DonorAdd from "./components/donor-add.component";
import DonorGet from "./components/donor-get.component";
import ProductGet from "./components/product-get.component";
import Home from "./components/account-registration.component";
import Login from "./components/login.component";
import DonorReport from "./components/donor-report.component";
import DonationReport from "./components/donation-report.component";
import RegisterModal from "./components/auth/register-modal.component";
import LoginModal from "./components/auth/login-modal.component";
import Logout from "./components/auth/logout.component";

class App extends Component {

  componentDidMount() {
      store.dispatch(loadUser());
  }

  render () {
      return (
      <Router>
          <Provider store={store}>
          <div className="App">
              <div className="row">
                  <div className="col-xs pl-3 pr-0  bg-light mh-30">
                  </div>
                  <div className="col-xl-11">
                      <Navbar/>
                      <Route path="/Home" component={Home}/>
                      <Route path="/edit-donor" component={DonorEditor}/>
                      <Route path="/add-donor" component={DonorAdd}/>
                      <Route path="/donor-report" component={DonorReport}/>
                      <Route path="/donation-report" component={DonationReport}/>
                      <Route path="/get-donor/:id" component={DonorGet}/>
                      <Route path="/get-products" component={ProductGet}/>
                      <Route path="/login" component={Login}/>
                      <Route path="./auth/RegisterModal"  component={RegisterModal}/>
                      <Route path="./auth/LoginModal"  component={LoginModal}/>
                      <Route path="./auth/Logout"  component={Logout}/>
                      <hr/>
                  </div>
              </div>
          </div>
          </Provider>
      </Router>
      );
  }
}

export default App;
