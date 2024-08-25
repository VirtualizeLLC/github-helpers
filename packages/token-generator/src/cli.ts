#!/usr/bin/env node
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('@dotenvx/dotenvx').config()

import { Command } from 'commander'

/**
 * @warning NX makes funky paths
 * - this requires the build:copy:package-json command to function
 *  */
import packageJson from '../package.json'
import { configureCommand } from './commands/configureCommand'

const program = new Command()

program.description('cli for token-generator').version(packageJson.version)

const readCommand = new Command('generate').description(
  'Generates new tokens for the required repos, users, workspaces'
)

const generateCommand = new Command('generate').alias('g').action(() => {
  console.log('CALLED GENERATE')
  console.log({
    GITHUB_AUTH_FRE_MAIN: process.env.GITHUB_AUTH_FRE_MAIN,
  })
})

program.addCommand(readCommand)
program.addCommand(generateCommand)

program.addCommand(configureCommand)

program.parse()
