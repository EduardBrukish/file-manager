
import { cwd } from 'node:process'
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib'
import { join } from 'path'
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs'
import { printRedErrorText } from '../utils/colorTextUtils.js'

const compressFile = async (compressArguments) => {
  try {
    const currentWorkingDirectoryPath = cwd()
    const [fileName, destinationFileName] = compressArguments
    const filePathToCompress = join(currentWorkingDirectoryPath, fileName)
    const compressedFilePath = join(currentWorkingDirectoryPath, destinationFileName)

    const gzip = createBrotliCompress()
    const source = createReadStream(filePathToCompress)
    const destination = createWriteStream(compressedFilePath)

    await pipeline(source, gzip, destination)
  } catch {
    printRedErrorText("Failed to compress file. Please check your arguments")
  }
};

const decompressFile = async (decompressArguments) => {
  try {
    const currentWorkingDirectoryPath = cwd()
    const [fileName, destinationFileName] = decompressArguments
    const filePathToDecompress = join(currentWorkingDirectoryPath, fileName)
    const decompressedFilePath = join(currentWorkingDirectoryPath, destinationFileName)

    const unzip = createBrotliDecompress()
    const source = createReadStream(filePathToDecompress)
    const destination = createWriteStream(decompressedFilePath)

    await pipeline(source, unzip, destination)
  } catch {
    printRedErrorText("Failed to decompress file. Please check your arguments")
  }
}

export const handleZipOperation = async (operationType, zipOperationArguments) => {
  try {
    switch (operationType) {
      case 'compress': 
        await compressFile(zipOperationArguments)
        break
      case 'decompress': 
        await decompressFile(zipOperationArguments)
        break
      default:
        console.log('Sorry, you used invalid argument for Zip Operation cmdlet')
    } 
  } catch (e) {
    console.log('Error occurred for Zip Operation cmdlet')
  }
}