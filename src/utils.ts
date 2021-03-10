import { ObjectType } from "./types";

const NON_WHITESPACE_RE = /\S/;

export function isBlank(s: string) {
  return !NON_WHITESPACE_RE.test(s);
}

export function shallowMerge(...o: ObjectType[]) {
  return Object.assign({}, ...o);
}
