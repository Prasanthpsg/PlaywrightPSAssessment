const timestamp = (): string => new Date().toISOString();

export const logger = {
  info: (message: string): void => {
    console.info(`[INFO]  ${timestamp()} - ${message}`);
  },

  warn: (message: string): void => {
    console.warn(`[WARN]  ${timestamp()} - ${message}`);
  },

  error: (message: string): void => {
    console.error(`[ERROR] ${timestamp()} - ${message}`);
  },

  step: (message: string): void => {
    console.log(`  → ${message}`);
  },

  debug: (message: string): void => {
    if (process.env.DEBUG === 'true') {
      console.debug(`[DEBUG] ${timestamp()} - ${message}`);
    }
  },
};
