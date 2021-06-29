import { getTimeStamp } from "./index";

const info = (message: string): string => {
  const INFO = `[${getTimeStamp()}] [INFO] [${message}]`;
  console.info(INFO);
  return INFO;
};

const error = (message: string): string => {
  const ERROR = `[${getTimeStamp()}] [ERROR] [${message}]`;
  console.error(ERROR);
  return ERROR;
};

export default {
  info,
  error,
};
