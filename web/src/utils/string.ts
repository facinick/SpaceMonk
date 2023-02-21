import { getCurrentUTCTime } from './misc'

const MAX_STRING_LENGTH = 250

function rgbToHex(rgb: string): string {
  // Remove the "rgb(" and ")" characters from the input string
  const rgbValues = rgb.slice(4, -1).split(',')

  // Convert the RGB values to decimal integers
  const r = parseInt(rgbValues[0].trim())
  const g = parseInt(rgbValues[1].trim())
  const b = parseInt(rgbValues[2].trim())

  // Convert the decimal RGB values to a hex string
  const hex = ((r << 16) | (g << 8) | b).toString(16)

  // Pad the hex string with leading zeros, if necessary
  return '#' + ('000000' + hex).slice(-6)
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function abbreviateNumberPlusMinus50Million(number: number): string {
  if (number > 50000000 || number < -50000000) {
    throw new Error('Number must be between -50M and 50M.')
  }

  const suffixes = ['', 'K', 'M']
  const suffixNum = Math.floor(('' + number).length / 3)
  let shortNumber = parseFloat(
    (suffixNum != 0 ? number / Math.pow(1000, suffixNum) : number).toFixed(2)
  )
  if (shortNumber % 1 !== 0) {
    shortNumber = Number(shortNumber.toFixed(1))
  }
  return shortNumber + suffixes[suffixNum]
}

function truncate(
  value: string | number,
  by = MAX_STRING_LENGTH
): [string, boolean] {
  let output = value?.toString() ?? ''

  let truncated = false

  if (output.length > by) {
    output = output.substring(0, by)
    truncated = true
  }

  return [output, truncated]
}

function formatTimeDifferenceFromNow(time: Date) {
  return formatTimeDifference(time, getCurrentUTCTime())
}

function formatTimeDifference(someTImeAgo: Date, now: Date): string {
  const diffMs = now.getTime() - someTImeAgo.getTime()

  const diffSecs = Math.round(diffMs / 1000)

  if (diffSecs < 60) {
    return `Just now`
  }

  const diffMins = Math.round(diffSecs / 60)
  if (diffMins < 60) {
    return `${diffMins} minutes ago`
  }

  const diffHours = Math.round(diffMins / 60)
  if (diffHours < 24) {
    return `${diffHours} hours ago`
  }

  if (diffHours < 72) {
    return `a couple days ago`
  }

  const diffDays = Math.round(diffHours / 24)
  if (diffDays < 7) {
    return `within a week`
  }

  return 'Long time ago'
}

export {
  rgbToHex,
  capitalizeFirstLetter,
  abbreviateNumberPlusMinus50Million,
  truncate,
  formatTimeDifferenceFromNow,
}
