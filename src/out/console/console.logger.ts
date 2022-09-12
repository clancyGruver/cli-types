import { IStreamLogger } from '../../core/handlers/stream-logger.interface';

export default class ConsoleLogger implements IStreamLogger {
  private static instance: ConsoleLogger;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static get Instanse() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  end(): void {
    console.log('Operation finished');
  }

  error(...args: any[]): void {
    console.error(args);
  }

  log(...args: any[]): void {
    console.log(args);
  }
}
