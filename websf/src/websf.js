#!/usr/bin/env node
import chalk from 'chalk';
let log = console.log
log(chalk.bgGreen.white('WebSF 1.0 Beta is starting up!'));

import { getIpAndReverseLookup, getAllDnsRecords } from './utils/dnsandip.js';

getIpAndReverseLookup("cyberjince.com")
    .then(reverseIpList => {
        console.log('Reverse IP Lookup:', reverseIpList);
    })
    .catch(err => {
        console.error('Error:', err);
    });

getAllDnsRecords("cyberjince.com")
    .then(DNSRecords => {
        console.log('DNS Records', DNSRecords);
    })
    .catch(err => {
        console.error('Error:', err);
    });