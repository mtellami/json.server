import path from "path";
import fs from 'fs';
import { JSONFOLDER } from "@constants";

const jsonDirectory = path.join(process.cwd(), JSONFOLDER);

export class FileService {

  static async writeFile(filename: string, content: object): Promise<void> {
    const filePath = path.join(jsonDirectory, `${filename}.json`);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(content, null, 2), 
      { encoding: 'utf8', flag: 'w' }
    );
  }

  static async readFile(filename: string): Promise<object | null> {
    await fs.promises.mkdir(jsonDirectory, { recursive: true });

    const filePath = path.join(jsonDirectory, `${filename}.json`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  }

  static async deleteFile(filename: string): Promise<void> {
    await fs.promises.mkdir(jsonDirectory, { recursive: true });
    const filePath = path.join(jsonDirectory, `${filename}.json`);
    await fs.promises.unlink(filePath).then(async () => {

    for (
      let dir = path.dirname(filePath), files = await fs.promises.readdir(dir);
      dir !== jsonDirectory && files.length === 0;
      dir = path.dirname(dir), files = await fs.promises.readdir(dir)
    ) {
      await fs.promises.rmdir(dir);
    }
    });
  }

  static async readDir(dir: string = jsonDirectory): Promise<string[]> {
    let results = [];
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const subFiles = await FileService.readDir(fullPath);
        results.push(...subFiles);
      } else if (entry.isFile() && fullPath.endsWith('.json')) {
        const relativePath = path.relative(jsonDirectory, fullPath);
        results.push(relativePath.slice(0, -'.json'.length));
      }
    }
    return results
  }
}
