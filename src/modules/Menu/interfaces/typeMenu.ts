export interface IAddMenu{
    key?:string|number|null;
    code?:string|number|null;
    parentCode?: string|number|null;
    name?:string|number|null;
    path?:string|number|null;
    icon?: string|number|null;
    landing?: string|number|null;
    showMenu?:string|number|null;
    menuTypeCode?:string|number|null;
    menuLevel?:string|number|null;
    children?:ITableMenu[];
  }
  

  export interface ISearchMenu {
    page?: number;
    size?: number;
    sorts?: string[];
    key?: string | null;
    name?:string|number|null;
  }


  export interface ITableMenu {
    index?: string | number | null;
    key?:string|number|null;
    code?:string|number|null;
    parentCode?: string|number|null;
    name?:string|number|null;
    path?:string|number|null;
    icon?: string|number|null;
    landing?: string|number|null;
    showMenu?:string|number|null;
    menuTypeCode?:string|number|null;
    menuLevel?:string|number|null;
    children?:ITableMenu[];
    _id?: string | number | null;
  }

  
  export interface IUpdateMenu {
    key?:string|number|null;
    code?:string|number|null;
    parentCode?: string|number|null;
    name?:string|number|null;
    path?:string|number|null;
    icon?: string|number|null;
    landing?: string|number|null;
    showMenu?:string|number|null;
    menuTypeCode?:string|number|null;
    menuLevel?:string|number|null;
    children?:ITableMenu[];
    _id?: string | number | null;
  }

  export interface IResultMenu {
    data: ITableMenu[];
    total: number;
    totalPage: number;
  }