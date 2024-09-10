export interface IResultLogin {
  token: string;
}

export interface IAuthor {
  code: string;
  privileges: string;
}

export interface IThongTinTaiKhoan {
  username: string;
  authorities?: IAuthor[];
  enabled: boolean;
  id: number;
  admin: boolean;
  departmentId: number;
  departmentCode: number;
  departmentName: number;
}

export enum ECapDiaChinh {
  capXa = "USER_LEVEL_XA",
  capHuyen = "USER_LEVEL_HUYEN",
  capTinh = "USER_LEVEL_TINH",
  capTW = "USER_LEVEL_TW",
}
