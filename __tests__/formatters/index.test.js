import fs from 'fs'
import { describe, expect, test } from '@jest/globals'
import format from '../../src/formatters/index.js'
import mockDiffTree from '../__fixtures__/mock-files/mockDiffTree.js'

const expectedStylishFormat = fs.readFileSync('__tests__/__fixtures__/mock-files/expected-stylish.txt', 'utf-8')
const expectedJsonFormat = fs.readFileSync('__tests__/__fixtures__/mock-files/expected-plain.txt', 'utf-8')

describe('format', () => {
  test('должен преобразовывать в формат "stylish"', () => {
    const result = format(mockDiffTree, 'stylish')

    expect(result).toBe(expectedStylishFormat)
  })

  test('должен преобразовывать в формат "stylish"', () => {
    const result = format(mockDiffTree)

    expect(result).toBe(expectedStylishFormat)
  })

  test('должен преобразовывать в формат "plain"', () => {
    const result = format(mockDiffTree, 'plain')

    expect(result).toBe(expectedJsonFormat)
  })
})
