export interface PageType {
  absoluteFilePath: string;
  relativeFilePath: string;
  urlPath: string;
  relativeOutputDirPath: string;
}

export interface ToStringType {
  toString(): string;
}

export type ContextType = {
  site: object;
  body: ToStringType;
  pages: PageType[];
  page: object;
};
