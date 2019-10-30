import React from 'react';
import axios from 'axios';
import DateFormatting from '../util/dateformatting';

const Donor = props => (
    <tr>
        <td style={{fontsize: "12px"}}>{props.donor.lastname}</td>
        <td>{props.donor.dob}</td>
        <td>{props.donor.ssn}</td>
        <td>{props.donor.dodid}</td>
        <td>{props.donor.bloodtype}</td>
        <td>{props.donor.ltowb}</td>
        <td>{props.donor.service}</td>
        <td>{props.donor.militaryunit}</td>
        <td>{props.donor.rank}</td>
        <td>{props.donor.paygrade}</td>
        <td><center><b>{props.donor.iseligible?'yes':'no'}</b></center></td>
    </tr>
)

export default class DonorReport extends React.Component {
    constructor(props) {
        // bind constructor of subclass
        super(props);
        this.render = this.render.bind(this);
        this.selectDonor = this.selectDonor.bind(this);

        this.donorList = this.donorList.bind(this);

        this.state = {
            donors: [],
            dateformatting: new DateFormatting()
        }
    }

    donorList() {
        return this.state.donors.map(currentdonor=> {
            let df = new DateFormatting();
            currentdonor.dob = df.getMilDateFormat(currentdonor.dob);
            console.log(df.isEligible(currentdonor.lastdonation), currentdonor.lastdonation);
            currentdonor.iseligible = df.isEligible(currentdonor.lastdonation);
            console.log(currentdonor);

            return <Donor donor = {currentdonor} selectDonor = {this.selectdonor} key={currentdonor._id}/>;
            }
        );
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
                        <th>DODID</th>
                        <th>ABO/RH</th>
                        <th>LTOWB</th>
                        <th>Service</th>
                        <th>Military Unit</th>
                        <th>RANK</th>
                        <th>GRADE</th>
                        <th>Eligible</th>
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
    componentDidMount() {
        axios.get('http://localhost:5000/donor')
            .then(response=> {
            this.setState(
                {donors: response.data
                })
        })
            .catch((error) => {
            console.log(error)
        });
    }

    selectDonor() {

    }

    onClose() {
        axios.post('http://localhost:3000/', {})
            .then(res => 'Close Report')
            .catch(error => {
                console.log(error.response)
            });
        window.location = '/';
    }



}