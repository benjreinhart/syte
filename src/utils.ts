const NON_WHITESPACE_RE = /\S/;

export function isBlank(s: string) {
  return !NON_WHITESPACE_RE.test(s);
}

export function shallowMerge(...o: object[]) {
  return Object.assign({}, ...o);
}
