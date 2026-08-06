/**
 * Centralized Application Logger Utility
 * Provides structured log formatting with ISO timestamps and log level indicators.
 */
class Logger {
  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  _formatMessage(level, message, meta = null) {
    const timestamp = new Date().toISOString();
    const metaString = meta ? ` | Details: ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}${metaString}`;
  }

  info(message, meta) {
    console.log(this._formatMessage('info', message, meta));
  }

  warn(message, meta) {
    console.warn(this._formatMessage('warn', message, meta));
  }

  error(message, errorOrMeta) {
    let meta = errorOrMeta;
    if (errorOrMeta instanceof Error) {
      meta = {
        name: errorOrMeta.name,
        message: errorOrMeta.message,
        ...(this.isProduction ? {} : { stack: errorOrMeta.stack }),
      };
    }
    console.error(this._formatMessage('error', message, meta));
  }

  debug(message, meta) {
    if (!this.isProduction) {
      console.debug(this._formatMessage('debug', message, meta));
    }
  }
}

export const logger = new Logger();
