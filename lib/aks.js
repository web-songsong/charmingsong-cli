const async = require('async')
const inquirer = require('inquirer')

const promptMapping = {
  string: 'input',
  boolean: 'confirm'
}
module.exports = (prompts, metadata, done) => {
  async.eachSeries(
    Object.keys(prompts),
    (key, next) => {
      prompt(metadata, key, prompts[key], next)
    },
    done
  )
}

/**
 *提示功能
 *
 * @param {*} data
 * @param {*} key
 * @param {*} val
 * @param {*} done
 */
function prompt(metadata, key, val, done) {
  let promptDefault = val.default
  if (typeof val.default === 'function') {
    promptDefault = function() {
      return val.default.bind(this)(data)
    }
  }
  inquirer
    .prompt([
      {
        type: promptMapping[val.type] || val.type,
        name: key,
        message: val.message || key,
        default: val.default,
        choices: val.choices || [],
        validate: val.validate || (_ => true)
      }
    ])
    .then(answers => {
      if (Array.isArray(answers[key])) {
        metadata[key] = {}
        answers[key].forEach(multiChoiceAnswer => {
          metadata[key][multiChoiceAnswer] = true
        })
      } else {
        metadata[key] = answers[key]
      }
      done()
    })
    .catch(done)
}
