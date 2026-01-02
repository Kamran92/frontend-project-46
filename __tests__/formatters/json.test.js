import fs from 'fs'
import { describe, expect, test } from '@jest/globals'
import formatJson from '../../src/formatters/json.js'
import mockDiffTree from '../__fixtures__/mock-files/mockDiffTree.js'

describe('formatJson', () => {
  test('должен выбрасывать ошибку для неизвестного типа узла', () => {
    const output = formatJson(mockDiffTree)
    const expected = fs.readFileSync('__tests__/__fixtures__/mock-files/expected-json.txt', 'utf-8')

    expect(output).toBe(expected)
  })
})
