import { describe, test, expect } from '@jest/globals'
import { buildDiff } from '../src/buildDiff.js'
import { getDataFromFile } from '../src/getDataFromFile.js'

describe('buildDiff', () => {
  const file1Data = getDataFromFile('__fixtures__/file1.json')
  const file2Data = getDataFromFile('__fixtures__/file2.json')

  test('должен корректно работать с данными из file1.json и file2.json', () => {
    const result = buildDiff(file1Data, file2Data)

    expect(result).toContain('- timeout: 50')
    expect(result).toContain('+ timeout: 20')
    expect(result).toContain('  host: hexlet.io')
    expect(result).toContain('- proxy: 123.234.53.22')
    expect(result).toContain('- follow: false')
    expect(result).toContain('+ verbose: true')
  })

  test('должен корректно обрабатывать обратное сравнение file2.json и file1.json', () => {
    const result = buildDiff(file2Data, file1Data)

    expect(result).toContain('- timeout: 20')
    expect(result).toContain('+ timeout: 50')
    expect(result).toContain('  host: hexlet.io')
    expect(result).toContain('+ proxy: 123.234.53.22')
    expect(result).toContain('+ follow: false')
    expect(result).toContain('- verbose: true')
  })
})
