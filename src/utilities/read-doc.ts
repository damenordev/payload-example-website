import fs from 'fs'
import path from 'path'

export const readDocFile = async () => {
  const filePath = path.resolve(process.cwd(), 'public', 'doc.pdf')
  return fs.readFileSync(filePath)
}
