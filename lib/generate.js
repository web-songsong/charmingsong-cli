const getOptions = require('./options') /* 获取配置的方法 */
const aks = require('./aks') /* 询问用户的方法 */
const Metalsmith = require('metalsmith') /* 静态生成器 */
const Handlebars = require('handlebars') /* 模板 */
const path = require('path')

module.exports = (name, src, dest, done) => {
  const opts = getOptions(name, src) /* 获取配置 */
  const metalsmith = Metalsmith(path.join(src, 'template'))
  const data = Object.assign(metalsmith.metadata(), {
    destdirName: name,
    inPlace: dest === process.cwd(),
    noEscape: true
  })

  opts.helpers &&
    Object.keys(opts.helpers).map(key => {
      Handlebars.registerHelper(key, opts.helpers[key])
    })
  metalsmith
    .use(aksQuestions(opts.prompts))
    .source('.')
    .destination(dest)
    .build((err, files) => {
      if (err) done(err)
    })
}
/**
 *提示用户方法
 *
 * @param {*} prompts
 * @returns
 */
function aksQuestions(prompts) {
  return (files, metalsmith, done) => {
    aks(prompts, metalsmith.metadata(), done)
  }
}
