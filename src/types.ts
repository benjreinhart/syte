export interface ToStringType {
  toString(): string;
}

export type PageType = object & { urlPath: string };

export interface SyteType {
  pages: PageType[];
  body: ToStringType | null;
}

export type ContextType = object & { $: SyteType };
