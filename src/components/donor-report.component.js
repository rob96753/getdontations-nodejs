import React from 'react';
import { NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DateFormatting from '../util/dateformatting';
import {getDonors} from "../actions/donor.action";



const Donor = props => (
    <tr>
        <td style={{fontsize: "12px"}} key={props.donor._id}>{props.donor.lastname}</td>
        <td>{props.donor.dob}</td>
        <td>{props.donor.ssn}</td>
        <td>{props.donor.dodid}</td>
        <td>{props.donor.bloodtype}</td>
        <td>{props.donor.ltowb}</td>
        <td>{props.donor.service}</td>
        <td>{props.donor.militaryunit}</td>
        <td>{props.donor.rank}</td>
        <td>{props.donor.paygrade}</td>
        <td>{props.donor.lastdonation}</td>
    </tr>
)

class DonorReport extends React.Component {
    constructor(props) {
        // bind constructor of subclass
        super(props);
        this.render = this.render.bind(this);
        this.selectDonor = this.selectDonor.bind(this);
        this.onClose = this.onClose.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.donorList = this.donorList.bind(this);
    }

    static propTypes = {
        getDonors: PropTypes.func.isRequired,
        donors: PropTypes.object.isRequired
    }

    state =  {
                donors: [],
                msg: ''
    }

    componentDidMount() {
        this.props.getDonors();
    }

    //@desc
    donorList() {
        try{
            console.log(this.props.donors.donors);

             return this.props.donors.donors.map(currentdonor=> {
                let df = new DateFormatting();
                currentdonor.dob = df.getMilDateFormat(currentdonor.dob);
                currentdonor.lastdonation = df.getMilDateFormat(currentdonor.lastdonation);
                return <Donor donor = {currentdonor} selectDonor = {this.selectdonor} key={currentdonor._id}/>;
                }
            );


        } catch(e) {
            console.log(`Error in Donation List ${e}`);
        }
    }

    render()
    {
        return (
            <div>
                <h3>Donors</h3>
                {this.state.msg ? (
                    <Alert color='danger'>{this.state.msg}</Alert>
                ) : null}
                <table className="table table-striped table-sm">
                    <thead className="thead-light">
                    <tr>
                        <th>Last Name</th>
                        <th>DOB</th>
                        <th>SSN</th>
                        <th>DODID</th>
                        <th>ABO/RH</th>
                        <th>LTOWB</th>
                        <th>Service</th>
                        <th>Military Unit</th>
                        <th>RANK</th>
                        <th>GRADE</th>
                        <th>Last Donation</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.donorList()}
                    </tbody>
                </table>
                <div>
                    <form onClose={this.onClose}>
                        <div className="form-group">
                            <input id='donor-report-button-submit' type="submit" value="Close Report" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }


    selectDonor() {

    }

    onClose() {
    }

}




const mapStateToProps = (state) => (
    {
        donors: state.donors
    }
);

export default connect(
    mapStateToProps,
    {getDonors})
(DonorReport);