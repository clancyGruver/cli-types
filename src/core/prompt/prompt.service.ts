import inquirer from 'inquirer';
import { PromptType } from './prompt.types';

export default class PromptService {
  public async input<T>({ message, type }: { message: string, type: PromptType }) {
    const { result } = await inquirer.prompt<{ result: T }>([{
      type,
      name: 'result',
      message,
    }]);
    return result;
  }
}
