import { Command } from 'commander'
import { ConfigurationSchema } from '../types/commandTypes'

export const configureCommand = new Command('configure')
  .description('Creates a configuration file')
  .option('--preview', 'Outputs a preview of the configuration')
  .option('--type <json|ts>')
  .action((str, options: ConfigurationSchema) => {
    if (options.preview) {
      return
    }
  })
