import { COLORS } from './constants.js'

export const colorText = (text, color) => {
  const colorToPrint = COLORS[color]
  const colorToUse = colorToPrint || COLORS.white
console.log(colorToUse)
  return `${colorToUse}${text}\u001b[0m`
}

export const printRedErrorText = (text) => {
  console.log(colorText(text, 'red'))
}