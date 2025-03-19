#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import {App} from './app.js';

// Handle process signals
process.on('SIGTERM', () => {
	console.log('Received SIGTERM. Cleaning up...');
	process.exit(0);
});

process.on('SIGINT', () => {
	console.log('Received SIGINT. Cleaning up...');
	process.exit(0);
});

process.on('uncaughtException', err => {
	console.error('Uncaught exception:', err);
	process.exit(1);
});

process.on('unhandledRejection', err => {
	console.error('Unhandled rejection:', err);
	process.exit(1);
});

const cli = meow(
	`
  Usage
    $ tiktok-live-cli <username>

  Options
    --help  Show this help message

  Examples
    $ tiktok-live-cli @username
`,
	{
		importMeta: import.meta,
	},
);

const username = cli.input[0]?.replace('@', '');

if (!username) {
	console.error('Please provide a TikTok username');
	cli.showHelp();
	process.exit(1);
}

const {waitUntilExit} = render(<App username={username} />);

// Keep the process running until the app exits
waitUntilExit().catch(err => {
	console.error('App crashed:', err);
	process.exit(1);
});
