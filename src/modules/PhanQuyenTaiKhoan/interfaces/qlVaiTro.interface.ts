export interface ISearchQlVaiTro {
  page: number;
  size: number;
  sorts?: string[];
  code?: string;
  name?: string;
  active?: number | string;
  isDefaultRole?: boolean | string;
}

export interface IPrivileges {
  privilegeCode: string;
  action: string;
}

export interface ITableQlVaiTro {
  stt?: number;
  key?: number | string | null;
  code: string;
  name: string;
  active: number;
  isDefaultRole: boolean;
  privileges?: IPrivileges[];
}

export interface IResultQlVaiTro {
  data: ITableQlVaiTro[];
  total: number;
  totalPage: number;
}

export interface IPrivilegeNotMap {
  key: string;
  code: string;
  name: string;
  ordinal: string | number;
  parentCode: string | null;
  path: string;
  children?:IPrivilegeNotMap[];
}


export interface IResultPrivilegeRole {
  message: string;
  result: IPrivilegeNotMap[];
  status: boolean;
}

export interface IPrivilege {
  value: string;
  label: string;
}


export interface IFormQlVaiTro {
  code?: string;
  name?: string;
  active?: number | string;
  isDefaultRole?: boolean | string;
  privileges?: IPrivileges[];
}

export interface IPrivilegeRoles {
  code?: string;
  name?: string;
}

export enum EActionRole {
  READ = "Chỉ đọc",
  OPS = "Thêm, sửa, xoá",
  ALL = "Đọc, thêm, sửa, xoá"
}