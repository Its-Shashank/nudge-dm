type LogLevel = "info" | "warn" | "error";

const log = (level: LogLevel, message: string, meta?: any) => {
  const timestamp = new Date().toISOString();
  const metaString = meta ? ` | ${JSON.stringify(meta)}` : "";
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}${metaString}`);
};

export const logger = {
  info: (message: string, meta?: any) => log("info", message, meta),
  warn: (message: string, meta?: any) => log("warn", message, meta),
  error: (message: string, meta?: any) => log("error", message, meta),
};
