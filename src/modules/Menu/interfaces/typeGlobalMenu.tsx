export interface IAddGlobalMenu{
    key?:string|number|null;
    code?:string|number|null;
    parentCode?: string|number|null;
    name?:string|number|null;
    path?:string|number|null;
    icon?: string|number|null;
    landing?: string|number|null;
    showMenu?:string|number|null;
    children?:ITableGlobalMenu[];
  }
  

  export interface ISearchGlobalMenu {
    page?: number;
    size?: number;
    sorts?: string[];
    key?: string | null;
    name?:string|number|null;
  }


  export interface ITableGlobalMenu {
    index?: string | number | null;
    key?:string|number|null;
    code?:string|number|null;
    parentCode?: string|number|null;
    name?:string|number|null;
    path?:string|number|null;
    icon?: string|number|null;
    landing?: string|number|null;
    showMenu?:string|number|null;
    children?:ITableGlobalMenu[];
    _id?: string | number | null;
  }

  
  export interface IUpdateGlobalMenu {
    key?:string|number|null;
    code?:string|number|null;
    parentCode?: string|number|null;
    name?:string|number|null;
    path?:string|number|null;
    icon?: string|number|null;
    landing?: string|number|null;
    showMenu?:string|number|null;
    children?:ITableGlobalMenu[];
    _id?: string | number | null;
  }

  export interface IResultGlobalMenu {
    data: ITableGlobalMenu[];
    total: number;
    totalPage: number;
  }