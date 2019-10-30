import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link id='navbar-link-default' to="/" className="navbar-brand">Blood Donations</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li id='navbar-edit-donor' className="navbar-item">
                            <Link id='navbar-link-edit-donor' to="/edit-donor" className="nav-link">Edit Donor</Link>
                        </li>
                        <li id='navbar-add-donor' className="navbar-item">
                            <Link id='navbar-link-add-donor' to="/add-donor" className="nav-link">Add Donor</Link>
                        </li>
                        <li id='navbar-donor-report' className="navbar-item">
                            <Link id='navbar-link-donor-report' to="/donor-report" className="nav-link">Donor Report</Link>
                        </li>
                        <li id='navbar-donations-report' className="navbar-item">
                            <Link id='navbar-link-donations-report' to="/donation-report" className="nav-link">Donation Report</Link>
                        </li>
                        <li id='navbar-get-donor-by-id' className="navbar-item">
                            <Link id='navbar-link-get-donor-by-id' to="/get-donor/:id" className="nav-link">Get Donor</Link>
                        </li>
                        <li id='navbar-get-products' className="navbar-item">
                            <Link id='navbar-link-get-products' to="/get-products" className="nav-link">Get Products</Link>
                        </li>
                        <li id='navbar-register-login' className="navbar-item">
                            <Link id='navbar-link-register-login' to="/login" className="nav-link"><b>Register/Login</b></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}