import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import RegisterModal from './auth/register-modal.component'
import LoginModal from './auth/login-modal.component'

import "bootstrap/dist/css/bootstrap.min.css";

class AppNavbar extends Component {
    state = {
        isOpen: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authenticatedLinks =  (
            <Fragment>
                <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
          </span>
                </NavItem>
            </Fragment>

        );

        const unauthenticatedLinks = (
            <Fragment>
                <NavItem>
                    <NavItem id='navbar-register-register'>
                        <RegisterModal />
                    </NavItem>
                    <NavItem id='navbar-register-login'>
                        <LoginModal />
                    </NavItem>
                </NavItem>
            </Fragment>

        );

        return (
            <div className="collpase navbar-collapse">
                <Navbar className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link id='navbar-link-default' to="/" className="navbar-brand">Blood Donations</Link>

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
                            <Nav className='ml-auto' navbar>
                                {isAuthenticated ? authenticatedLinks: unauthenticatedLinks}
                            </Nav>
                        </ul>

                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    null
)(AppNavbar);