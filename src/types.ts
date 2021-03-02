export type FileType = {
  path: string;
  contents: string;
};

export type ObjectType = { [key: string]: any };

export type PageType = {
  filePath: string;
  urlPath: string;
  context: ObjectType;
  contents: string;
};

export interface SyteType {
  pages: PageType[];
  body: string | null;
}

export type ContextType = ObjectType & { $: SyteType };
