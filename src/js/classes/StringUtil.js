'use strict'

export function upperCaseFirstIfLetter (string) {
  if (string) {
    let stringRegex = /^\D/
    let regex = new RegExp(stringRegex)

    if (regex.test(string)) {
      let first = string.slice(0, 1)
      let stelse = string.slice(1, string.length)
      return first.toUpperCase() + stelse
    }
    return string
  }
  return ''
}
