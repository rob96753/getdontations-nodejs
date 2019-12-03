


const expandSsn = (ssn) => {
    return ssn.slice(0, 3) + '-' + ssn.slice(3, 5) + '-' + ssn.slice(-4);
}


module.export = {
    expandssn: expandSsn
}