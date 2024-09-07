import path from "path";
import fs from 'fs';
import { JSONFOLDER } from "@constants";

const jsonDirectory = path.join(process.cwd(), JSONFOLDER);

export class FileService {

  static async directorExists() {
    try {
      await fs.promises.access(jsonDirectory, fs.constants.F_OK);
    } catch {
      await fs.promises.mkdir(jsonDirectory, { recursive: true });
    }
  }

 static async writeFile(filename: string, content: object): Promise<void> {
    await this.directorExists();

    const filePath = path.join(jsonDirectory, `${filename}.json`);
    if (fs.existsSync(filePath)) {
      throw new Error('File already exists');
    }
    await fs.promises.writeFile(filePath, JSON.stringify(content, null, 2), 'utf8');
 }

 static async readFile(filename: string): Promise<object> {
   await this.directorExists();

    const filePath = path.join(jsonDirectory, `${filename}.json`);
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
 }

 static async deleteFile(filename: string): Promise<void> {
   await this.directorExists();

    const filePath = path.join(jsonDirectory, `${filename}.json`);
    await fs.promises.access(filePath, fs.constants.F_OK).catch(() => {
    throw new Error('File not found');
    });
    await fs.promises.unlink(filePath);
 }

 static async readDir(): Promise<string[]> {
   await this.directorExists();

   const files = await fs.promises.readdir(jsonDirectory);
   return files
   .filter(file => file.endsWith('.json'))
   .map(file => path.basename(file, '.json'));
 }
}
