import { ICommandExec } from '../../core/executor/command.types';
import { ISize } from '../../common';

export default class FfmpegCommandBuilder {
  private command = 'ffmpeg';
  private _inputPath = '/';
  private _outputPath = 'res.mp4';
  private options: Map<string, string> = new Map();

  constructor(inputPath: string, outputPath?: string) {
    this.options.set('-c:v', 'libx264');
    this._inputPath = inputPath;
    if (outputPath) {
      this._outputPath = outputPath;
    }
  }

  input(str: string): this {
    this._inputPath = str;
    return this;
  }

  setSize({ width, height }: ISize): this {
    this.options.set('-s', `${width}x${height}`);
    return this;
  }

  output(path: string): this {
    this._outputPath = path;
    return this;
  }

  addParam(key: string, value: string): this {
    this.options.set(key, value);
    return this;
  }

  build(): ICommandExec {
    const additionalArgs: string[] = [];
    this.options.forEach((v, k) => {
      additionalArgs.push(k);
      additionalArgs.push(v);
    });
    return {
      command: this.command,
      args: [
        '-i',
        this._inputPath,
        ...additionalArgs,
        this._outputPath,
      ],
    };
  }
}
