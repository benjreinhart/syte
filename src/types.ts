export type ObjectType = {
  [key: string]: any;
};

export interface FileType {
  readonly path: string;
  readonly contents: string;
}

export interface PageType {
  readonly filePath: string;
  readonly urlPath: string;
  readonly context: ObjectType;
  readonly contents: string;
}

export interface SyteType {
  pages: PageType[];
  body: string | null;
}

export type ContextType = ObjectType & { $: SyteType };
