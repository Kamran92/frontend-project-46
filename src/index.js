import { Command } from 'commander'
import { getDataFromFile } from './parsers.js'
import { buildDiff } from './buildDiff.js'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const data1 = getDataFromFile(filepath1)
    const data2 = getDataFromFile(filepath2)

    console.log(buildDiff(data1, data2))
  })

program.parse()
