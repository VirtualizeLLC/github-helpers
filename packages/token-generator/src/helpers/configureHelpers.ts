import { writeFile, stat } from 'fs/promises'
import { resolve } from 'path'
import prettier from 'prettier'
import { ConfigurationFileSchema } from '../types/configurationFileTypes'
import { execSync } from 'child_process'

const exists = async (filePath: string) => {
  try {
    await stat(filePath)
    return true
  } catch (error) {
    return false
  }
}

type GenerateFileParams = {
  data: ConfigurationFileSchema
  debug?: boolean // for debugging the generated file
  json: boolean // for creating a json file instead of a ts file
}

const defaultConfigPath = resolve(__dirname, '.@vllc/token-generator')

const createConfigPath = async (filePath: string = defaultConfigPath) => {
  if (!(await exists(filePath))) {
    execSync(`mkdir -p ${filePath}`)
  }
}

export const createConfigFile = async ({
  fileData: configurationFileSchema,
  debug = false,
  json = false,
}) => {
  await createConfigPath()

  const filePath = resolve('')
  if (!(await exists(filePath))) return

  const data: ConfigurationFileSchema = {
    /**
     * Add any user tokens here
     */
    users: [],
    /**
     * You can manually add any organization tokens here
     */
    organizations: [],
    enterprise: undefined,
  }

  const formatedString = await prettier.format(JSON.stringify(data), {
    parser: json ? 'json' : 'typescript',
    writeFile: false,
  })

  const file = await writeFile(filePath, formatedString, 'utf-8')
}

export const injectSecurityTokens = () => {
  return
}

export const writeToSecureStorage = () => {
  return
}

export const readFile = async () => {
  return
}
