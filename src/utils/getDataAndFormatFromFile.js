import fs from 'fs'
import path from 'path'

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

export const getDataAndFormatFromFile = (filepath) => {
  const data = readFile(filepath)
  const format = getFormat(filepath)

  return { data, format }
}
