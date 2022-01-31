import { dirname, join, relative } from "path/posix";
import type { FileHandler } from "../types";

const cssRegExp = /url\(['"]?(?!(?:https?|ftp):\/\/)(\/[^'")]+)['"]?\)/g;

const handleCSS: FileHandler = (fileContent: string, filePath: string, baseUrl: string) => {
  const currentDirPath = dirname(filePath);
  const relativeDirPath = currentDirPath === '.' ? '.' : relative(currentDirPath, '');
  return fileContent.replace(cssRegExp, (_, absPath: string) => {
    const relPath = absPath.substring(absPath.startsWith(baseUrl) ? baseUrl.length : 1);
    const relativePath = join(relativeDirPath, relPath);
    return `url('${relativePath}')`;
  });
}

export default handleCSS;
