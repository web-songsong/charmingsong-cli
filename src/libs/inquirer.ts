import * as inquirer from 'inquirer'
const prompt = inquirer.createPromptModule()

export const handlePrompt = (metaInit: any) => prompt(metaInit)
