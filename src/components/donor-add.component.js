import React from 'react';
import Checkbox from './Checkbox'
import Spacer from 'react-add-space';


//import axios from 'axios';
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

export default class DonorAdd extends React.Component {
    constructor(props) {
        // bind constructor of subclass
        super(props);

        // be sure to call .bind(this) to prevent "TypeError: Cannot read property 'value' of undefined react on change"
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeMiddleName = this.onChangeMiddleName.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeBloodType = this.onChangeBloodType.bind(this);
        this.onChangeRace = this.onChangeRace.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeLtowbCheck = this.onChangeLtowbCheck.bind(this);


        this.render = this.render.bind(this);


        // this is equivalent to creating a variable
        this.state = {
            firstname: '',
            lastname: '',
            middlename: '',
            ssn: '',
            dodid: '',
            bloodtype: '',
            nationality: '',
            militaryunit: '',
            ltowb: false,
            gender: '',
            race: '',
            dob: new Date(),
            service: '',
            mos: '',
            rank: '',
            paygrade: '',
            donations: [],
            bloodtypes: [],
            genders: [],
            races: []
        }
    }

    /*
    <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.lastname}
                                onChange={this.onChangeLastName}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
     */

    render() {

        // described in JSX which is then converted to HTML
        return (
            <div>
                <h3>Add New Donor</h3>
                <hr />
                <form onSubmit={this.onSubmit}>
                        <div className="form-group" key={`inline-input`}
                             justifyContent= "space-between">
                        <label>Donor First Name
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.firstname}
                                   onChange={this.onChangeFirstName}
                                   style={{flex:2,flexDirection:"row",justifyContent:'space-between',padding:'10'}}
                            />
                        </label>
                            <Spacer amount={8} />
                        <label>          Donor Middle Name
                            <input type="text"
                                   padding = "10px"
                               required
                               className="form-control"
                               value={this.state.middlename}
                               onChange={this.onChangeMiddleName}
                                   style={{flex:2,flexDirection:"row",justifyContent:'space-between',padding:'10'}}
                                   />
                        </label>
                            <Spacer amount={8} />
                        <label>Donor Last Name
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.lastname}
                                   onChange={this.onChangeLastName}
                            />
                        </label>

                        </div>
                        <div className="form-group">
                            <label>Donor SSN
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.ssn}
                                   onChange={this.onChangeSsn}
                            />
                            </label>
                                <Spacer amount={8} />
                            <label>Donor DOB:
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.lastname}
                                   onChange={this.onChangeDob}
                            />
                            </label>
                        </div>

                    <div className="form-group">
                        <label>
                        <span>Gender:
                            <select ref='genderInput' required className="form-control"
                                    value={this.state.gender}
                                    onChange={this.onChangeGender}>{this.state.genders.map((gender)=> {
                                return <option key={gender}value={gender}>{gender}
                                </option>
                            })
                            }
                            </select>

                        </span>
                        </label>
                            <Spacer amount={8} />
                        <label>
                            <span>Race:
                            <select ref='raceInput' required className="form-control"
                                    value={this.state.race}
                                    onChange={this.onChangeRace}>{this.state.races.map((race)=> {
                                return <option key={race}
                                               value={race}>{race}
                                </option>
                            })
                            }
                            </select>

                        </span>
                        </label>
                    </div>

                    <div className="form-group" key={`inline-input`}>
                        <label>
                                <span>Select Blood Type (ABORH):
                                <select ref='userInput' required className="form-control"
                                        value={this.state.bloodtype}
                                        onChange={this.onChangeBloodType}>{this.state.bloodtypes.map((bloodtype)=> {
                                    return <option key={bloodtype}
                                                   value={bloodtype}>{bloodtype}
                                    </option>
                                })
                                }
                                </select>
                                </span>
                        </label>
                        <Spacer amount={4} />
                        <label>
                            <Checkbox
                                checked={this.state.checked}
                                onChange={this.onChangeLtowbCheck}
                            />
                            <span style={{marginLeft: 8}}>Low Titer (LTOWB)</span>
                        </label>
                    </div>


                    <div className="form-group">
                    <label>Service: </label>

                    <label>MOS: </label>


                    <label>Paygrade: </label>
                    </div>
                </form>
            </div>
        );
    }

    componentDidMount() {
        this.setState(
            {
                bloodtypes: ['A POS', 'A NEG', 'B POS', 'B NEG', 'AB POS', 'AB NEG', 'O POS', 'O NEG'],
                bloodtype: 'O NEG',

                genders: ['Male', 'Female'],
                gender: 'Male',

                races: ['Hispanic', 'Caucasian', 'Black', 'Asian', 'SE Asian', 'Pacific Islander', 'Native American'],
                race: 'Caucasian'
            }
        )
    }

    onChangeLastName(e) {
        // always use he setState method
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeMiddleName(e) {
        this.setState({
            middlename: e.target.value
        });
    }

    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeBloodType(e) {
        this.setState({
            bloodtype: e.target.value
        })
    }

    onChangeSsn(e){
        this.setState({
            ssn: e.target.value
        })
    }

    onChangeDob(e){
        this.setState({
            dob: e.target.value
        })
    }

    onChangeGender(e) {
        this.setState( {
            gender: e.target.value
        })
    }

    onChangeRace(e) {
        this.setState( {
            race: e.target.value
        })
    }

    onChangeLtowbCheck(e){
        console.log(e.target.checked)
        this.setState({
            ltowb: e.target.checked
        })
    }


    onSubmit(e) {
        // prevents default HTML submit from performing
        e.preventDefault();

        const donor = {
            lastname: this.state.lastname,
            middlename: this.state.middlename,
            firstname: this.state.firstname,
            ssn: this.state.ssn,
            dodid: this.state.dodid,
            bloodtype: this.state.bloodtype,
            nationality: this.state.nationality,
            militaryunit: this.state.militaryunit,
            ltowb: this.state.ltowb,
            gender: this.state.gender,
            race: this.state.race,
            dob: this.state.dob,
            service: this.state.service,
            mos: this.state.mos,
            rank: this.state.rank,
            paygrade: this.state.paygrade,
            donations: this.state.donations
        }

        console.log(donor);

        //axios.post('http://localhost:5000/exercises/add', donor)
        //    .then(res => console.log(res.data));

        window.location = '/';
    }
}
