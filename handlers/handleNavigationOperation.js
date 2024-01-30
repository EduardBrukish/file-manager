

export const handleNavigationOperation = (operationType, basicOperationArguments, currentDirectoryPath) => {
  try {
    switch (operationType) {
      // case 'up': 
      //   await readFileByPath(currentDirectoryPath, basicOperationArguments)
      //   break
      // case 'cd': 
      //   await createFile(currentDirectoryPath, basicOperationArguments)
      //   break
      // case 'ls': 
      //   await renameFile(currentDirectoryPath, basicOperationArguments)
      //   break
      default:
        console.log('Sorry, you used invalid argument for Navigation Operation cmdlet')
    } 
  } catch {
    console.log('Error occurred for Basic Operation cmdlet')
  }
}