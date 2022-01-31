import type { Stats } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { extname, relative, sep, posix } from 'path';
import chalk from 'chalk';
import recursiveReaddir from 'recursive-readdir';
import type { LoadContext, Props } from '@docusaurus/types';
import type { FileHandler } from "./types";
import handleHTML from './handlers/html';
import handleCSS from "./handlers/css";

const handlers: { [ext: string]: FileHandler } = {
  ".html": handleHTML,
  ".css": handleCSS,
};

const isNotWebsiteTextualFile = (filePath: string, stats: Stats) =>
  !(stats.isDirectory() || handlers.hasOwnProperty(extname(filePath)));

export default (_context: LoadContext) => {
  return {
    name: 'docusaurus-plugin-relative-paths',
    async postBuild({outDir, siteConfig: {baseUrl}}: Props) {
      const filePaths = await recursiveReaddir(outDir, [isNotWebsiteTextualFile]);
      for (const filePath of filePaths) {
        const ext = extname(filePath);
        if (ext.length <= 0) {
          continue;
        }
        const handler: FileHandler | undefined = handlers[ext];
        if (handler === undefined) {
          continue;
        }
        const relativePath = relative(outDir, filePath).split(sep).join(posix.sep);
        const content = await readFile(filePath);
        await writeFile(filePath, handler(content.toString("utf8"), relativePath, baseUrl));
      }
      console.log(`${chalk.green('Success!')} Converted absolute paths to relative.`);
    },
  };
}
