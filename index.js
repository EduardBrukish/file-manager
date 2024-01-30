import { argv } from 'node:process'
import readlinePromises from 'node:readline/promises'
import { handleUserOperationSystem } from './handlers/operatingSystemHandlers.js'
import { handleUserBasicOperation } from './handlers/basicOperationHandlers.js'
import { handleNavigationOperation } from './handlers/handleNavigationOperation.js'
import { BASIC_OPERATIONS, NAVIGATION_OPERATIONS } from './utils/constants.js'
import { colorText } from './utils/colorTextUtils.js'

// ToDO delete it after move logic
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const getUserName = (commandLineArguments) => {
  const [ userNameArgument ] = commandLineArguments.splice(2)
  const userName = userNameArgument && userNameArgument.replace('--', '')
  return userName
}

const handleUserInput = async (userInput, currentDirectory, readLine) => {
  const [operationType, ...args] = userInput.trim().split(/\s+/g)

  try {
    switch (operationType) {
      case 'os':
        handleUserOperationSystem(args)
        break
      case BASIC_OPERATIONS[operationType]:
        await handleUserBasicOperation(operationType, args, currentDirectory)
        break
      case NAVIGATION_OPERATIONS[operationType]:
        handleNavigationOperation(operationType, args, currentDirectory)
        break
      case '.exit':
        readLine.close();
        break
      default:
        console.log('Check please your input')
    }
  } catch {
    console.log('Check please your input')
  }
}

const initFileManagerApp = async () => {
  const userName = getUserName(argv)

// ToDO delete it after move logic
  const filePath = fileURLToPath(import.meta.url)
  const dirPath = dirname(filePath)

  if (!userName) {
    const errorMessage = `Invalid username argument.\n Please start File Manager with command: "npm run start -- --username=your_username" \n` 
    throw new Error(errorMessage)
  }

  console.log(colorText(`Welcome to the File Manager, ${userName}! \n`, 'green'))
  console.log(colorText(`You are currently in ${dirPath}`, 'cyan'))

  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.on(`line`, async (line) => {
    console.log(colorText(`\nYou are currently in ${dirPath} \n`, 'cyan'))
    await handleUserInput(line, dirPath, rl)
  })

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!\n`)
  })

  rl.on('error', () => console.log('By by my darling'))
}

await initFileManagerApp()
