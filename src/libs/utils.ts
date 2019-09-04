import * as gitDownload from 'download-git-repo'
import * as path from 'path'
import * as ora from 'ora'
import * as userHome from 'user-home'
import * as Handlebars from 'handlebars'
import * as Metalsmith from 'metalsmith'

import Logger = require('./logger')

/**
 * 下载github上的模板文件
 *
 * @export
 * @param {string} template
 * @returns
 */
export function downLoadtempalte(template: string) {
  const spinner = ora('downloading template')
  return new Promise((resolve, reject) => {
    const targetPath = path.join(
      userHome,
      '.charmingsong-vue-template',
      template.replace(/[\/:]/g, '-')
    )
    spinner.start()
    gitDownload(`web-songsong/${template}`, targetPath, (err: any) => {
      spinner.stop()
      if (err) {
        Logger.fatal(err)
      }
      resolve(targetPath)
    })
  })
}

export function otputTemplate(temsPath: string, metainfo: any) {
  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd())
      .metadata(metainfo)
      .source(path.join(temsPath, 'template'))
      .clean(false)
      .destination('.')
      .use((files: any, metalsmith: any, done: () => void) => {
        Object.keys(files).forEach(fileName => {
          const str = files[fileName].contents.toString()
          console.log('metalsmith.metadata()', metalsmith.metadata())
          files[fileName].contents = new Buffer(
            Handlebars.compile(str)(metalsmith.metadata())
          )
        })
        done()
      })
      .build((err: any) => {
        if (err) {
          Logger.fatal(err)
        }
        resolve(true)
      })
  })
}
