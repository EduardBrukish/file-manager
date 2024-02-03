import { chdir, cwd } from 'node:process'
import { dirname, normalize } from 'path'
import { readdir } from 'node:fs/promises';
import { printErrorText } from '../utils/colorTextUtils.js'

const goFolderUp = () => {
  try {
    const currentWorkingDirectoryPath = cwd()
    const parentDirectoryPath = dirname(currentWorkingDirectoryPath)
    
    chdir(parentDirectoryPath)
  } catch {
    printErrorText("You can't go upper")
  }
}

const navigateToFolder = (navigationOperationArguments) => {
  try {
    const [destinationFolder] = navigationOperationArguments
    const destinationFolderPath = normalize(destinationFolder)
    
    chdir(destinationFolderPath)
  } catch {
    printErrorText("Please check your path")
  }
}

const printFolderContent = async () => {
  try {
    const currentWorkingDirectoryPath = cwd()
    
    const files = await readdir(currentWorkingDirectoryPath, {withFileTypes: true})

    const result = Object.values(files)
      .sort((a, b) => {
        if(a.isFile() && !b.isFile()) {
          return 1
        }

        if((a.isFile() && b.isFile()) || (!a.isFile() && !b.isFile())) {
          return a.name - b.name
        }

        if(!a.isFile() && b.isFile()) {
          return -1
        }

        return 0

      })
      .map((file) => ({ Name: file.name, Type: file.isFile ? 'file' : 'directory'}))

    console.table(result)
  } catch {
    printErrorText("Error occurred during reading folder structure")
  }
}

export const handleNavigationOperation = async (operationType, navigationOperationArguments) => {
  try {
    switch (operationType) {
      case 'up': 
        goFolderUp()
        break
      case 'cd': 
        navigateToFolder(navigationOperationArguments)
        break
      case 'ls': 
        await printFolderContent()
        break
      default:
        printErrorText('Sorry, you used invalid argument for Navigation Operation cmdlet')
    } 
  } catch (e) {
    printErrorText('Error occurred for Navigation Operation cmdlet')
  }
}
