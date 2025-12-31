export const formatStylish = (diffLines) => {
  const lines = diffLines.map(line => `  ${line}`)

  return `{\n${lines.join('\n')}\n}`
}
