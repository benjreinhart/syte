import fs from "fs/promises";
import fg from "fast-glob";
import { ncp } from "ncp";
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

  readAll(paths: string[]) {
    const read = (path: string) => {
      return new Promise<FileType>((resolve) => {
        this.read(path).then((contents) => {
          const file = Object.freeze({ path, contents });
          return resolve(file);
        });
      });
    };

    return Promise.all(paths.map(read));
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

  copy(source: string, destination: string) {
    return new Promise<void>((resolve, reject) => {
      ncp(source, destination, (errors) => {
        return errors !== null ? reject(errors) : resolve();
      });
    });
  },
};
