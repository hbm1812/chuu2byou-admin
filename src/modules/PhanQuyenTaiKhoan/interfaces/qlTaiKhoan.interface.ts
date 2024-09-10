export interface ISearchQlTaiKhoan {
  page: number;
  size: number;
  sorts?: string[];
  fullName?: string;
  username?: string;
  active?: number | string;
  departmentId?: number | null;
  roles?: string[];
  isFetchRole?: boolean;
}

export interface IRoleName {
  roleCode: string;
  roleName: string;
}

export interface ITableQlTaiKhoan {
  id: number;
  username: string;
  fullName: string;
  gender: number;
  phoneNumber: string;
  email: string;
  active: number;
  departmentId: number;
  departmentName: string;
  roleNames: IRoleName[];
  admin: boolean;
  roles: IRoleName[];
  departmentManagementIds: number[]
}

export interface IResultQlTaiKhoan {
  data: ITableQlTaiKhoan[];
  total: number;
  totalPage: number;
}

export interface IFormTaiKhoan {
  admin: boolean;
  fullName: string;
  username: string;
  password: string;
  phoneNumber: string | number;
  email: string;
  departmentId: number;
  roles: string[];
}

export interface IFromChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}
