export class FileUpload {
  key: string | undefined;
  name: string | undefined;
  url: string | undefined;
  file: File;
  guid: string;

  constructor(guid: string, file: File) {
    this.guid = guid;
    this.file = file;
  }
}
