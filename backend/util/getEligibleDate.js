const config = require('config');

const DAYS_BETWEEN_DONATIONS = config.get('daysBetweenDonations');

const getEligibleDate = () => {
    let d = new Date();
    d.setDate(d.getDate() - (DAYS_BETWEEN_DONATIONS));
    return (d);
};

module.exports = getEligibleDate;
