export interface PageType {
  absoluteFilePath: string;
  relativeFilePath: string;
  urlPath: string;
  relativeOutputDirPath: string;
}

export interface ToStringType {
  toString(): string;
}

export interface SyteType {
  pages: PageType[];
  body: ToStringType | null;
}

export type ContextType = object & { $: SyteType };
