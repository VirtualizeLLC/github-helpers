import { z } from 'zod'
import { configureSchema } from '../schema/commandSchema'
export type ConfigurationSchema = z.infer<typeof configureSchema>
