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
    Container,
    DropdownMenu,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown
} from 'reactstrap';
import RegisterModal from './auth/register-modal.component'
import LoginModal from './auth/login-modal.component'
import Logout from './auth/logout.component'



import DonorAdd from './donor-add.component';
import DonorEdit from './donor-editor.component';
import DonorReport from './donor-report.component';

import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../blood-donation-svgrepo-com.svg";

class AppNavbar extends Component {
    state = {
        isOpen: false,
        donorsState: false,
        reportsState: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    dropdownToggle = () => {
        this.setState({
            donorsState: !this.state.donorsState
        });
    };

    dropdownToggle1 = () => {
        this.setState({
            reportsState: !this.state.reportsState
        });
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authenticatedLinks =  (
            <Fragment>
                <NavItem>
                    <Logout />
                </NavItem>
                <NavItem>
                  <span className='navbar-text ml-3'>
                    {user ? `Welcome ${user.name}` : ''}
                  </span>
                </NavItem>
            </Fragment>
        );

        const unauthenticatedLinks = (
            <Fragment>
                <NavItem id='navbar-register-register'>
                    <RegisterModal />
                </NavItem>
                <NavItem id='navbar-register-login'>
                    <LoginModal />
                </NavItem>
            </Fragment>

        );

        return (

            <div className="collpase navbar-collapse">
                <div>
                    <Navbar color='dark' dark expand='sm' className='mb-5'>
                        <img src={logo} className="navbar-left" alt="logo" width={50} height={50} mode='fit' vspace="20"/>
                            <NavbarBrand  id='navbar-add-brand' href='/'>Blood Donations</NavbarBrand>
                        <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav={true} caret disabled={!isAuthenticated}>
                                    Donors
                                </DropdownToggle>

                                <DropdownMenu >
                                    <DropdownItem id='navbar-link-add-donor' href="/add-donor">Add...</DropdownItem>
                                    <DropdownItem id='navbar-link-edit-donor' href="/edit-donor">Edit...</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown >

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle  nav caret  disabled={!isAuthenticated} >
                                Donations
                            </DropdownToggle>
                            <DropdownMenu >
                                <DropdownItem id='navbar-donor-report' href="/donor-report">Create Donations</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown >

                        <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle  nav caret  disabled={!isAuthenticated} >
                                    Reports
                                </DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem id='navbar-donor-report' href="/donor-report">Donors</DropdownItem>
                                    <DropdownItem id='navbar-donations-report' href="/donation-report">Donations</DropdownItem>
                                    <DropdownItem id='navbar-link-get-products' href="/get-products">Products</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown >

                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className='ml-auto' navbar>
                                    {isAuthenticated ? authenticatedLinks: unauthenticatedLinks}
                                </Nav>
                            </Collapse>
                    </Navbar>
                </div>
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