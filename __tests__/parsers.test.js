import { describe, test, expect } from '@jest/globals'
import { parsers } from '../src/parsers.js'
import { getDataFromFile } from '../src/getDataFromFile.js'

const file1Json = getDataFromFile('__fixtures__/json-files/file1.json')
const file2Json = getDataFromFile('__fixtures__/json-files/file2.json')
const file1Yaml = getDataFromFile('__fixtures__/yaml-files/file1.yaml')
const file2Yaml = getDataFromFile('__fixtures__/yaml-files/file2.yaml')

describe('parsers', () => {
  test('должен корректно работать с данными из file1.json и file2.json', () => {
    const result = parsers(file1Json, file2Json)

    expect(result).toEqual(
      [
        '- follow: false',
        '  host: hexlet.io',
        '- proxy: 123.234.53.22',
        '- timeout: 50',
        '+ timeout: 20',
        '+ verbose: true',
      ],
    )
  })

  test('должен корректно обрабатывать обратное сравнение file2.json и file1.json', () => {
    const result = parsers(file2Json, file1Json)

    expect(result).toEqual(
      [
        '+ follow: false',
        '  host: hexlet.io',
        '+ proxy: 123.234.53.22',
        '- timeout: 20',
        '+ timeout: 50',
        '- verbose: true',
      ],
    )
  })

  test('должен корректно работать с данными из file1.yaml и file2.yaml', () => {
    const result = parsers(file1Yaml, file2Yaml)

    expect(result).toEqual(
      [
        '- follow: false',
        '  host: hexlet.io',
        '- proxy: 123.234.53.22',
        '- timeout: 50',
        '+ timeout: 20',
        '+ verbose: true',
      ],
    )
  })

  test('должен корректно обрабатывать обратное сравнение file2.yaml и file1.yaml', () => {
    const result = parsers(file2Yaml, file1Yaml)

    expect(result).toEqual(
      [
        '+ follow: false',
        '  host: hexlet.io',
        '+ proxy: 123.234.53.22',
        '- timeout: 20',
        '+ timeout: 50',
        '- verbose: true',
      ],
    )
  })

  test('должен корректно обрабатывать сравнение разных типов файлов file1.json и file2.yaml', () => {
    const result = parsers(file1Json, file2Yaml)

    expect(result).toEqual(
      [
        '- follow: false',
        '  host: hexlet.io',
        '- proxy: 123.234.53.22',
        '- timeout: 50',
        '+ timeout: 20',
        '+ verbose: true',
      ],
    )
  })
})
