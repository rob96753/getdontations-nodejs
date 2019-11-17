import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../../actions/error.action';
import { login } from '../../actions/auth.action';


class LoginModal extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    constructor(props) {
        // bind constructor of subclass
        super(props);

        // be sure to call .bind(this) to prevent "TypeError: Cannot read property 'value' of undefined react on change"
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // this is equivalent to creating a variable
        this.state = {
            modal: false,
            emailaddress: '',
            password: '',
            msg: null
        }
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated, close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    render() {
        // described in JSX which is then converted to HTML
        return(
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Login
                </NavLink>
                <hr />
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>

                            <div style={{width: "250px", margin: "auto", border: "2px #C8C8C8 solid", padding: "8px" }}>
                                <Label>No Acount?<a href="http://localhost:3000/home" > Register Here!</a></Label>
                                <br/>
                                <Label>Email Address</Label>
                                <Input type="text"
                                       id='login-email-address'
                                       required
                                       className="form-control"
                                       value={this.state.emailaddress}
                                       onChange={this.onChangeEmailAddress}
                                       style={{flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10px',width:220}}
                                />

                                <Label>Password</Label>
                                <Input type="password"
                                       id='login-password'
                                       required
                                       className="form-control"
                                       value={this.state.password}
                                       onChange={this.onChangePassword}
                                       style={{flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10px',width:220}}
                                />
                                <br />
                                <Input type="submit"
                                       id='login-submit-button'
                                       value="Login"
                                       className="btn btn-primary"
                                       style={{textalign:"center"}}/>
                                <br />
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    /*
        this.setState({ [e.target.name]: e.target.value });
     */

    //@desc
    onChangeEmailAddress(e) {
        // always use he setState method
        this.setState({
            emailaddress: e.target.value
        });
    }

    //@desc
    onChangePassword(e) {
        // always use he setState method
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        // prevents default HTML submit from performing
        e.preventDefault();

        const user= {
            emailaddress: this.state.emailaddress.toLowerCase(),
            password: encodeURI(this.state.password),
        }

        // attemp to login
        this.props.login(user);

        /*
        axios.post('http://localhost:5000/api/users/authenticate', user)
            .then((res) => {console.log(res.data)
            })
            .catch(error => {
                console.log(error.response)
            });

        window.location = '/';

         */
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(LoginModal);