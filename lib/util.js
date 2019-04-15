const gitDownload = require('download-git-repo')
const logger = require('../lib/logger')
const ora = require('ora')
const userHome = require('user-home')
const path = require('path')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')

function onError(err) {
  logger.fatal('***util.js***:    %s', err)
}

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
        onError(err)
        reject(err)
      }
      logger.success('下载成功')
      console.log()
      resolve(tep)
    })
  })
}

function otputTemplate(dir, prompt, Projectinfo) {
  const meta = require(path.join(dir, 'meta.js'))
  const templateMate = Array.isArray(meta.prompts)
    ? meta.prompts
    : Object.entries(meta.prompts).map(item => ({
        name: item[0],
        ...item[1]
      }))
  prompt(templateMate).then(aswers => {
    Metalsmith(process.cwd())
      .metadata(aswers)
      .source(path.join(dir, 'template'))
      .clean(false)
      .destination('.')
      .use((files, metalsmith, done) => {
        const data = Object.assign(metalsmith.metadata(), {
          ...Projectinfo
        })
        Object.keys(files).forEach(fileName => {
          const str = files[fileName].contents.toString()
          files[fileName].contents = new Buffer(Handlebars.compile(str)(data))
        })
        done()
      })
      .build(err => {
        if (err) {
          return onError(err)
        }
        logger.success('模板写入成功')
      })
  })
}

module.exports = {
  downloadtemplate,
  otputTemplate
}
