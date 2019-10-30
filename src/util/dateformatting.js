

export default class DateFormatting{
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

    //@desc converts a date to a military date format. There was an issue with the converted time being represented
    //      in local time. This method preserves the date in UTC.
    getMilDateFormat(date) {
        var result = date.split(/[-T:]/);
        return `${Number(result[2])} ${this.getShortMonthName(Number(result[1]))}  ${Number(result[0])}`;
    }

    isEligible(date) {
        let lastdonationdate = new Date(date)
        let daysBetweenDonations = 54;
        if (!lastdonationdate) return true;
        return (Date.now() - (daysBetweenDonations * 3600 * 24 * 1000)) > lastdonationdate;

    }
}
