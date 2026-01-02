import { describe, expect, test } from '@jest/globals'
import formatStylish from '../../src/formatters/stylish.js'
import mockInvalidDiffTree from '../__fixtures__/mock-files/mockInvalidDiffTree.js'

describe('formatStylish', () => {
  test('должен выбрасывать ошибку для неизвестного типа узла', () => {
    expect(() => {
      formatStylish(mockInvalidDiffTree)
    }).toThrow('Неизвестный тип: unknown_type')
  })

  test('должен преобразовывать undefined в "undefined"', () => {
    const result = formatStylish({
      type: 'root',
      children: [{ key: 'undef', type: 'unchanged', value: undefined }],
    })

    expect(result).toContain('undef: undefined')
  })
})
