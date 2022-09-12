import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import CommandExecutor from '../../core/executor/command.executor';
import { FfmpegInput } from './ffmpeg.types';
import { ICommandExec } from '../../core/executor/command.types';
import { IStreamLogger } from '../../core/handlers/stream-logger.interface';
import FfmpegCommandBuilder from './ffmpeg.builder';
import PromptService from '../../core/prompt/prompt.service';
import { deleteFileIfExist } from '../../core/files/file.servce';
import StreamHandler from '../../core/handlers/stream.handler';

export default class FfmpegExecutor extends CommandExecutor<FfmpegInput> {
  protected async prompt(): Promise<FfmpegInput> {
    const prompt = new PromptService();
    const inputPath = await prompt.input<string>({
      message: 'Enter input path',
      type: 'input',
    });
    const outputName = await prompt.input<string>({
      message: 'Enter output file name',
      type: 'input',
    });
    const width = await prompt.input<number>({
      message: 'Enter width',
      type: 'number',
    });
    const height = await prompt.input<number>({
      message: 'Enter height',
      type: 'number',
    });

    const outputPath = `${inputPath}/${outputName}`;

    deleteFileIfExist(outputPath);

    return {
      inputPath,
      outputPath,
      width,
      height,
    };
  }

  protected build(input: FfmpegInput): ICommandExec {
    const builder = new FfmpegCommandBuilder(input.inputPath);
    builder.output(input.outputPath);
    builder.setSize({ width: input.width, height: input.height });
    return builder.build();
  }

  protected spawn(command: ICommandExec): ChildProcessWithoutNullStreams {
    return spawn(command.command, command.args);
  }

  protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}
