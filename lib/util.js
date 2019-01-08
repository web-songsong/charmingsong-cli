const gitDownload = require('download-git-repo')
const logger = require('../lib/logger')
const ora = require('ora')

function downloadtemplate(template) {
  const spinner = ora('downloading template')
  spinner.start()
  gitDownload(`web-songsong/${template}`, process.cwd(), err => {
    spinner.stop()
    if (err) {
      logger.fatal('util.js->downloadtemplate:    %s', err)
    }
    logger.success('success')
  })
}

module.exports = {
  downloadtemplate
}
