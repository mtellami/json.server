import { jsonDirectory } from "@constants";
import path from "path";
import fs from 'fs';

export class FileService {

 static async writeFile(filename: string, content: object): Promise<void> {
    const filePath = path.join(jsonDirectory, `${filename}.json`);
    if (fs.existsSync(filePath)) {
      throw new Error('File already exists');
    }
    await fs.promises.writeFile(filePath, JSON.stringify(content, null, 2), 'utf8');
 }

 static async readFile(filename: string): Promise<object> {
    const filePath = path.join(jsonDirectory, `${filename}.json`);
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
 }

 static async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(jsonDirectory, `${filename}.json`);
    await fs.promises.access(filePath, fs.constants.F_OK).catch(() => {
      throw new Error('File not found');
    });

    await fs.promises.unlink(filePath);
 }

 static async readDir(): Promise<string[]> {
   const files = await fs.promises.readdir(jsonDirectory);
   return files
   .filter(file => file.endsWith('.json'))
   .map(file => path.basename(file, '.json'));
 }
}
