import React from 'react';
import axios from "axios";

//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

const BASE_WIDTH = 300;
const INSET = 30;
const PASSWORD_MESSAGE = 'Your password must be 8 characters or longer; contain: 1 lowercase, 1 uppercase, 1 number, and 1 special character (e.g.,$&#@!^*&).'
const INVALID_EMAIL = 'The email address you entered isn\'t a valid email address. Please enter a valid email address'
export default class registration extends React.Component {
    constructor(props) {
        // bind constructor of subclass
        super(props);

        // be sure to call .bind(this) to prevent "TypeError: Cannot read property 'value' of undefined react on change"
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onConfirmPassword = this.onConfirmPassword.bind(this);
        this.onBlurPassword = this.onBlurPassword.bind(this);
        this.onBlurConfirmPassword = this.onBlurConfirmPassword.bind(this);
        this.onBlurEmailAddress = this.onBlurEmailAddress.bind(this);
        this.onInformationClick = this.onInformationClick.bind(this);
        this.render = this.render.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        // this is equivalent to creating a variable
        this.state = {
            firstname: '',
            lastname: '',
            emailaddress: '',
            password: '',
            confirmpassword: '',
            savedTarget: '',
            savedEvent: '',
            passwordstyle: {flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10px',width:BASE_WIDTH - INSET, backgroundColor: '#FFFFF'},
            passwordnoticestyle: "center",
            passwordnoticevisible: false,
            visibility: "hidden",
            registerdate: Date.now(),
            popupmessage: PASSWORD_MESSAGE
        }

    }
    render() {
        // described in JSX which is then converted to HTML
        return(
            <div>
            <h3>Register For Account</h3>
            <hr />
            <form onSubmit={this.onSubmit}>
                <div style={{width:BASE_WIDTH, margin: "auto", border: "2px #C8C8C8 solid", padding: "8px" }}>
                <label>Already have an account?<a href="http://localhost:3000/login" > Log In</a></label>
                <br/>
                <label>First Name</label>
                        <input type="text"
                       id="reg-input-firstname"
                        required
                        className="form-control"
                        value={this.state.firstname}
                        onChange={this.onChangeFirstName}
                        style={{flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10px',width:BASE_WIDTH - INSET}}
                        />

                <label>Last Name</label>
                    <input type="text"
                           id="reg-input-lastname"
                           required
                           className="form-control"
                           value={this.state.lastname}
                           onChange={this.onChangeLastName}
                           style={{flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10px',width:BASE_WIDTH - INSET}}
                    />

                <label>Email Address</label>
                    <input type="text"
                           id="reg-input-email"
                           required
                           className="form-control"
                           value={this.state.emailaddress}
                           onChange={this.onChangeEmailAddress}
                           onBlur={this.onBlurEmailAddress}
                           style={{flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10px',width:BASE_WIDTH - INSET}}
                    />

                    <label>Password</label> <img
                        onClick={this.onInformationClick}
                        src={require('../icons8-info-16.png')}
                        alt='password must be 8 characters and contain 1 lowercase, 1 uppercase, <br/> 1 numerid and 1 special character'
                    />

                    <input type="password"
                           id="reg-input-password"
                           required
                           className="form-control"
                           value={this.state.password}
                           style={this.state.passwordstyle}
                           onChange={this.onChangePassword}
                           onBlur={this.onBlurPassword}

                    />


                <label>Confirmation Password</label>
                    <input type="password"
                           id="reg-input-password"
                           required
                           className="form-control"
                           value={this.state.confirmpassword}
                           onChange={this.onConfirmPassword}
                           onBlur={this.onBlurConfirmPassword}
                           style={{flex:2,flexDirection:"row",textalign:"center",padding:'10',width:BASE_WIDTH - INSET}}
                    />
                    <br />
                    <input type="submit" value="Register" className="btn btn-primary"
                           style={{textalign: this.state.passwordnoticestyle}}/>
                    <br />
                </div>
                <div style={{width:BASE_WIDTH, margin: "auto", border: "2px #C8C8C8 solid", padding: "8px", visibility: this.state.visibility }}>
                    <label>{this.state.popupmessage}</label>
                </div>

                </form>
            </div>
        );
    }

    componentDidMount() {

    }

    onChangeLastName(e) {
        // always use he setState method
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeFirstName(e) {
        // always use he setState method
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeEmailAddress(e) {
        // always use he setState method
        this.setState({
            emailaddress: e.target.value
        });
    }
    onChangePassword(e) {
        // always use the setState method

        this.setState({
            savedEvent: e,
            savedTarget: e.target,
            password: e.target.value
        });
    }

    onBlurPassword(e) {
        var password = encodeURI(e.target.value)
        if (password !== '') {
            e.target.value.toUpperCase();
            axios.get(`http://localhost:5000/api/users/pwdstrength/${password}`)
                .then(res => {
                        console.log(`Data Status: ${res.data.status}`);
                    this.setState({
                        passwordstyle: {flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10px',width:BASE_WIDTH - INSET, backgroundColor: '#8CC152'},
                        visibility: "hidden"
                    })
                    }
                )
                .catch(error => {
                    console.log(`Error Message: ${error}`)
                    this.setState({
                        passwordstyle: {flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10px',width:BASE_WIDTH - INSET, backgroundColor: '#E9573F'},
                        popupmessage: PASSWORD_MESSAGE,
                        visibility: "visible"
                        })
                });
        }
    }


    onConfirmPassword(e) {
        // always use he setState method
        this.setState({
            confirmpassword: e.target.value
        });
    }

    onBlurConfirmPassword(e) {
        if (this.state.confirmpassword === this.state.passwordhash) {
            console.log("Passwords Match")
        }

    }

    onInformationClick(e) {
        console.log("Clicked")
        var currentState = (this.state.visibility === "hidden"?"visible":"hidden")
        this.setState({
                visibility: currentState
        });

    }

    onBlurEmailAddress(e) {
        var emailaddress = encodeURI(e.target.value)
        axios.get(`http://localhost:5000/api/users/email/${emailaddress}`)
            .then(res => {
                console.log(`Email Validation: ${res.data.status}`);
                this.setState({
                    popupmessage: PASSWORD_MESSAGE,
                    visibility: "hidden"
                })
            })
            .catch(error => {
                this.setState({
                    popupmessage: INVALID_EMAIL,
                    visibility: "visible"
                })
            });
    }

    onSubmit(e) {
        // prevents default HTML submit from performing
        e.preventDefault();

        const user= {
            lastname: this.state.lastname.toUpperCase(),
            firstname: this.state.firstname.toUpperCase(),
            emailaddress: this.state.emailaddress.toLowerCase(),
            password: encodeURI(this.state.password),
            registerdate: this.state.registerdate
        }

        axios.post('http://localhost:5000/api/users/register', user)
            .then((res) => {
                console.log(res.data);
                window.location = '/login';
            })
            .catch(error => {
                console.log(error.response)
                window.location = '/utils/errorpage/:error'
            });

    }
}