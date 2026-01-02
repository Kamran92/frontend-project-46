import { describe, expect, test } from '@jest/globals'
import genDiff from '../src/genDiff.js'

describe('genDiff', () => {
  test('должен сравнивать два файла', async () => {
    const output = genDiff('__tests__/__fixtures__/json-files/file1.json', '__tests__/__fixtures__/json-files/file2.json')

    expect(() => {
      output
    }).not.toThrow()
  })
})
