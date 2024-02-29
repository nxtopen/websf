#!/usr/bin/env node
import chalk from 'chalk';
import { program } from 'commander';
import { getAllDnsRecords } from './utils/dns.js';
import { scanSubdomains } from './utils/subdomain.js';

program
    .version('1.0.0')
    .description('WebSF - Website Security Framework')
    // .option('-m, --mode <mode>', 'Specify the mode (cli or ui)', 'cli')
    .option('-o, --output <mode>', 'Need to export an output as json? (yes or no)', 'no')
    .argument('[website]', 'Specify the website for analysis')
    .parse(process.argv);

let { args, mode } = program;
if (!mode) mode = 'cli'

const website = args[0]; // Take the first argument as the website

if (!website) {
    console.error(chalk.red('Error: Website parameter is required.'));
    process.exit(1);
}

if (mode !== 'cli' && mode !== 'ui') {
    console.error(chalk.red('Error: Invalid mode. Mode must be either "cli" or "ui".'));
    process.exit(1);
}

console.log(chalk.bgGreen.white('WebSF 1.0 Beta is starting up!'));

getAllDnsRecords(website)
    .then(DNSRecords => {
        console.log('DNS Records:', DNSRecords);
    })
    .catch(err => {
        console.error('Error:', err);
    });

scanSubdomains(website)
    .then(subdomains => {
        console.log('Subdomains', subdomains);
    })
    .catch(err => {
        console.error('Error:', err);
    });