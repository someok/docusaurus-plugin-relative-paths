import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import recursiveReaddir from 'recursive-readdir';
import { LoadContext, Props } from '@docusaurus/types';
import { convertAbsolutePathsToRelative } from './utils/convertPath';

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
          const content = fs.readFileSync(filePath);
          const relativePath = path.relative(outDir, filePath);
          fs.writeFileSync(filePath, convertAbsolutePathsToRelative(String(content), relativePath));
        })
      );
      console.log(`${chalk.green('Success!')} Converted absolute paths to relative.`);
    },
  };
}
