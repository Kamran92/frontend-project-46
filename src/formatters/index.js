import formatStylish from './stylish.js'
import formatPlain from './plain.js'
import formatJson from './json.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
}

export default (diff, formatName) => {
  const formatter = formatters[formatName]

  if (!formatter) return formatters['stylish'](diff)

  return formatter(diff)
}
