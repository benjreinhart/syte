import fs from "fs/promises";
import fg from "fast-glob";
import { constants } from "fs";
import { FileType } from "./types";

export default {
  async exists(path: string) {
    try {
      await fs.access(path, constants.F_OK);
      return true;
    } catch {
      return false;
    }
  },

  read(path: string) {
    return fs.readFile(path, { encoding: "utf8" });
  },

  readAll(paths: string[]): Promise<FileType[]> {
    const read = (path: string) => {
      return new Promise((resolve) => {
        this.read(path).then((contents) => resolve({ path, contents }));
      });
    };

    return Promise.all(paths.map(read)) as Promise<FileType[]>;
  },

  glob(pattern: string) {
    return fg(pattern);
  },

  write(path: string, data: string) {
    return fs.writeFile(path, data, { encoding: "utf8" });
  },

  mkdirp(path: string) {
    return fs.mkdir(path, { recursive: true });
  },
};
