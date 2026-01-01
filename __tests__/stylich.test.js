import { describe, expect, test } from '@jest/globals'
import { formatStylish } from '../src/formatters/stylish.js'

describe('formatStylish', () => {
  test('должен преобразовывать undefined в "undefined"', () => {
    const value = undefined
    const result = formatStylish({
      type: 'root',
      children: [{ key: 'undef', type: 'unchanged', value }],
    })
    expect(result).toContain('undef: undefined')
  })

  test('должен выбрасывать ошибку для неизвестного типа узла', () => {
    const invalidDiffTree = {
      type: 'root',
      children: [{ key: 'invalid', type: 'unknown_type', value: 'test' }],
    }

    expect(() => {
      formatStylish(invalidDiffTree)
    }).toThrow('Unknown node type: unknown_type')
  })
})
