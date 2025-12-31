import _ from 'lodash'

export const parsers = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))

  const diff = keys
    .map((key) => {
      const has1 = Object.hasOwn(obj1, key)
      const has2 = Object.hasOwn(obj2, key)

      const val1 = obj1[key]
      const val2 = obj2[key]

      if (!has1) return `+ ${key}: ${val2}`

      if (!has2) return `- ${key}: ${val1}`

      if (val1 !== val2) return [`- ${key}: ${val1}`, `+ ${key}: ${val2}`]

      return `  ${key}: ${val1}`
    })
    .flat()

  return diff
}
