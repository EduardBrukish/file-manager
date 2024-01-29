import { argv } from 'node:process'
import readlinePromises from 'node:readline/promises'
import { homedir } from 'os'
import { handleUserOperationSystem } from './handlers/operatingSystemHandlers.js'
import { handleUserBasicOperation } from './handlers/basicOperationHandlers.js'
import { BASIC_OPERATIONS } from './utils/constants.js'

const getUserName = (commandLineArguments) => {
  const [ userNameArgument ] = commandLineArguments.splice(2)
  const userName = userNameArgument && userNameArgument.replace('--', '')
  return userName
}

const handleUserInput = async (userInput, currentDirectory) => {
  const [operationType, ...args] = userInput.trim().split(/\s+/g)

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
      console.log()
  }
}

const initFileManagerApp = async () => {
  const userName = getUserName(argv)
  let currentDirectory = homedir()

  if (!userName) {
    const errorMessage = `Invalid username argument.\n Please start File Manager with command: "npm run start -- --username=your_username" \n` 
    throw new Error(errorMessage)
  }

  console.log(`Welcome to the File Manager, ${userName}! \n`)

  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.on(`line`, async (line) => {
    await handleUserInput(line, currentDirectory)
    console.log(`You are currently in ${currentDirectory}`)
  })

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!\n`)
  })

  rl.on('error', () => console.log('By by my darling'))
}

await initFileManagerApp()
