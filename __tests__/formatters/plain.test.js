import { describe, expect, test } from '@jest/globals'
import formatPlain from '../../src/formatters/plain.js'
import mockInvalidDiffTree from '../__fixtures__/mock-files/mockInvalidDiffTree.js'

describe('formatStylish', () => {
  test('должен выбрасывать ошибку для неизвестного типа узла', () => {
    expect(() => {
      formatPlain(mockInvalidDiffTree)
    }).toThrow('Неизвестный тип: unknown_type')
  })

  test('должен преобразовывать undefined в "undefined"', () => {
    const result = formatPlain({
      type: 'root',
      children: [
        { key: 'a', type: 'updated', newValue: null, oldValue: undefined }],
    })

    expect(result).toContain('From undefined to null')
  })
})
