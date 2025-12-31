import { Command } from 'commander'
import { getDataFromFile } from './getDataFromFile.js'
import { parsers } from './parsers.js'
import { formatStylish } from './formatStylish.js'

export const createCLI = () => {
  const program = new Command()

  return program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format')
    .action((filepath1, filepath2, { format = 'stylish' }) => {
      const data1 = getDataFromFile(filepath1)
      const data2 = getDataFromFile(filepath2)
      const diff = parsers(data1, data2)

      if (format === 'stylish') {
        console.log(formatStylish(diff))

        return
      }

      throw new Error(`Ошибка, ${format} формата нет`)
    })
}
