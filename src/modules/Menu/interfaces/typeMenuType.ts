export interface IAddMenuType{
    menuTypeName?:string|number|null;
    menuTypeCode?:string|number|null;
  }
  

  export interface ISearchMenuType {
    page?: number;
    size?: number;
    sorts?: string[];
    menuTypeName?: string | null;
    menuTypeCode?:string|number|null;
  }


  export interface ITableMenuType {
    index?: string | number | null;
    menuTypeName?:string|number|null;
    menuTypeCode?:string|number|null;
    _id?: string | number | null;
  }

  
  export interface IUpdateMenuType {
    menuTypeName?:string|number|null;
    menuTypeCode?:string|number|null;
    parentCode?: string|number|null;
    _id?: string | number | null;
  }

  export interface IResultMenuType {
    data: ITableMenuType[];
    total: number;
    totalPage: number;
  }