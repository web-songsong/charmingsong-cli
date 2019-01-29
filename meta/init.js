module.exports = {
  prompts: [
    {
      type: 'list',
      message: '选择模板(select template)',
      choices: ['templates-ui'],
      name: 'template'
    },
    {
      type: 'input',
      message: '项目名称(project name)',
      name: 'projectName',
      default: 'myProject'
    },
    {
      type: 'input',
      message: '简介(description)',
      name: 'description'
    },
    {
      type: 'input',
      message: '版本号(version)',
      default: '0.0.1',
      name: 'version'
    }
  ]
}
