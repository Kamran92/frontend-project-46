import formatStylish from './stylish.js'
import formatPlain from './plain.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: diffTree => JSON.stringify(diffTree, null, 2),
}

export default (diff, formatName) => {
  const formatter = formatters[formatName]

  if (!formatter) return formatters['stylish'](diff)

  return formatter(diff)
}
