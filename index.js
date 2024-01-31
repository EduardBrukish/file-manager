import { argv } from 'node:process'
import readlinePromises from 'node:readline/promises'
import { colorText } from './utils/colorTextUtils.js'
import { printCurrentWorkingDirectory } from './utils/pathUtils.js'
import { handleUserInput } from './handlers/rootHandler.js'

// ToDO delete it after move logic
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const getUserName = (commandLineArguments) => {
  const [ userNameArgument ] = commandLineArguments.splice(2)
  const userName = userNameArgument && userNameArgument.replace('--', '')
  return userName
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
  printCurrentWorkingDirectory()

  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  process.chdir(dirPath)

  rl.on(`line`, async (line) => {
    await handleUserInput(line, dirPath, rl)
    printCurrentWorkingDirectory()
  })

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!\n`)
  })

  rl.on('error', () => console.log('By by my darling'))
}

await initFileManagerApp()
