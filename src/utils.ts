import { ObjectType } from "./types";

const NON_WHITESPACE_RE = /\S/;

export function isBlank(s: string) {
  return !NON_WHITESPACE_RE.test(s);
}

export function shallowMerge(...o: object[]) {
  return Object.assign({}, ...o);
}

export function without(o: ObjectType, ...keys: string[]) {
  return Object.keys(o).reduce((result, key) => {
    if (!keys.includes(key)) {
      result[key] = o[key];
    }
    return result;
  }, {} as ObjectType);
}
