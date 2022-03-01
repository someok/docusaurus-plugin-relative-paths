import path from 'path';

const { extname } = path.posix;

export const isDirectory = (dirPath: string) => extname(dirPath) === '';
