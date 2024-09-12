export interface IAddNewsType {
    typeNameJP?: string;
    typeCode?:string|number|null;
  }
  

  export interface ISearchNewsType {
    page?: number;
    size?: number;
    sorts?: string[];
    typeNameJP?: string | null;
    typeCode?:string|number|null;
  }


  export interface ITable {
    index?: string | number | null;
    typeCode?:string|number|null;
    typeNameJP?:string|number|null;
    action?: string|number|null;
  }


  export interface IResultNewsType {
    data: ITable[];
    total: number;
    totalPage: number;
  }