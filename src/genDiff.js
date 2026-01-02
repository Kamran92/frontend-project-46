import parser from './parsers.js'
import { getDataAndFormatFromFile } from './utils/getDataAndFormatFromFile.js'
import { getDiffTree } from './utils/getDiffTree.js'
import format from './formatters/index.js'

export default (filepath1, filepath2, formatName) => {
  const data1 = parser(getDataAndFormatFromFile(filepath1))
  const data2 = parser(getDataAndFormatFromFile(filepath2))

  const diff = getDiffTree(data1, data2)

  return format(diff, formatName)
}
