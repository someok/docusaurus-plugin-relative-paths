import path from 'path';
import fs from 'fs-extra';
import recursiveReaddir from 'recursive-readdir';
import { LoadContext, Props } from '@docusaurus/types';

const absoluteUrlRegExp = /(href|src)="(?!http[s]|ftp?:\/\/)([^"|#]+)"/g;
const isDirectory = (dirPath: string) => path.extname(dirPath) === '';

const convertAbsolutePathsToRelative = (content: string, filePath: string) =>
  content.replace(absoluteUrlRegExp, (_absoluteUrl: string, $1: string, $2: string) => {
    const currentDirPath = path.dirname(filePath);
    const relativeDirPath = currentDirPath === '.' ? '.' : path.relative(currentDirPath, '');

    let relativePath = path.join(relativeDirPath, $2);
    if (isDirectory(relativePath)) {
      relativePath = path.join(relativePath, 'index.html');
    }

    return `${$1}='${relativePath}'`;
  });

const websiteTextualFileExtensions = ['.css', '.js', '.html', '.xml'];
const isNotWebsiteTextualFile = (filePath: string, stats: any) =>
  !(stats.isDirectory() || websiteTextualFileExtensions.includes(path.extname(filePath)));

export default (_context: LoadContext, _options: any) => {
  return {
    name: 'docusaurus-plugin-relative-paths',
    async postBuild({ outDir }: Props) {
      const filePaths = await recursiveReaddir(outDir, [isNotWebsiteTextualFile]);
      await Promise.all(
        filePaths.map(async filePath => {
          const content = await fs.readFile(filePath);
          const relativePath = path.relative(outDir, filePath);
          await fs.writeFile(filePath, convertAbsolutePathsToRelative(String(content), relativePath));
        })
      );
    },
  };
}
