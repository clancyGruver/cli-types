import { promises } from 'fs';
import { isAbsolute, dirname, join } from 'path';

export default class FileService {
  private async isExist(filePath: string) {
    try {
      await promises.stat(filePath);
      return true;
    } catch {
      return false;
    }
  }

  getFilePath(path: string, name: string, ext: string) {
    const processedPath = isAbsolute(path) ? path : join(__dirname, '/', path);
    return join(dirname(processedPath), '/', `${name}.${ext}`);
  }

  async deleteFileIfExist(path: string) {
    if (await this.isExist(path)) {
      await promises.unlink(path);
    }
  }
}
