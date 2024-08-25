import { z } from 'zod'
import { configurationFileSchema } from '../schema/configureFileSchema'

export type ConfigurationFileSchema = z.infer<typeof configurationFileSchema>
