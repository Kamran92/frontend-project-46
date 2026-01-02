import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { describe, test, expect } from '@jest/globals'
import fs from 'fs'
import yaml from 'js-yaml'
import parsers from '../src/parsers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('parser', () => {
  test('должен читать файл json', () => {
    const path = resolve(__dirname, './__fixtures__/json-files/file1.json')
    const file = fs.readFileSync(path, 'utf-8')

    const data = parsers({ data: file, format: 'json' })

    expect(data).toEqual(JSON.parse(file))
  })

  test('должен читать файл yaml', () => {
    const path = resolve(__dirname, './__fixtures__/yaml-files/file1.yaml')
    const file = fs.readFileSync(path, 'utf-8')

    const data = parsers({ data: file, format: 'yaml' })

    expect(data).toEqual(yaml.load(file))
  })

  test('должен читать файл yml', () => {
    const path = resolve(__dirname, './__fixtures__/yaml-files/file1.yaml')
    const file = fs.readFileSync(path, 'utf-8')

    const data = parsers({ data: file, format: 'yml' })

    expect(data).toEqual(yaml.load(file))
  })

  test('должен выбрасывать ошибку для неподдерживаемого формата', () => {
    expect(() => {
      parsers({ data: '', format: 'txt' })
    }).toThrow('формат не поддерживается: txt')
  })
})
