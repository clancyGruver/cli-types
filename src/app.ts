import FfmpegExecutor from './commands/ffmpeg/ffmpeg.executor';
import { IStreamLogger } from './core/handlers/stream-logger.interface';
import ConsoleLogger from './out/console/console.logger';

export default class App {
  constructor(private logger: IStreamLogger) {}

  run() {
    const exec = new FfmpegExecutor(this.logger);
    exec.execute();
  }
}

const app = new App(ConsoleLogger.Instanse);
app.run();
