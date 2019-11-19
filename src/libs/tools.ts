
import axios from 'axios'
import ora from 'ora'
import gitDownload from 'download-git-repo'
import { join } from 'path'
import userHome from 'user-home'
import { existsSync } from 'fs'
import rimraf from 'rimraf'
import Metalsmith from 'metalsmith'
import Handlebars from 'handlebars'
import { metaJson, remoteUrl, cliTemplate } from '../../cs-config.json'
import Logger from '../utils/logger'

interface MetaInfoMust {
  template: string

  [prop: string]: any
}

/**
 * get metaUrl
 */
export async function getMetaJson() {
  !metaJson && Logger.fatal('err: cs-config metaUrl empty!')
  const spinner = ora('get cli list info').start()
  const metaData = await axios.get(metaJson)
  spinner.stop()
  return metaData.data
}

/**
 * download target template
 * @param templateName
 */
export async function downTemplate(templateName: string) {
  const userHomePath = join(
    userHome,
    cliTemplate,
    templateName.replace(/[\/:]/g, '-'),
  )
  const gitSite = `direct:${remoteUrl}/${templateName}`
  const spinner = ora('downloading template').start()

  return new Promise((resolve, reject) => {
    existsSync(userHomePath) && rimraf.sync(userHomePath)
    gitDownload(gitSite, userHomePath, { clone: true }, (err: Error) => {
      err && reject(err)
      spinner.stop()
      resolve(userHomePath)
    })
  }).catch((reason) => Logger.fatal(reason))
}

export async function writeTemplate(
  templatePath: string,
  metaInfo: MetaInfoMust,
  targetPath: string,
) {
  return new Promise((resolve, reject) => {
    const spinner = ora('write in template').start()
    Metalsmith(targetPath)
      .metadata(metaInfo)
      .source(join(templatePath, 'template'))
      .clean(false)
      .destination('.')
      .use((files: any, metalsmith: any, done: any) => {
        Object.keys(files).forEach((fileName) => {
          const reg: any = /\w+$/
          if (['ico', 'jpg', 'png', 'gif', 'tif', 'psd', 'raw', 'vue', 'tsx', 'jsx'].includes(reg.exec(
            fileName,
          )[0])) return
          const str = files[fileName].contents.toString()
          files[fileName].contents = Buffer.from(
            Handlebars.compile(str)(metalsmith.metadata()),
          )
        })
        done()
      })
      .build((err: Error) => {
        err && reject(err)
        spinner.stop()
        resolve(true)
      })
  }).catch((reason) => Logger.fatal(reason))
}
