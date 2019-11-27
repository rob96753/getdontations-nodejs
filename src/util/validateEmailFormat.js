
//@desc validates the format of an email address.
const validEmail = (emailaddress) => {
    var regex = /^[a-zA-Z0-9\.\-\_\%\!\#\&\'\+\-\/\=\?\^\`\{\|\}\~\;]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
     return regex.test(emailaddress);
}