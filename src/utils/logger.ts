type LogLevel = 'info' | 'warn' | 'error';

const timestamp = (): string => new Date().toISOString();

const log = (level: LogLevel, message: string, meta?: Record<string, unknown>): void => {
  const entry = {
    timestamp: timestamp(),
    level,
    message,
    ...(meta && { meta }),
  };

  const output = JSON.stringify(entry);

  if (level === 'error') {
    console.error(output);
  } else {
    console.log(output);
  }
};

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => log('info', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => log('warn', message, meta),
  error: (message: string, meta?: Record<string, unknown>) => log('error', message, meta),
};