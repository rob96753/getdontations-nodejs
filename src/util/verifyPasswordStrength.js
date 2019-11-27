//@desc Tests the password for strength making sure is has 8 charactes and
// contain 1 lowercase, 1 uppercase, 1 numerid and 1 special character (e.g.,$&#@!^*&)
// Strong: The password must be at least 8 charactes and contain 1 lowercase, 1 uppercase, 1 numerid and 1 special character (e.g.,$&#@!^*&)
// Medium Strength is commented out for now.
// Medium Strength: medium strength if it contains six characters or more and has at least one
// lowercase and one uppercase alphabetical character or has at least one lowercase and one
// numeric character or has at least one uppercase and one numeric character.
//
const verifyPasswordStrength = (password) => {
    let weak_password_note = 'The password must be at least 8 charactes and contain 1 lowercase, 1 uppercase, 1 numerid and 1 special character (e.g.,$&#@!^*&)';
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (strongRegex.test(password)) {
        return true;
    } else {
        return false;
    }
}