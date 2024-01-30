import { argv } from 'node:process'
import readlinePromises from 'node:readline/promises'
import { homedir } from 'os'
import { handleUserOperationSystem } from './handlers/operatingSystemHandlers.js'
import { handleUserBasicOperation } from './handlers/basicOperationHandlers.js'
import { BASIC_OPERATIONS } from './utils/constants.js'

// ToDO delete it after move logic
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const getUserName = (commandLineArguments) => {
  const [ userNameArgument ] = commandLineArguments.splice(2)
  const userName = userNameArgument && userNameArgument.replace('--', '')
  return userName
}

const handleUserInput = async (userInput, currentDirectory) => {
  const [operationType, ...args] = userInput.trim().split(/\s+/g)

  try {
    switch (operationType) {
      case 'os':
        handleUserOperationSystem(args)
        break
      case BASIC_OPERATIONS[operationType]:
        await handleUserBasicOperation(operationType, args, currentDirectory)
        break
      case '.exit':
        process.exit(1);
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

  console.log(`Welcome to the File Manager, ${userName}! \n`)
  console.log(`You are currently in ${dirPath}`)

  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.on(`line`, async (line) => {
    await handleUserInput(line, dirPath)
    console.log(`You are currently in ${dirPath}`)
  })

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!\n`)
  })

  rl.on('error', () => console.log('By by my darling'))
}

await initFileManagerApp()
