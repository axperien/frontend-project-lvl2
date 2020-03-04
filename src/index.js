#!/usr/bin/env node

import commander from 'commander';
import diff from './components/diff.js';

export default () => {
  const program = new commander.Command();

  program
    .version('0.0.1')
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      diff(firstConfig, secondConfig);
    })
    .parse(process.argv);

  if (!program.args.length) program.help();
};
