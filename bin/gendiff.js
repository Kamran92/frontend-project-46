#!/usr/bin/env node

import { Command } from 'commander'
import getDiff from '../src/genDiff.js'

new Command()
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, { format }) => {
    console.log(getDiff(filepath1, filepath2, format))
  })
  .parse()
