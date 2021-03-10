export type ObjectType = {
  [key: string]: any;
};

export interface FileType {
  filePath: string;
  contents: string;
}

export interface LayoutType extends FileType {
  name: string;
}

export interface PageType extends FileType {
  urlPath: string;
  context: ObjectType;
}

export interface SyteType {
  app: ObjectType;
  layouts: LayoutType[];
  pages: PageType[];
}

export type ContextType = ObjectType;
