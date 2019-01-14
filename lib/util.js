const gitDownload = require('download-git-repo')
const logger = require('../lib/logger')
const ora = require('ora')
const userHome = require('user-home')
const path = require('path')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')

function downloadtemplate(template) {
  const spinner = ora('downloading template')
  return new Promise((resolve, reject) => {
    const tep = path.join(
      userHome,
      '.charmingsong-vue-template',
      template.replace(/[\/:]/g, '-')
    )
    spinner.start()
    gitDownload(`web-songsong/${template}`, tep, err => {
      spinner.stop()
      if (err) {
        logger.fatal('util.js->downloadtemplate:    %s', err)
        reject(err)
      }
      logger.success('success')
      resolve(tep)
    })
  })
}
function otputTemplate(dir, name = 'myProject', prompt) {
  const meta = require(path.join(dir, 'meta.js'))
  prompt(meta.prompts)

  // Metalsmith(process.cwd())
  //   .metadata({ name: 'songsong' })
  //   .source('./haha/')
  //   .clean(false)
  //   .destination('.')
  //   .use((files, metalsmith, done) => {
  //     Object.keys(files).forEach(fileName => {
  //       const str = files[fileName].contents.toString()
  //       files[fileName].contents = new Buffer(
  //         Handlebars.compile(str)(metalsmith.metadata())
  //       )
  //     })

  //     done()
  //   })
  //   .build(err => {
  //     if (err) {
  //       return console.log('err', err)
  //     }
  //     console.log('success')
  //   })
}

module.exports = {
  downloadtemplate,
  otputTemplate
}
