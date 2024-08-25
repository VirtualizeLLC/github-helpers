import { z } from 'zod'
import { TokenTypes } from '../constants/tokenTypes'

const accessSchema = z.object({
  repos: z.optional(z.array(z.string())),
  allRepos: z.optional(z.boolean()),
})

const repoPermissionsSchema = z.object({})

const authToken = z.object({
  token: z.string(),
  access: accessSchema,
  repoPermissions: repoPermissionsSchema,
  accountPermissions: repoPermissionsSchema,
})

/**
 * A user can have separate org access tokens
 */
const userSchema = z.object({
  name: z.string(),
  token: z.string(),
  isOrgAccess: z.boolean(),
  // unknown if organizationName and organizationId is required, likely only id if it exists
  orgName: z.optional(z.string()),
  orgId: z.optional(z.string()),
  access: accessSchema,
  repoPermissions: repoPermissionsSchema,
  accountPermissions: repoPermissionsSchema,
  authToken,
})

const genericToken = z.literal(TokenTypes.Generic)
const tokenGenerator = z.literal(TokenTypes.AuthCreator)

const tokenTypes = z.union([
  z.literal(TokenTypes.Generic),
  z.literal(TokenTypes.AuthCreator),
])

/**
 * @todo all permissions for this schema
 */
const tokenAccessSchema = z.object({})

const organizationSchema = z.object({
  name: z.string(),
  token: z.string(),
  tokenGenerator: tokenGenerator,
})

const enterpriseSchema = z.object({
  name: z.string(),
  users: z.array(userSchema),
  organizations: z.array(userSchema),
})

/**
 * @description The main configurationFileSchema
 *
 * @users and @organizations all will have individual access tokens and creation tokens.
 * - Users and Organizations can be
 *
 * @enterpriseSchema gets no access tokens, but it has nested users and organizations
 * - furthermore is singular, there is no option to add additional enterprises as this is unsafe and should not be done on the same laptop.
 */
export const configurationFileSchema = z.object({
  users: z.array(userSchema),
  organizations: z.array(organizationSchema),
  enterpriseSchema: z.optional(enterpriseSchema),
})
