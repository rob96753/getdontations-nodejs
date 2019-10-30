import React from 'react';
import axios from 'axios';
import DateFormatting from '../util/dateformatting';

import { connect } from 'react-redux';
import {getDonations} from '../actions/donation.action';
import PropTypes from 'prop-types';

const df = new DateFormatting();

//@desc lays out the report results
//@todo need to display the product child values correctly.
const Donation = props => (
    <tr>
        <td style={{fontsize: "12px"}}>{props.donation.lastname}</td>
        <td>{props.donation.dob}</td>
        <td>{props.donation.ssn}</td>
        <td>{props.donation.bloodtype}</td>
        <td>{props.donation.ltowb}</td>
        <td>{props.donation.din}</td>
        <td>{props.donation.donationdate}</td>
        <td>{props.donation.donationuic}</td>
        <td>{props.donation.products[0].product}</td>
        <td>{df.getMilDateFormat(props.donation.products[0].expiredate)}</td>
    </tr>
)

class DonationReport extends React.Component {
    constructor(props) {
        // bind constructor of subclass
        super(props);
        this.render = this.render.bind(this);
        this.donationList = this.donationList.bind(this);
        this.onClose = this.onClose.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }


    // this is a react construct that is used for validation
    static propTypes = {
        getDonations: PropTypes.func.isRequired,
        donation: PropTypes.object.isRequired
    }

    //@desc get the donations from the database
    componentDidMount() {
        this.props.getDonations();
    }

    //@process the donations from the database
    donationList() {
        try{
            return this.props.donation.donations.map( currentdonation=> {
                    currentdonation.dob = df.getMilDateFormat(currentdonation.dob);
                    currentdonation.donationdate = df.getMilDateFormat(currentdonation.donationdate);

                    // will need to format the DOB, donation date, and expire date when real data is received.
                    return <Donation donation = {currentdonation} selectDonation = {this.selectdonation} key={currentdonation._id}/>                }
            )

        } catch(e) {
            console.log(`Error in Donation List ${e}`);
        }

    }

    render()
    {
        return (
            <div>
                <h3>Donors</h3>
                <table className="table table-striped table-sm">
                    <thead className="thead-light">
                    <tr>
                        <th>Last Name</th>
                        <th>DOB</th>
                        <th>SSN</th>
                        <th>ABO/RH</th>
                        <th>LTOWB</th>
                        <th>DIN</th>
                        <th>DONATION DATE</th>
                        <th>DONATION UIC</th>
                        <th>PRODUCT</th>
                        <th>EXPIRE DATE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.donationList()}
                    </tbody>
                </table>
                <div>
                    <form onClose={this.onClose}>
                        <div className="form-group">
                            <input id='donor-report-button-submit' type="submit" value="Close Report"
                                   className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
            )
    }

    onClose() {

    }
}

const mapStateToProps = (state) => ({
        donation: state.donation
    }
);

export default connect(
    mapStateToProps,
    {getDonations})
(DonationReport);