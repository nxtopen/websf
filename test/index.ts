const { getAllDnsRecords, scanSubdomains } = require('websf');

getAllDnsRecords('google.com').then((records) => {
    console.log(records);
});

scanSubdomains('google.com').then((subdomains) => {
    console.log(subdomains);
});