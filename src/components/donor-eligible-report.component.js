import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DateFormatting from '../util/dateformatting';
import {getDonors} from "../actions/donor.action";

const df = new DateFormatting();

//@desc lays out the report results
//@todo need to display the product child values correctly.
const Donation = props => (
    <tr key={props.donation.id}>
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

