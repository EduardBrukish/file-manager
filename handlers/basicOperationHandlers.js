import { rm, writeFile, rename } from 'fs/promises'
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join } from 'path'
import { printErrorText } from '../utils/colorTextUtils.js'

const deleteFile = async (currentDirectoryPath, deleteFileArguments) => {
  try {
    const [fileNameToDelete] = deleteFileArguments
    const filePathToDelete = join(currentDirectoryPath, fileNameToDelete)

    await rm(filePathToDelete)
  } catch {
    printErrorText('Error occurred during delete operation. Check please command params')
  }
}

const createFile = async (currentDirectoryPath, createFileArguments) => {
  try {
    const [fileName] = createFileArguments

    if(!fileName) {
      printErrorText('Invalid file name')
      return
    }

    const filePathToCreate = join(currentDirectoryPath, fileName)
  
    await writeFile(filePathToCreate, '', { flag: 'wx'})
  } catch {
    printErrorText('Error during file creation')
  }
}

const copyFile = async (currentDirectoryPath, copyFileArguments) => {
  try {
    const [fileNameToCopy, destinationFolderName] = copyFileArguments

    if(!fileNameToCopy || !destinationFolderName) {
      printErrorText('Invalid arguments to copy file')
      return
    }

    const filePathToCopy = join(currentDirectoryPath, fileNameToCopy)
    const destinationFilePath = join(currentDirectoryPath, destinationFolderName, fileNameToCopy)

    const readStream = createReadStream(filePathToCopy, { encoding: 'utf8' })
    const writeStream = createWriteStream(destinationFilePath)

    await pipeline(readStream, writeStream)
  } catch (e) {
    printErrorText('Invalid arguments to copy file')
  }
}

const readFileByPath = async (currentDirectoryPath, readFileArguments) => {
  try {
    const [fileNameToRead] = readFileArguments
    const filePathToRead = join(currentDirectoryPath, fileNameToRead)

    const fileData = await new Promise((res, rej) => {
      let readStream = createReadStream(filePathToRead, 'utf8')
      let chunk = ''

      readStream.on('data', (data) => {
          chunk = chunk + data
      })

      readStream.on('close', () => {
          res(chunk)
      })

      readStream.on('error', (e) => {
          rej(e)
      })

    })

    process.stdout.write(fileData)
  } catch {
    printErrorText('Error occurred during read file operation. Check please command params')
  }
};

const renameFile = async (currentDirectoryPath, renameFileArguments) => {
  try {
    const [filePathToRename, newFileName] = renameFileArguments
    const fileToRenamePath = join(currentDirectoryPath, filePathToRename)
    const properFileNamePath = join(currentDirectoryPath, newFileName)

    await rename(fileToRenamePath, properFileNamePath)
  } catch {
    printErrorText('Error occurred during read file operation. Check please command params')
  }
};

const moveFile = async (currentDirectoryPath, moveFileArguments) => {
  try {
    await copyFile(currentDirectoryPath, moveFileArguments)
    await deleteFile(currentDirectoryPath, moveFileArguments)
  } catch {
    printErrorText('Error occurred during move file operation. Check please command params')
  }  
}

export const handleUserBasicOperation = async (operationType, basicOperationArguments, currentDirectoryPath) => {
  try {
    switch (operationType) {
      case 'cat': 
        await readFileByPath(currentDirectoryPath, basicOperationArguments)
        break
      case 'add': 
        await createFile(currentDirectoryPath, basicOperationArguments)
        break
      case 'rn': 
        await renameFile(currentDirectoryPath, basicOperationArguments)
        break
      case 'cp': 
        await copyFile(currentDirectoryPath, basicOperationArguments)
        break
      case 'mv': 
        await moveFile(currentDirectoryPath, basicOperationArguments)
        break
      case 'rm': 
        await deleteFile(currentDirectoryPath, basicOperationArguments)
        break
      default:
        printErrorText('Sorry, you used invalid argument for Basic Operation cmdlet')
    } 
  } catch {
    printErrorText('Error occurred for Basic Operation cmdlet')
  }
}
