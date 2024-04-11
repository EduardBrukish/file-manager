import { argv } from 'node:process'
import { homedir } from 'os'
import { printCurrentWorkingDirectory } from '../utils/pathUtils.js'
import { colorText } from '../utils/colorTextUtils.js'

const getUserName = (commandLineArguments) => {
  const [ userNameArgument ] = commandLineArguments.splice(2)
  const userNameArguments = userNameArgument && userNameArgument.split('=')
  return userNameArguments[0].includes('username') ? userNameArguments[1] : null
}

export const initAppHandler = () => {
  const userName = getUserName(argv)
  const errorMessage = `\n Invalid username argument.\n Please start File Manager with command: "npm run start -- --username=your_username" \n` 

  try {
    if (!userName) {
      throw new Error(errorMessage)
    }
  
    console.log(colorText(`Welcome to the File Manager, ${userName}! \n`, 'green'))

    const homeDirectory = homedir()
    process.chdir(homeDirectory)
    printCurrentWorkingDirectory()
  
    return userName
  } catch {
    throw new Error(errorMessage)
  }

}