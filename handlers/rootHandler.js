import { cwd } from 'node:process'
import { handleUserOperationSystem } from './operatingSystemHandlers.js'
import { handleUserBasicOperation } from './basicOperationHandlers.js'
import { handleNavigationOperation } from './navigationOperationHandlers.js'
import { calculateHash } from './hashOperationHandlers.js'
import { handleZipOperation } from './zipOperationHandlers.js'
import { printErrorText } from '../utils/colorTextUtils.js'
import { BASIC_OPERATIONS, NAVIGATION_OPERATIONS, ZIP_OPERATIONS } from '../utils/constants.js'

export const handleUserInput = async (userInput, readLine) => {
  const [operationType, ...args] = userInput.trim().split(/\s+/g)
  const currentDirectory = cwd()

  try {
    switch (operationType) {
      case 'os':
        handleUserOperationSystem(args)
        break
      case BASIC_OPERATIONS[operationType]:
        await handleUserBasicOperation(operationType, args, currentDirectory)
        break
      case NAVIGATION_OPERATIONS[operationType]:
        await handleNavigationOperation(operationType, args, currentDirectory)
        break
      case ZIP_OPERATIONS[operationType]:
        await handleZipOperation(operationType, args)
        break
      case 'hash':
        await calculateHash(args)
        break
      case '.exit':
        readLine.close();
        break
      default:
        printErrorText('Please check your input. You used wrong cmdlet')
    }
  } catch {
    printErrorText('Please check your input')
  }
}