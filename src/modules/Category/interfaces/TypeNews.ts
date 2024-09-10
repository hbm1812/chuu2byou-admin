export interface ISearchNews {
    page?: number;
    size?: number;
    sorts?: string[];
    title?: string | null;
    type_number?: string | null;
    date?: string |number |null;
  }

  export interface ITableNews {
    #?: string | number | null;
    title?:string|number|null;
    thumbnail?:string|number|null;
    type_number?: string|number|null;
    date?: string|number|null;
    action?:string | number | null;
  }