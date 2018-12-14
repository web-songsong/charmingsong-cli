const path = require('path')

module.exports = {
  isLocalPath(tem) {
    return /^[./]|^\w:/.test(tem)
  },
  getTemplatePath(temPath) {
    return path.isAbsolute(temPath)
      ? temPath
      : path.normalize(path.join(process.cwd(), temPath))
  }
}
