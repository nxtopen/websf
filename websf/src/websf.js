#!/usr/bin/env node
import chalk from 'chalk';
import { program } from 'commander';
import express from 'express';
import next from 'next';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './api.js'; // Import api.js

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
    .version('1.0.0')
    .description('WebSF - Website Security Framework')
    .option('-o, --output <mode>', 'Need to export an output as json? (yes or no)', 'no')
    .argument('[website]', 'Specify the website for analysis')
    .parse(process.argv);

console.log(chalk.bgGreen.white('WebSF 1.0 Beta is starting up!'));

async function start() {
    const app = express();
    const nextApp = next({ dev: process.env.NODE_ENV !== 'production', dir: path.resolve(__dirname, '.', 'ui') });
    const nextHandler = nextApp.getRequestHandler();
    await nextApp.prepare();

    app.use('/_next', express.static(path.join(__dirname, 'ui', '.next')));

    // Mount the apiRouter at /api
    app.use('/api', apiRouter);

    app.get('*', (req, res) => {
        return nextHandler(req, res);
    });

    app.listen(process.env.PORT || 1994, () => {
        console.log(`
      +++++++++++++++++++++++++++++++++++++++++++++++++++\n
      +---- Server running on http://localhost:${process.env.PORT || 1994} ----+\n
      +++++++++++++++++++++++++++++++++++++++++++++++++++\n
      `);
    });
}

start();