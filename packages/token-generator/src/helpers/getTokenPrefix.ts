import { TokenTypes } from './../constants/tokenTypes'

export const defaultTokenPrefix = 'generated'
export const getTokenPrefix = (prefix: string, tokenTypes: TokenTypes) =>
  `${prefix}_${tokenTypes}`
