import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { describe, test, expect } from '@jest/globals'
import { getDataAndFormatFromFile } from '../src/utils/getDataAndFormatFromFile.js'
import fs from 'fs'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const file1Path = resolve(__dirname, '__fixtures__/json-files/file1.json')
const testFile1 = fs.readFileSync(file1Path, 'utf-8')

describe('getDataAndFormatFromFile', () => {
  test('должен читать файл по абсолютному пути', () => {
    const absolutePath = path.resolve('__tests__', '__fixtures__', 'json-files', 'file1.json')
    const { data, format } = getDataAndFormatFromFile(absolutePath)

    expect(data).toEqual(testFile1)
    expect(format).toEqual('json')
  })

  test('должен читать файл по относительному пути', () => {
    const { data, format } = getDataAndFormatFromFile('__tests__/__fixtures__/json-files/file1.json')

    expect(data).toEqual(testFile1)
    expect(format).toEqual('json')
  })
})
