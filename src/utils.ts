// @ts-ignore
import { escapeXML as defaultEjsEscapeFn } from "ejs/lib/utils";

const NON_WHITESPACE_RE = /\S/;

export function isBlank(s: string) {
  return !NON_WHITESPACE_RE.test(s);
}

class HtmlSafeString {
  str: string;

  constructor(str: string) {
    this.str = str;
  }

  toString() {
    return this.str;
  }
}

export function htmlSafe(str: string) {
  return new HtmlSafeString(str);
}

export function ejsEscapeFn<T>(o: T): T {
  if (o instanceof HtmlSafeString) {
    return o;
  } else {
    return defaultEjsEscapeFn(o);
  }
}
