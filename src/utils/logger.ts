import { getISOStringDate } from "./index";

const buildMessage = (message: string, type: string, data?: string) =>
  `[${getISOStringDate()}] [${type}] ${data ? `[${data}]` : ""} [${message}]`;

const info = (message: string, data?: string): string => {
  const INFO = buildMessage(message, "INFO", data);
  console.info(INFO);
  return INFO;
};

const error = (message: string, data?: string): string => {
  const ERROR = buildMessage(message, "ERROR", data);
  console.error(ERROR);
  return ERROR;
};

const log = {
  info,
  error,
};

export default log;
