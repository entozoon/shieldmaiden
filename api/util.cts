export const forwardSlashes = (string: string) =>
  string.replace(/\\\\/g, "/").replace(/\\/g, "/");

// Get the project dir, with unix style line endings
export const cwd = forwardSlashes(process.cwd() + (process.env.FORCEDIR || ""));
