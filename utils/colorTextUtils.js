import { COLORS } from './constants.js'

export const colorText = (text, color) => {
  const colorToPrint = COLORS[color]
  const colorToUse = colorToPrint || COLORS.white

  return `${colorToUse}${text}\u001b[0m`
}

export const printErrorText = (text) => {
  console.log(colorText(text, 'red'))
}