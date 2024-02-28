#!/usr/bin/env node
import chalk from 'chalk';
import { program } from 'commander';
import { getIpAndReverseLookup, getAllDnsRecords } from './utils/domain-tools.js';

program
    .version('1.0.0 Beta')
    .description('WebSF - Website Scanner Framework')
    .argument('[website]', 'Specify the website for analysis')
    .parse(process.argv);

const { args } = program;
const website = args[0];

if (!website) {
    console.error(chalk.red('Error: Website parameter is required.'));
    process.exit(1);
}

console.log(chalk.bgGreen.white('WebSF 1.0 Beta is starting up!'));

getIpAndReverseLookup(website)
    .then(reverseIpList => {
        console.log('Reverse IP Lookup:', reverseIpList);
    })
    .catch(err => {
        console.error('Error:', err);
    });

getAllDnsRecords(website)
    .then(DNSRecords => {
        console.log('DNS Records:', DNSRecords);
    })
    .catch(err => {
        console.error('Error:', err);
    });