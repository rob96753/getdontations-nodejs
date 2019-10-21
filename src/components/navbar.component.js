import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Blood Donations</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/edit-donor" className="nav-link">Edit Donor</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/add-donor" className="nav-link">Add Donor</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/get-donor/:id" className="nav-link">Get Donor</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/get-products" className="nav-link">Get Products</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/home" className="nav-link"><b>Register/Login</b></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}