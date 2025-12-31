import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const getAbsolutePath = (filepath) => {
  return path.isAbsolute(filepath)
    ? filepath
    : path.resolve(process.cwd(), filepath)
}

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)

  return fs.readFileSync(absolutePath, 'utf-8')
}

const getFormat = (filepath) => {
  const ext = path.extname(filepath).toLowerCase()

  return ext.slice(1)
}

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data)
    case 'yaml':
      return yaml.load(data)
    default:
      throw new Error(`формат не поддерживается: ${format}`)
  }
}

export const getDataFromFile = (filepath) => {
  const data = readFile(filepath)
  const format = getFormat(filepath)

  return parse(data, format)
}
