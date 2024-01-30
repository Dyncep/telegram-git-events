export const exitWithError = (errorMessage: string, returnCode: number = 1) => {
  console.error(errorMessage);
  process.exit(returnCode);
};
