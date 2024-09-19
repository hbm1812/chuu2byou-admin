export interface ISearchNews {
    page?: number;
    size?: number;
    sorts?: string[];
    title?: string | null;
    typeCode?: string | null;
    date?: string |number |null;
  }

  export interface IInsertNews {
    newsCode?: string | number | null;
    title?:string|number|null;
    thumbnail?:string|number|null;
    typeCode?: string|number|null;
    upLoadDate?: string|number|null;
    content?: string|number|null;
    relatedInformation?:string|number|null;
  }


  export interface INewsTable {
    index?:string;
    newsCode?: string | number | null;
    title?:string|number|null;
    thumbnail?:string|number|null;
    typeCode?: string|number|null;
    upLoadDate?: string|number|null;
    content?: string|number|null;
    relatedInformation?:string|number|null;
    _id?: string | number | null;
    action?:string;
  }


  export interface IResultNews {
    data: INewsTable[];
    total: number;
    totalPage: number;
  }
  