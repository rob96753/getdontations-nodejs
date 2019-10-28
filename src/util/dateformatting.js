

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
            return this.state.months[month_number].substring(0,3).toUpperCase();
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

    getMilDateFormat(date) {
        let dateFormatted = new Date(date);
        return `${dateFormatted.getDay()} ${this.getShortMonthName(dateFormatted.getMonth())}  ${dateFormatted.getFullYear()}`;
    }

    isEligible(date) {
        let lastdonationdate = new Date(date)
        let daysBetweenDonations = 54;
        if (!lastdonationdate) return true;
        return (Date.now() - (daysBetweenDonations * 3600 * 24 * 1000)) > lastdonationdate;

    }
}
