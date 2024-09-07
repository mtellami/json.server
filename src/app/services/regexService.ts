export class RegexService {

  static isFilename(filename: string): boolean {
    return typeof filename === 'string'
      && filename.trim() !== ''
      && !/[^a-zA-Z0-9_-]/.test(filename);
  }
}
