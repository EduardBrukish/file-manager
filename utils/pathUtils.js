import { cwd } from 'node:process'
import { colorText } from './colorTextUtils.js'

export const printCurrentWorkingDirectory = () => {
  console.log(colorText(`\nYou are currently in ${cwd()} \n`, 'cyan'))
}