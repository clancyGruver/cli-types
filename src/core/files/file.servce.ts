import { unlink, existsSync } from 'fs';
import { isAbsolute, dirname, join } from 'path';

const isExist = (filePath: string) => {
  try {
    existsSync(filePath);
    return true;
  } catch {
    return false;
  }
};

export const getFilePath = (path: string, name: string, ext: string) => {
  const processedPath = isAbsolute(path) ? path : join(__dirname, '/', path);
  return join(dirname(processedPath), '/', `${name}.${ext}`);
};

export const deleteFileIfExist = (path: string) => {
  if (isExist(path)) {
    unlink(path, () => {});
  }
};
