import { Command } from 'commander'
import { getDataAndFormatFromFile } from './utils/getDataAndFormatFromFile.js'
import { parsers } from './parsers.js'
import { formatStylish } from './formatters/stylish.js'
import { getDiffTree } from './utils/getDiffTree.js'

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
      const data1 = parsers(getDataAndFormatFromFile(filepath1))
      const data2 = parsers(getDataAndFormatFromFile(filepath2))
      const diffTree = getDiffTree(data1, data2)

      if (format === 'stylish') {
        console.log(formatStylish(diffTree))

        return
      }

      throw new Error(`Ошибка, ${format} формата нет`)
    })
}
