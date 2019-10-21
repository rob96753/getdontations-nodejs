import React from 'react';


//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

export default class login extends React.Component {
    constructor(props) {
        // bind constructor of subclass
        super(props);

        // be sure to call .bind(this) to prevent "TypeError: Cannot read property 'value' of undefined react on change"
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);


        // this is equivalent to creating a variable
        this.state = {
            emailaddress: '',
            password: '',
        }
    }
    render() {
        // described in JSX which is then converted to HTML
        return(
            <div>
            <h3>Account Login</h3>
            <hr />
            <form onSubmit={this.onSubmit}>

                <div style={{width: "250px", margin: "auto", border: "2px #C8C8C8 solid", padding: "8px" }}>
                <label>No Acount?<a href="http://localhost:3000/home" > Register Here!</a></label>
                <br/>
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
                    <br />
                    <input type="submit" value="Login" className="btn btn-primary"
                    style={{textalign:"center"}}/>
                    <br />
                </div>

                </form>
            </div>
        );
    }

    componentDidMount() {

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

    onSubmit(e) {
        // prevents default HTML submit from performing
        e.preventDefault();
    }
}