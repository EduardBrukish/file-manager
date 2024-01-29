import { rm } from 'fs/promises'
import { join } from 'path'

const deleteFile = async () => {
  const fileDirectory = getDirname(import.meta.url)
  const filePathToDelete = join(fileDirectory, 'files', 'fileToRemove.txt')

  try {
      await rm(filePathToDelete)
  } catch (e) {
      throw new Error('Failed to remove file')
  }
}

export const handleUserBasicOperation = (operationType, basicOperationArguments) => {
  switch (operationType) {
    case 'cat': 
      console.log(basicOperationArguments)
      break
    case 'add': 
    console.log(basicOperationArguments)
      break
    case 'rn': 
    console.log(basicOperationArguments)
      break
    case 'cp': 
    console.log(basicOperationArguments)
      break
    case 'mv': 
    console.log(basicOperationArguments)
      break
    case 'rm': 
    console.log(basicOperationArguments)
      break
    default:
      console.log('Sorry, you used invalid argument for Basic Operation cmdlet')
  } 

}