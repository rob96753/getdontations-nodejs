import React from 'react';


//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

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
        this.render = this.render.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        // this is equivalent to creating a variable
        this.state = {
            firstname: '',
            lastname: '',
            emailaddress: '',
            password: '',
            confirmpassword: ''
        }
    }
    render() {
        // described in JSX which is then converted to HTML
        return(
            <div>
            <h3>Register For Account</h3>
            <hr />
            <form onSubmit={this.onSubmit}>

                <div style={{width: "250px", margin: "auto", border: "2px #C8C8C8 solid", padding: "8px" }}>
                <label>Already have an account?<a href="http://localhost:3000/login" > Log In</a></label>
                <br/>
                <label>First Name</label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.firstname}
                        onChange={this.onChangeFirstName}
                        style={{flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10px',width:220}}
                        />

                <label>Last Name</label>
                    <input type="text"
                           required
                           className="form-control"
                           value={this.state.lastname}
                           onChange={this.onChangeLastName}
                           style={{flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10px',width:220}}
                    />

                <label>Email Address</label>
                    <input type="text"
                           required
                           className="form-control"
                           value={this.state.emailaddress}
                           onChange={this.onChangeEmailAddress}
                           style={{flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10px',width:220}}
                    />

                <label>Password</label>
                    <input type="password"
                           required
                           className="form-control"
                           value={this.state.password}
                           onChange={this.onChangePassword}
                           style={{flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10px',width:220}}
                    />

                <label>Confirmation Password</label>
                    <input type="text"
                           required
                           className="form-control"
                           value={this.state.confirmpassword}
                           onChange={this.onConfirmPassword}
                           style={{flex:2,flexDirection:"row",textalign:"center",padding:'10',width:220}}
                    />
                    <br />
                    <input type="submit" value="Register" className="btn btn-primary"
                    style={{textalign:"center"}}/>
                    <br />
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
        // always use he setState method
        this.setState({
            password: e.target.value
        });
    }

    onConfirmPassword(e) {
        // always use he setState method
        this.setState({
            confirmpassword: e.target.value
        });
    }

    onSubmit(e) {
        // prevents default HTML submit from performing
        e.preventDefault();
    }
}