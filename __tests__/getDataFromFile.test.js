import { describe, test, expect } from '@jest/globals'
import { getDataFromFile } from '../src/getDataFromFile.js'
import fs from 'fs'
import path from 'path'

describe('getDataFromFile', () => {
  describe('Пути', () => {
    test('должен читать файл по абсолютному пути', () => {
      const absolutePath = path.resolve('__fixtures__', 'file1.json')
      const result = getDataFromFile(absolutePath)

      expect(result).toEqual({
        host: 'hexlet.io',
        timeout: 50,
        proxy: '123.234.53.22',
        follow: false,
      })
    })

    test('должен читать файл по относительному пути', () => {
      const result = getDataFromFile('__fixtures__/file1.json')

      expect(result).toEqual({
        host: 'hexlet.io',
        timeout: 50,
        proxy: '123.234.53.22',
        follow: false,
      })
    })
  })

  describe('Чтение файла', () => {
    test('должен корректно читать содержимое JSON файла', () => {
      const result = getDataFromFile('__fixtures__/file1.json')

      expect(typeof result).toBe('object')
      expect(result.host).toBe('hexlet.io')
      expect(result.timeout).toBe(50)
      expect(result.proxy).toBe('123.234.53.22')
      expect(result.follow).toBe(false)
    })
  })

  describe('Обработка неподдерживаемых форматов', () => {
    test('должен выбрасывать ошибку для неподдерживаемого формата', () => {
      const tempFilePath = '__fixtures__/test.txt'
      fs.writeFileSync(tempFilePath, 'some text data')

      expect(() => {
        getDataFromFile(tempFilePath)
      }).toThrow('формат не поддерживается: txt')

      fs.unlinkSync(tempFilePath)
    })
  })
})
