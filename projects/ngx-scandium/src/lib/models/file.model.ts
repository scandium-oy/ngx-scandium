export class FileUpload {
  file: File;
  guid: string;

  constructor(guid: string, file: File) {
    this.guid = guid;
    this.file = file;
  }
}
