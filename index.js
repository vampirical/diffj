#!/usr/bin/env node

const yargs = require('yargs');

const pathsScript = require('./scripts/paths');

yargs.usage('$0 <cmd> [args]');

yargs.command(
  'paths <leftPath> <rightPath> [options]',
  'diffs the json content of two paths',
  {
    output: {
      alias: 'o',
      describe: 'print the output to a CSV file',
      type: 'string',
    },
    quiet: {
      alias: 'q',
      describe: 'silences the console output',
      type: 'boolean',
      default: false,
    },
    failOnDiff: {
      alias: 'f',
      default: false,
      describe: 'return exit code 1 if there is a difference',
      type: 'boolean',
    },
    customCompare: {
      describe: 'custom compare json as string',
      type: 'string',
    },
    sortKey: {
      alias: 'k',
      describe: 'sort any array of json objects by the specified key',
      type: 'string',
    },
    sortKeys: {
      alias: 'K',
      describe: 'multiple sort keys. separate multiple keys with a space: -K "id" "userId"',
      type: 'array',
    },
    ignore: {
      alias: 'i',
      describe: 'ignore the provided key(s). separate multiple keys with a space: -i "key1" "key2"',
      type: 'array',
    },
    arraysortkey: {
      alias: 'a',
      describe: 'sort nested arrays by the sort key, defaults to id',
      type: 'string',
    },
  },
  pathsScript,
);

yargs.help();

yargs.argv; // eslint-disable-line
