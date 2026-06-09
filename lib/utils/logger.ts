type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const COLORS = {
  info: '\x1b[32m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
  debug: '\x1b[36m',
  reset: '\x1b[0m',
};

function formatMessage(level: LogLevel, message: string, context?: any) {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
  return `${COLORS[level]}[${level.toUpperCase()}]${COLORS.reset} ${timestamp} - ${message}${contextStr}`;
}

export const logger = {
  info: (message: string, context?: any) => {
    console.info(formatMessage('info', message, context));
  },
  warn: (message: string, context?: any) => {
    console.warn(formatMessage('warn', message, context));
  },
  error: (message: string, context?: any) => {
    console.error(formatMessage('error', message, context));
  },
  debug: (message: string, context?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(formatMessage('debug', message, context));
    }
  },
};
