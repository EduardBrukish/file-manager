import { homedir, userInfo, cpus, EOL, arch } from 'os'
import { printErrorText } from '../utils/colorTextUtils.js'

const printUserEOL = () => {
  console.log(`Your EOL: ${JSON.stringify(EOL)}`)
}

const printUserMachineCpuData = () => {
  const userMachineCpuData = cpus()
  const cpusCoresNumber = userMachineCpuData.length
  const cpusData = userMachineCpuData.map((cpu) => ({
    model: cpu.model,
    speed: `${(cpu.speed / 1000).toFixed(2)} GHz`
  }))

  console.log(`Your CPU number: \n`, cpusCoresNumber)
  console.log(`Your CPU data: \n`, cpusData)
}

const printUserHomeDirectory = () => {
  const userHomeDirectory = homedir()
  console.log(`Your home directory: ${userHomeDirectory}`)
}

const printUserName = () => {
  try {
    const currentUserInfo = userInfo()
    const {username} = currentUserInfo
    console.log(`User name: ${username.username}`)
  } catch (e) {
    printErrorText('Error occurred for Operating System operator')
  }
}

const printUserMachineCpuArchitecture = () => {
  const cpuArchitecture = arch()
  console.log(`Your CPU architecture: ${cpuArchitecture}`)
}

export const handleUserOperationSystem = (osArguments) => {
  const [flag] = osArguments || []

  switch (flag) {
    case '--EOL': 
      printUserEOL()
      break
    case '--cpus': 
      printUserMachineCpuData()
      break
    case '--homedir': 
      printUserHomeDirectory()
      break
    case '--username': 
      printUserName()
      break
    case '--architecture': 
      printUserMachineCpuArchitecture()
      break
    default:
      printErrorText('Sorry, you used invalid argument for Operating System cmdlet')
  } 
}
