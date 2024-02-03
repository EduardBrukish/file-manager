import { createReadStream } from 'node:fs'
import { cwd } from 'node:process'
import { createHash } from 'node:crypto'
import { pipeline } from 'node:stream/promises'
import { join } from 'path'
import { printRedErrorText } from '../utils/colorTextUtils.js'

export const calculateHash = async (fileArguments) => {
  try {
    const [filePathCalculateHash] = fileArguments
    const currentWorkingDirectoryPath = cwd()
    const pathToCalculateHash = join(currentWorkingDirectoryPath, filePathCalculateHash)

    const input = createReadStream(pathToCalculateHash)
    const hash = createHash('sha256')

    await pipeline(input, hash)

    console.log(hash.digest('hex'))
  } catch (e) {
    printRedErrorText("Failed to create hash. Please check your path")
  }
}