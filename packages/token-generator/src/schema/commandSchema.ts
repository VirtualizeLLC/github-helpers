import { z } from 'zod'

export const configureSchema = z.object({
  preview: z.optional(z.boolean()),
  json: z.optional(z.boolean()),
})
