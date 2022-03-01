import path from 'path';
import type { FileHandler } from "../types";
import { isDirectory } from "../utils";

const { dirname, join, relative } = path.posix;

const htmlRegExp = /(href|src)="(?!(?:https?|ftp):\/\/)(\/[^"|#]*)"/g;

const handleHTML: FileHandler = (fileContent: string, filePath: string, baseUrl: string) => {
  const currentDirPath = dirname(filePath);
  const relativeDirPath = currentDirPath === '.' ? '.' : relative(currentDirPath, '');
  return fileContent.replace(htmlRegExp, (_, attribute: string, absPath: string) => {
    const relPath = absPath.substring(absPath.startsWith(baseUrl) ? baseUrl.length : 1);

    let relativePath = join(relativeDirPath, relPath);
    if (isDirectory(relativePath)) {
      relativePath = join(relativePath, 'index.html');
    }

    return `${attribute}='${relativePath}'`;
  });
}

export default handleHTML;
