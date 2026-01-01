import _ from 'lodash'

const buildDiffTree = (obj1, obj2) => {
  const allKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))

  return allKeys.map((key) => {
    const val1 = obj1[key]
    const val2 = obj2[key]
    const has1 = _.has(obj1, key)
    const has2 = _.has(obj2, key)

    if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return { key, type: 'nested', children: buildDiffTree(val1, val2) }
    }

    if (has1 && !has2) {
      return { key, type: 'removed', value: val1 }
    }

    if (!has1 && has2) {
      return { key, type: 'added', value: val2 }
    }

    if (!_.isEqual(val1, val2)) {
      return { key, type: 'updated', oldValue: val1, newValue: val2 }
    }

    return { key, type: 'unchanged', value: val1 }
  })
}

export const getDiffTree = (obj1, obj2) => {
  return { type: 'root', children: buildDiffTree(obj1, obj2) }
}
