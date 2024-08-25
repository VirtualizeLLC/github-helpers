import { createTokenAuth } from '@octokit/auth-token'

export const requestToken = async () => {
  createTokenAuth()
}
