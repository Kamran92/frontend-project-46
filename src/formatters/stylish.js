import _ from 'lodash'

const stringify = (value, depth, replacer, spacesCount) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isPlainObject(currentValue)) {
      if (_.isString(currentValue)) return currentValue
      if (_.isNull(currentValue)) return 'null'
      if (_.isUndefined(currentValue)) return 'undefined'
      return String(currentValue)
    }

    const indentSize = currentDepth * spacesCount
    const currentIndent = replacer.repeat(indentSize)
    const bracketIndent = replacer.repeat(indentSize - spacesCount)
    const entries = Object.entries(currentValue)

    const lines = entries.map(([key, val]) => {
      const formattedValue = iter(val, currentDepth + 1)
      return `${currentIndent}${key}: ${formattedValue}`
    })

    return `{\n${lines.join('\n')}\n${bracketIndent}}`
  }

  return iter(value, depth + 1)
}

const formatNode = (node, depth, replacer, spacesCount) => {
  const indentSize = depth * spacesCount
  const indent = replacer.repeat(indentSize)

  switch (node.type) {
    case 'root': {
      const children = node.children.map(child => formatNode(child, 1, replacer, spacesCount))
      return `{\n${children.join('\n')}\n}`
    }

    case 'nested': {
      const children = node.children.map(child => formatNode(child, depth + 1, replacer, spacesCount))
      return `${indent}${node.key}: {\n${children.join('\n')}\n${indent}}`
    }

    case 'added': {
      const formattedValue = stringify(node.value, depth, replacer, spacesCount)
      const signIndent = indent.slice(0, -2)
      return `${signIndent}+ ${node.key}: ${formattedValue}`
    }

    case 'removed': {
      const formattedValue = stringify(node.value, depth, replacer, spacesCount)
      const signIndent = indent.slice(0, -2)
      return `${signIndent}- ${node.key}: ${formattedValue}`
    }

    case 'updated': {
      const oldValueFormatted = stringify(node.oldValue, depth, replacer, spacesCount)
      const newValueFormatted = stringify(node.newValue, depth, replacer, spacesCount)
      const signIndent = indent.slice(0, -2)
      return [
        `${signIndent}- ${node.key}: ${oldValueFormatted}`,
        `${signIndent}+ ${node.key}: ${newValueFormatted}`,
      ].join('\n')
    }

    case 'unchanged': {
      const formattedValue = stringify(node.value, depth, replacer, spacesCount)
      return `${indent}${node.key}: ${formattedValue}`
    }

    default:
      throw new Error(`Unknown node type: ${node.type}`)
  }
}

export const formatStylish = (diffTree, depth = 1, replacer = ' ', spacesCount = 4) => {
  return formatNode(diffTree, depth, replacer, spacesCount)
}
