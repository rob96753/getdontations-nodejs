import React from 'react';
import Checkbox from './Checkbox'
import Spacer from 'react-add-space';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDonor } from '../actions/donor.action';
import { clearErrors } from '../actions/error.action';
import {Alert } from 'reactstrap';
import {DONOR_ADD_FAILED, DONOR_ADDED} from '../actions/types';

//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

class DonorAdd extends React.Component {


    constructor(props) {
        // bind constructor of subclass
        super(props);

        // be sure to call .bind(this) to prevent "TypeError: Cannot read property 'value' of undefined react on change"
        this.onChange = this.onChange.bind(this);
        this.render = this.render.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);


        // this is equivalent to creating a variable
        this.state = {
            firstname: '',
            lastname: '',
            middlename: '',
            ssn: '',
            dodid: '',
            bloodtype: '',
            nationality: 'United States of America',
            militaryunit: '',
            ltowb: false,
            gender: '',
            race: '',
            dob: new Date('01/01/1900'),
            service: '',
            mos: '',
            rank: '',
            paygrade: '',
            lastdonation: new Date('2018-01-01'),
            donor: {},
            donations: [],
            bloodtypes: [],
            genders: [],
            races: [],
            services: [],
            type: null,
            msg: null,
            color: 'danger'
        }
    }


    render() {

        // described in JSX which is then converted to HTML
        return (
            <div>
                <h3>Add New Donor</h3>
                {this.state.msg ? (
                    <Alert color={this.state.color}>{this.state.msg}</Alert>
                ) : null}
                <hr />
                <form onSubmit={this.onSubmit}>
                        <div className="form-group" key={`inline-input`}
                             justifycontent= "space-between">
                        <label>Donor First Name
                            <input type="text"
                                   required
                                   className="form-control"
                                   id = "add-donor-inp-firstname"
                                   name = 'firstname'
                                   value={this.state.firstname}
                                   onChange={this.onChange}
                                   style={{flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10'}}
                            />
                        </label>
                            <Spacer amount={8} />
                        <label>          Donor Middle Name
                            <input type="text"
                                   padding = "10px"
                               required
                               className="form-control"
                               id = "add-donor-inp-middlename"
                               name = 'middlename'
                               value={this.state.middlename}
                               onChange={this.onChange}
                                   style={{flex:2,flexDirection:"row",justifycontent:'space-between',padding:'10'}}
                                   />
                        </label>
                            <Spacer amount={8} />
                        <label>Donor Last Name
                            <input type="text"
                                   required
                                   className="form-control"
                                   id = "add-donor-inp-lastname"
                                   name = 'lastname'
                                   value={this.state.lastname}
                                   onChange={this.onChange}
                            />
                        </label>
                        </div>
                        <div className="form-group">
                            <label>Donor SSN
                            <InputMask
                                   required
                                   className="form-control"
                                   id = "add-donor-inp-ssn"
                                   name = 'ssn'
                                   value={this.state.ssn}
                                   onChange={this.onChange}
                                   mask="999-99-9999"
                            />
                            </label>
                            <Spacer amount={8} />
                            <label>Donor DoD ID
                                <InputMask
                                    required
                                    className="form-control"
                                    id = "add-donor-inp-dodid"
                                    name = 'dodid'
                                    value={this.state.dodid}
                                    onChange={this.onChange}
                                    mask="9999999999"
                                />
                            </label>
                            <Spacer amount={8} />
                            <label>Donor DOB:
                            <input type="date"
                                   required
                                   className="form-control"
                                   id = "add-donor-inp-dob"
                                   name = 'dob'
                                   value={this.state.dob}
                                   onChange={this.onChange}
                            />
                            </label>
                        </div>

                    <div className="form-group">
                        <label>
                        <span>Gender:
                            <select ref='genderInput' required
                                    className="form-control"
                                    id = "add-donor-sel-gender"
                                    name = 'gender'
                                    value={this.state.gender}
                                    onChange={this.onChange}>{this.state.genders.map((gender)=> {
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
                                    id = "add-donor-sel-race"
                                    name = 'race'
                                    value={this.state.race}
                                    onChange={this.onChange}>{this.state.races.map((race)=> {
                                return <option key={race}
                                               value={race}>{race}
                                </option>
                            })
                            }
                            </select>

                        </span>
                        </label>
                        <Spacer amount={8} />
                        <label>
                            <span>Select Blood Type (ABORH):
                                <select ref='userInput' required className="form-control"
                                        id = "add-donor-sel-bloodtype"
                                        name = 'bloodtype'
                                        value={this.state.bloodtype}
                                        onChange={this.onChange}>{this.state.bloodtypes.map((bloodtype)=> {
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
                                id = "add-donor-sel-ltowb"
                                name = 'ltowb'
                                checked={this.state.ltowb}
                                onChange={this.handleCheckboxChange}
                            />
                            <span style={{marginLeft: 8}}>Low Titer (LTOWB)</span>
                        </label>
                    </div>


                    <div className="form-group" key="service-rank">

                        <label>Service
                            <select
                                   required
                                   className="form-control"
                                   id = "add-donor-inp-service"
                                   name = 'service'
                                   value={this.state.service}
                                   onChange={this.onChange}>{this.state.services.map((service)=> {
                                           return <option key={service}
                                                          value={service}>{service}
                                           </option>
                                       })
                            }
                            </select>
                        </label>
                        <Spacer amount={8} />
                        <label>Rank
                            <input type="text"
                                   required
                                   className="form-control"
                                   id = "add-donor-inp-rank"
                                   name = 'rank'
                                   value={this.state.rank}
                                   onChange={this.onChange}
                            />
                        </label>
                        <Spacer amount={8} />
                        <label>MOS:
                            <input type="text"
                                   className="form-control"
                                   id = "add-donor-inp-mos"
                                   name = 'mos'
                                   value={this.state.mos}
                                   onChange={this.onChange}
                            />
                        </label>

                        <Spacer amount={8} />
                        <label>Paygrade:
                            <input type="text"
                                   required
                                   className="form-control"
                                   id = "add-donor-inp-paygrade"
                                   name = 'paygrade'
                                   value={this.state.paygrade}
                                   onChange={this.onChange}
                            />
                        </label>
                    </div>
                    <div className="form-group" key="service-unit" >
                        <label>Military Unit
                            <input type="text"
                                   className="form-control"
                                   id = "add-donor-inp-militaryunit"
                                   name = 'militaryunit'
                                   value={this.state.militaryunit}
                                   onChange={this.onChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Donor" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }

    //@desc this lifecycle method fires when the props update.
    componentWillReceiveProps(nextProps){
        if (nextProps.donor.hasOwnProperty('type') && nextProps.donor.type === DONOR_ADDED) {
            this.setState({msg: `Donor ${nextProps.donor.donors.firstname} ${nextProps.donor.donors.lastname} ${nextProps.donor.donors.ssn} Added!`,
                color: 'success'});
            this.clearForm();
        }

    }

    componentDidMount() {
        this.setState(
            {
                bloodtypes: ['A Positive', 'A Negative', 'B Positive', 'B Negative', 'AB Positive', 'AB Negative', 'O Positive', 'O Negative'],
                bloodtype: 'A Positive',

                genders: ['MALE', 'FEMALE', 'OTHER'],
                gender: 'MALE',

                races: ['CAUCASIAN', 'BLACK', 'HISPANIC', 'ASIAN', 'SE ASIAN', 'PACIFIC ISLANDER', 'NATIVE AMERICAN', 'OTHER'],
                race: 'CAUCASIAN',

                services: ['USA', 'USAF', 'USMC', 'USN', 'USCG', 'USANG', 'CIV', 'FN', 'OTHER'],
                service: 'OTHER'
            }
        )
    }

    clearForm() {
        this.setState(
            {
                firstname: '',
                lastname: '',
                middlename: '',
                ssn: '',
                dodid: '',
                bloodtype: '',
                nationality: 'United States of America',
                militaryunit: '',
                ltowb: false,
                gender: 'MALE',
                race: 'CAUCASIAN',
                dob: new Date('01/01/1900'),
                service: 'OTHER',
                mos: '',
                rank: '',
                unit: '',
                paygrade: '',
                lastdonation: new Date('2018-01-01'),
                donor: {},
                type: null,
                msg: null
            }
        )

    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        console.log(this.props);
        console.log(prevProps);
        if (error.status && !prevProps.error.status) {
            if (error.id == DONOR_ADD_FAILED) {
                console.log(error.id, error.msg);
                this.setState({msg: error.msg});
            } else {
                this.setState({msg: null});
            }
        }


    }

    //@desc Element on change handler that updates the state with the value in the element.
    onChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleCheckboxChange(e) {
        this.setState({
                [e.target.name]: !this.state[e.target.name]
        }
        )
    }

    onSubmit(e) {
        // prevents default HTML submit from performing
        e.preventDefault();

        const newDonor = {
            lastname: this.state.lastname.toUpperCase(),
            middlename: this.state.middlename.toUpperCase(),
            firstname: this.state.firstname.toUpperCase(),
            ssn: this.state.ssn.toUpperCase(),
            dodid: this.state.dodid.toUpperCase(),
            bloodtype: this.state.bloodtype.toUpperCase(),
            nationality: this.state.nationality.toUpperCase(),
            militaryunit: this.state.militaryunit.toUpperCase(),
            ltowb: this.state.ltowb,
            gender: this.state.gender.toUpperCase(),
            race: this.state.race.toUpperCase(),
            dob: this.state.dob,
            service: this.state.service.toUpperCase(),
            mos: this.state.mos.toUpperCase(),
            rank: this.state.rank.toUpperCase(),
            paygrade: this.state.paygrade.toUpperCase(),
            lastdonation: this.state.lastdonation,
            donations: this.state.donations
        };

        console.log(newDonor);
        this.setState({
            donor: newDonor
        })

        this.props.clearErrors();

        this.props.addDonor(newDonor);
    }
}

DonorAdd.propTypes = {
    isAuthenticated: PropTypes.bool,
    donor : PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    addDonor: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => (
    {
    error: state.error,
    isAuthenticated: state.auth.isAuthenticated,
    donor: state.donor
});

export default connect(
    mapStateToProps,
    { addDonor, clearErrors }
)(DonorAdd);