import { getTimeStamp } from "./index";

const buildMessage = (message: string, type: string, namespace?: string) =>
  `[${getTimeStamp()}] [${type}] ${
    namespace ? `[${namespace}]` : ""
  } [${message}]`;

const info = (message: string, namespace?: string): string => {
  const INFO = buildMessage(message, "INFO", namespace);
  console.info(INFO);
  return INFO;
};

const error = (message: string, namespace?: string): string => {
  const ERROR = buildMessage(message, "ERROR", namespace);
  console.error(ERROR);
  return ERROR;
};

const log = {
  info,
  error,
};

export default log;
