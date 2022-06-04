export const Logger = (msg:any) => {
  if (process.env.APP_DEBUG) {
    console.log(msg)
  }
}