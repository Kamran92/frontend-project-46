import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { describe, expect, test } from '@jest/globals'
import { createCLI } from '../src'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const testFile1 = resolve(__dirname, './__fixtures__/json-files/file1.json')
const testFile2 = resolve(__dirname, './__fixtures__/json-files/file2.json')

const getOutput = ({ command }) => {
  const program = createCLI()

  let output = ''

  const originalExit = process.exit

  process.exit = (code) => {
    throw new Error(`process.exit called with code: ${code}`)
  }

  try {
    program.configureOutput({
      writeOut: (str) => { output += str },
      writeErr: (str) => { output += str },
    })

    program.parse(command)
  }
  catch (error) {
    if (!error.message.includes('process.exit called')) throw error
  }
  finally {
    process.exit = originalExit
  }

  return output
}

describe('CLI утилита gendiff', () => {
  test('должна показывать справочную информацию', async () => {
    const output = getOutput({ command: ['node', 'gendiff', '-h'] })

    expect(output).toContain('Usage: gendiff')
    expect(output).toContain('Compares two configuration files')
    expect(output).toContain('Options:')
    expect(output).toContain('-f, --format <type>')
  })

  test('должна показывать версию программы', async () => {
    const output = getOutput({ command: ['node', 'gendiff', '-V'] })

    expect(output.trim()).toBe('1.0.0')
  })

  test('должна сравнивать два файла', async () => {
    const output = getOutput({ command: ['node', 'gendiff', testFile1, testFile2] })

    expect(() => {
      output
    }).not.toThrow()
  })

  test('должна требовать два аргумента с путями к файлам', async () => {
    try {
      getOutput({ command: ['node', 'gendiff'] })
    }
    catch (error) {
      expect(error.stderr).toContain(`error: missing required argument 'filepath1'`)
    }

    try {
      getOutput({ command: ['node', 'gendiff', testFile1] })
    }
    catch (error) {
      expect(error.stderr).toContain(`error: missing required argument 'filepath2'`)
    }
  })

  test('должен выбрасывать ошибку при пустом значении формата', () => {
    expect(() => {
      getOutput({ command: ['node', 'gendiff', testFile1, testFile2, '--format', ''] })
    }).toThrow()
  })
})
