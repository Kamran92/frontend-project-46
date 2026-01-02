import _ from 'lodash'

const formatValue = (value) => {
  if (_.isPlainObject(value) || _.isArray(value)) {
    return '[complex value]'
  }
  if (_.isString(value)) {
    return `'${value}'`
  }
  if (_.isNull(value)) {
    return 'null'
  }
  if (_.isUndefined(value)) {
    return 'undefined'
  }
  return String(value)
}

const buildPath = (currentPath, key) => {
  return currentPath ? `${currentPath}.${key}` : key
}

const formatNodePlain = (node, path) => {
  switch (node.type) {
    case 'root': {
      const lines = node.children
        .flatMap(child => formatNodePlain(child, path))
        .filter(Boolean)
      return lines.join('\n')
    }

    case 'nested': {
      const newPath = buildPath(path, node.key)
      const childrenLines = node.children
        .flatMap(child => formatNodePlain(child, newPath))
        .filter(Boolean)
      return childrenLines.join('\n')
    }

    case 'added': {
      const propertyPath = buildPath(path, node.key)
      const formattedValue = formatValue(node.value)
      return `Property '${propertyPath}' was added with value: ${formattedValue}`
    }

    case 'removed': {
      const propertyPath = buildPath(path, node.key)
      return `Property '${propertyPath}' was removed`
    }

    case 'updated': {
      const propertyPath = buildPath(path, node.key)
      const oldValueFormatted = formatValue(node.oldValue)
      const newValueFormatted = formatValue(node.newValue)
      return `Property '${propertyPath}' was updated. From ${oldValueFormatted} to ${newValueFormatted}`
    }

    case 'unchanged': {
      return ''
    }

    default:
      throw new Error(`Неизвестный тип: ${node.type}`)
  }
}

export default (diffTree) => {
  return formatNodePlain(diffTree, '').trim()
}
