export interface IAddTV {
    tvCode?: string|number|null;
    tvName?:string|number|null;
    broadcastTime?:string|number|null;
    description?:string|number|null;
  }
  

  export interface ISearchTV {
    page?: number;
    size?: number;
    sorts?: string[];
    tvCode?: string|number|null;
    tvName?:string|number|null;
  }


  export interface ITableTV {
    index?: string | number | null;
    tvCode?: string|number|null;
    tvName?:string|number|null;
    broadcastTime?:string|number|null;
    description?:string|number|null;
    action?: string|number|null;
    _id?: string | number | null;
  }

  export interface IUpdateTV {
    _id?: string | number | null;
    tvCode?: string|number|null;
    tvName?:string|number|null;
    broadcastTime?:string|number|null;
    description?:string|number|null;
  }

  export interface IResultTV {
    data: ITableTV[];
    total: number;
    totalPage: number;
  }