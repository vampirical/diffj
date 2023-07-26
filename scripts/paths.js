/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
const core = require('json-diff-core');
const Table = require('easy-table');

const pathsScript = async (args) => {
  const leftPath = args.leftPath;
  const rightPath = args.rightPath;

  let customCompare = args.customCompare || '{}';
  try {
    customCompare = JSON.parse(customCompare);
  } catch (err) {
    throw new Error('invalid json provided to customCompare');
  }

  let leftContent = null;
  try {
    leftContent = JSON.parse(fs.readFileSync(leftPath, 'utf-8'));
  } catch (err) {
    throw new Error(`error reading left hand side at ${leftPath}`);
  }

  let rightContent = null;
  try {
    rightContent = JSON.parse(fs.readFileSync(rightPath, 'utf-8'));
  } catch (err) {
    throw new Error(`error reading right hand side at ${rightPath}`);
  }

  const options = {
    sortKey: args.sortKey,
    sortKeys: args.sortKeys || [],
    ignore: args.ignore || [],
    customDiff: args.customDiff || {},
    customCompare: args.customCompare || {},
  };
  const diff = await core.diffJSON(leftContent, rightContent, options);

  const t = new Table();
  diff.forEach((difference) => {
    Object.keys(difference).forEach((key) => {
      const value = difference[key];
      t.cell(key, value);
    });
    t.newRow();
  });

  if (args.output) {
    diff.map((data) => {
      const result = data;
      result.id = 0;
      result.leftPath = diff.leftPath;
      result.rightPath = diff.rightPath;
      result.leftResponseTime = diff.leftResponseTime;
      result.rightResponseTime = diff.rightResponseTime;
      return result;
    });
    if (diff[0].diff === 'none') {
      diff.map((data) => {
        const result = data;
        result.status = 'pass';
        return result;
      });
    } else {
      diff.map((data) => {
        const result = data;
        result.status = 'fail';
        return result;
      });
    }
    await core.writeCSV(args.output, diff);
  }
  const output = t.toString();

  if (!args.quiet) {
    console.log(output);
  }

  if (args.failOnDiff && (diff.length > 1 || diff[0].diff !== 'none')) {
    process.exit(1);
  }
};

module.exports = (args) =>
  pathsScript(args).catch((err) => {
    console.log(chalk.red(err.toString()));
    console.error(err); // TODO DEBUG REMOVE
    process.exit(1);
  });
