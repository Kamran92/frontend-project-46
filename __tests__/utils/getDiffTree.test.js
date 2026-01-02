import { describe, test, expect } from '@jest/globals'
import parsers from '../../src/parsers.js'
import { getDiffTree } from '../../src/utils/getDiffTree.js'
import { getDataAndFormatFromFile } from '../../src/utils/getDataAndFormatFromFile.js'
import mockDiffTree from '../__fixtures__/moka-files/mockDiffTree.js'

const file1Json = parsers(getDataAndFormatFromFile('__tests__/__fixtures__/json-files/file1.json'))
const file2Json = parsers(getDataAndFormatFromFile('__tests__/__fixtures__/json-files/file2.json'))
const file1Yaml = parsers(getDataAndFormatFromFile('__tests__/__fixtures__/yaml-files/file1.yaml'))
const file2Yaml = parsers(getDataAndFormatFromFile('__tests__/__fixtures__/yaml-files/file2.yaml'))

describe('getDiffTree', () => {
  test('должен корректно работать с данными из file1.json и file2.json', () => {
    const diffTree = getDiffTree(file1Json, file2Json)

    expect(diffTree).toEqual(mockDiffTree)
  })

  test('должен корректно работать с данными из file1.yaml и file2.yaml', () => {
    const diffTree = getDiffTree(file1Yaml, file2Yaml)

    expect(diffTree).toEqual(mockDiffTree)
  })

  test('должен корректно обрабатывать сравнение разных типов файлов file1.json и file2.yaml', () => {
    const diffTree = getDiffTree(file1Json, file2Yaml)

    expect(diffTree).toEqual(mockDiffTree)
  })
})
