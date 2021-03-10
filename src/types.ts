export type ObjectType = {
  [key: string]: any;
};

export interface FileType {
  filePath: string;
  contents: string;
}

export interface ConfigType {
  layout: string | void;
}

export interface PageType {
  filePath: string;
  urlPath: string;
  contents: string;
  context: ObjectType;
}

export interface SyteType {
  pages: PageType[];
  body: string | null;
}

export type ContextType = ObjectType & { $: SyteType };
