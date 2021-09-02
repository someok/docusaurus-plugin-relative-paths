import path from 'path';

const absoluteUrlRegExp = /(href|src)="(?!http[s]|ftp?:\/\/)([^"|#]+)"/g;

export const isDirectory = (dirPath: string) => path.extname(dirPath) === '';

export const convertAbsolutePathsToRelative = (fileContent: string, filePath: string) =>
  fileContent.replace(absoluteUrlRegExp, (_absoluteUrl: string, $1: string, $2: string) => {
    const currentDirPath = path.dirname(filePath);
    const relativeDirPath = currentDirPath === '.' ? '.' : path.relative(currentDirPath, '');

    let relativePath = path.join(relativeDirPath, $2);
    if (isDirectory(relativePath)) {
      relativePath = path.join(relativePath, 'index.html');
    }

    return `${$1}='${relativePath}'`;
  });
