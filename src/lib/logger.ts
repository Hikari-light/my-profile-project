// 检查是否在服务器端运行
const isServer = typeof window === 'undefined';

// 定义日志级别
enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  HTTP = 'HTTP',
  DEBUG = 'DEBUG',
}

// 根据环境选择日志级别
const getLogLevel = (): LogLevel => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'development' ? LogLevel.DEBUG : LogLevel.WARN;
};

// 格式化日志消息
const formatMessage = (level: LogLevel, message: string, meta?: unknown): string => {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] ${level}: ${message}${metaStr}`;
};

// 创建日志函数
const logger = {
  error: (message: string, meta?: unknown): void => {
    const formattedMessage = formatMessage(LogLevel.ERROR, message, meta);
    if (isServer) {
      // 服务器端：输出到控制台
      console.error(formattedMessage);
    } else {
      // 客户端：输出到控制台
      console.error(message, meta);
    }
  },

  warn: (message: string, meta?: unknown): void => {
    const formattedMessage = formatMessage(LogLevel.WARN, message, meta);
    if (isServer) {
      console.warn(formattedMessage);
    } else {
      console.warn(message, meta);
    }
  },

  info: (message: string, meta?: unknown): void => {
    const formattedMessage = formatMessage(LogLevel.INFO, message, meta);
    if (isServer) {
      console.info(formattedMessage);
    } else {
      console.info(message, meta);
    }
  },

  http: (message: string, meta?: unknown): void => {
    const formattedMessage = formatMessage(LogLevel.HTTP, message, meta);
    if (isServer) {
      console.log(formattedMessage);
    } else {
      console.log('HTTP:', message, meta);
    }
  },

  debug: (message: string, meta?: unknown): void => {
    if (getLogLevel() === LogLevel.DEBUG) {
      const formattedMessage = formatMessage(LogLevel.DEBUG, message, meta);
      if (isServer) {
        console.debug(formattedMessage);
      } else {
        console.debug(message, meta);
      }
    }
  },
};

export default logger; 