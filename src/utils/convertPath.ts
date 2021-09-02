import path from 'path';

const absoluteUrlRegExp = /(href|src)="(?!http[s]|ftp?:\/\/)([^"|#]+)"/g;
export const isDirectory = (dirPath: string) => path.extname(dirPath) === '';

export const convertAbsolutePathsToRelative = (content: string, filePath: string) =>
  content.replace(absoluteUrlRegExp, (_absoluteUrl: string, $1: string, $2: string) => {
    const currentDirPath = path.dirname(filePath);
    const relativeDirPath = currentDirPath === '.' ? '.' : path.relative(currentDirPath, '');

    let relativePath = path.join(relativeDirPath, $2);
    if (isDirectory(relativePath)) {
      relativePath = path.join(relativePath, 'index.html');
    }

    return `${$1}='${relativePath}'`;
  });
