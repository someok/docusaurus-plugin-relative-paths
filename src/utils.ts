import { extname } from 'path/posix';

export const isDirectory = (dirPath: string) => extname(dirPath) === '';
