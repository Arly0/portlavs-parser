import { ErrorTypes } from "../interface/LoggerInterface"

export const Logger = (msg:any, type: ErrorTypes = ErrorTypes.Error) => {
  if (process.env.APP_DEBUG) {
    if (type === ErrorTypes.Error) {
      console.error(msg);
    } else if (type === ErrorTypes.Warning) {
      console.warn(msg);
    } else {
      console.info(msg);
    }
  }
}