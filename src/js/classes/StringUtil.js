
export function upperCaseFirstIfLetter (string) {
  if (string) {
    const stringRegex = /^\D/
    const regex = new RegExp(stringRegex)

    if (regex.test(string)) {
      const first = string.slice(0, 1)
      const stelse = string.slice(1, string.length)
      return first.toUpperCase() + stelse
    }
    return string
  }
  return ''
}
