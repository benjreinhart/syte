export interface PageFileType {
  absoluteFilePath: string;
  urlPath: string;
}

export interface ToStringType {
  toString(): string;
}

export type PageType = object;

export interface SyteType {
  pages: PageType[];
  body: ToStringType | null;
}

export type ContextType = object & { $: SyteType };
