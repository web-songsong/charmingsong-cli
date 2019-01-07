const gitDownload = require('download-git-repo')
const logger = require('../lib/logger')

function downloadtemplate(template) {
  gitDownload(
    `web-songsong/${template}`,
    process.cwd(),
    { clone: true },
    err => {
      if (err) {
        logger.fatal(err)
      }
    }
  )
}

module.exports = {
  downloadtemplate
}
