const config = require('config');

const MILLISECONDS_IN_A_DAY = 24 * 3600 * 1000;

class DateFormatting{
    constructor(props) {
        //super(props);

        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        this.state = {
            months: month
        }

        this.getLongMonthName = this.getLongMonthName.bind(this);
        this.getShortMonthName = this.getShortMonthName.bind(this);
        this.getMilDateFormat = this.getMilDateFormat.bind(this);
        this.isEligible = this.isEligible.bind(this);

    }


    getShortMonthName(month_number) {
        if (month_number >= 0 && month_number <= 11) {
            return this.state.months[month_number -1].substring(0,3).toUpperCase();
        } else {
            return this.state.months[0].substring(0,3).toUpperCase();
        }

    }

    getLongMonthName(month_number) {
        if (month_number >= 0 && month_number <= 11) {
            return this.state.months[month_number].toUpperCase();
        } else {
            return this.state.months[0].toUpperCase();
        }

    }

    getYYYYMMDD() {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth()+1).toString().padStart(2, '0');
        const day = (date.getDate() +1).toString().padStart(2,'0');
        return `${year}${month}${day}`;
    }

    getYYYYMMDDMISS() {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth()+1).toString().padStart(2, '0');
        const day = (date.getDate() +1).toString().padStart(2,'0');
        const hours = (date .getHours() +1).toString().padStart(2,'0');
        const minutes = (date.getMinutes() +1).toString().padStart(2,'0');
        return `${year}${month}${day}${hours}${minutes}`;
    }

    //@desc converts a date to a military date format. There was an issue with the converted time being represented
    //      in local time. This method preserves the date in UTC.
    getMilDateFormat(date) {
        if (date instanceof Date) {
            const year = date.getFullYear().toString();
            const month = this.getShortMonthName[date.getMonth()+1];
            const day = (date.getDate() +1).toString().padStart(2,'0');
            const time = 'T00:00:00.000Z'
        }
        var result = date.split(/[-T:]/);
        return `${day.padStart(2,'0')} ${month}  ${year} ${time}`;
    }

    isEligible(date) {
        let lastdonationdate = new Date(date)
        let daysBetweenDonations = config.get('daysBetweenDonations');
        if (!lastdonationdate) return true;
        return (Date.now() - (daysBetweenDonations * MILLISECONDS_IN_A_DAY)) > lastdonationdate;

    }

    getEligibleDate()  {
        let daysBetweenDonations = config.get('daysBetweenDonations');
        return (Date.now() - (daysBetweenDonations * MILLISECONDS_IN_A_DAY));
    }

    computeExpireDate(donationDate, daysToExpire) {
        return new Date(donationDate + (daysToExpire * MILLISECONDS_IN_A_DAY))
    }
}

module.exports = DateFormatting;



