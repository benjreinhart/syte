import path from "path";
import { PageType } from "./types";

const URI_RE = new RegExp("^[-a-z]+://|^(?:cid|data):|^//");

function assetPath(root: string, source: string) {
  if (URI_RE.test(source)) {
    return source;
  } else {
    return path.join(root, source);
  }
}

export default function syte(pages: PageType[], environment: string, assetPathRoot: string) {
  return {
    pages,
    environment,
    assetPath: (source: string) => assetPath(assetPathRoot, source),
  };
}
