export interface IAddWorks {
    workCode?: string|number|null;
    workName?:string|number|null;
    description?:string|number|null;
  }
  

  export interface ISearchWorks {
    page?: number;
    size?: number;
    sorts?: string[];
    workCode?: string|number|null;
    workName?:string|number|null;
    description?:string|number|null;
  }


  export interface ITableWorks {
    index?: string | number | null;
    workCode?: string|number|null;
    workName?:string|number|null;
    description?:string|number|null;
    action?: string|number|null;
    _id?: string | number | null;
  }

  export interface IUpdateWorks {
    _id?: string | number | null;
    workCode?: string|number|null;
    workName?:string|number|null;
    description?:string|number|null;
  }

  export interface IResultWorks {
    data: ITableWorks[];
    total: number;
    totalPage: number;
  }