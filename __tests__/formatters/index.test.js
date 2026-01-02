import fs from 'fs'
import { describe, expect, test } from '@jest/globals'
import format from '../../src/formatters/index.js'
import mockDiffTree from '../__fixtures__/moka-files/mockDiffTree.js'

describe('format', () => {
  test('должен преобразовывать в формат "stylish"', () => {
    const result = format(mockDiffTree, 'stylish')
    const expected = fs.readFileSync('__tests__/__fixtures__/moka-files/expected-stylish.txt', 'utf-8')

    expect(result).toBe(expected)
  })

  test('должен преобразовывать в формат "stylish"', () => {
    const result = format(mockDiffTree)
    const expected = fs.readFileSync('__tests__/__fixtures__/moka-files/expected-stylish.txt', 'utf-8')

    expect(result).toBe(expected)
  })

  test('должен преобразовывать в формат "plain"', () => {
    const result = format(mockDiffTree, 'plain')
    const expected = fs.readFileSync('__tests__/__fixtures__/moka-files/expected-plain.txt', 'utf-8')

    expect(result).toBe(expected)
  })
})
