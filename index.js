import readlinePromises from 'node:readline/promises'
import { printCurrentWorkingDirectory } from './utils/pathUtils.js'
import { initAppHandler } from './handlers/initAppHandler.js'
import { handleUserInput } from './handlers/rootHandler.js'

const initFileManagerApp = async () => {
  const userName = initAppHandler()

  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.on(`line`, async (line) => {
    await handleUserInput(line, rl)
    printCurrentWorkingDirectory()
  })

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!\n`)
  })

  rl.on('error', () => console.log('An unknown error has occurred'))
}

await initFileManagerApp()
