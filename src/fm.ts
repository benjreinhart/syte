import { ObjectType } from "./types";
import { isBlank, isObject } from "./utils";
import yaml from "js-yaml";

const FM_OPEN_TAG_RE = /^---\s*$/;
const FM_CLOSE_TAG_RE = /^---\s*$/;

function parse(text: string): [ObjectType, string] {
  const lines = text.split("\n");
  const linesLength = lines.length;
  const fmLines = [];
  const contentLines = [];

  let hasSeenFMOpenTag = false;
  let hasSeenFMCloseTag = false;

  for (let i = 0; i < linesLength; ++i) {
    const line = lines[i];

    if (!hasSeenFMOpenTag) {
      const lineIsFMOpenTag = FM_OPEN_TAG_RE.test(line);

      if (lineIsFMOpenTag) {
        hasSeenFMOpenTag = true;
      } else {
        return [{}, text];
      }
    } else if (hasSeenFMOpenTag && !hasSeenFMCloseTag) {
      const lineIsFMCloseTag = FM_CLOSE_TAG_RE.test(line);

      if (lineIsFMCloseTag) {
        hasSeenFMCloseTag = true;
      } else {
        fmLines.push(line);
      }
    } else {
      contentLines.push(line);
    }
  }

  if (hasSeenFMOpenTag && !hasSeenFMCloseTag) {
    throw new Error("EOF reached without closing front matter tag");
  }

  const contents = contentLines.join("\n");
  const contextStr = fmLines.join("\n");
  const context = isBlank(contextStr) ? {} : yaml.load(contextStr);

  if (!isObject(context)) {
    throw new Error(`Front matter must be an object but found: ${context}`);
  }

  return [context as ObjectType, contents];
}

export default { parse };
