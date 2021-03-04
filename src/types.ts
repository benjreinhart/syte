export type ObjectType = {
  [key: string]: any;
};

export interface FileType {
  path: string;
  contents: string;
}

export interface ConfigType {
  layout: string | void;
}

export type UserData = {
  config: ConfigType;
  context: ObjectType;
};

export interface PageType extends UserData {
  filePath: string;
  urlPath: string;
  contents: string;
}

export interface SyteType {
  pages: PageType[];
  body: string | null;
}

export type ContextType = ObjectType & { $: SyteType };
