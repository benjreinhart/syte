import { ObjectType } from "./types";

const NON_WHITESPACE_RE = /\S/;

export function isBlank(s: string) {
  return !NON_WHITESPACE_RE.test(s);
}

export function shallowMerge(...o: ObjectType[]) {
  return Object.assign({}, ...o);
}

export function isObject(o: any) {
  if (o === undefined || o === null) {
    return false;
  }

  return o.constructor === Object;
}
