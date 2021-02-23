import fs from "fs/promises";
import fg from "fast-glob";
import { constants } from "fs";

export interface FS {
  exists(path: string): Promise<boolean>;
  read(path: string): Promise<string>;
  glob(pattern: string): Promise<string[]>;
  write(path: string, data: string): Promise<void>;
  mkdirp(path: string): Promise<void>;
}

export default {
  exists(path) {
    return new Promise((resolve) => {
      fs.access(path, constants.F_OK)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  },

  read(path) {
    return fs.readFile(path, { encoding: "utf8" });
  },

  glob(pattern) {
    return fg(pattern);
  },

  write(path, data) {
    return fs.writeFile(path, data, { encoding: "utf8" });
  },

  mkdirp(path) {
    return fs.mkdir(path, { recursive: true });
  },
} as FS;
