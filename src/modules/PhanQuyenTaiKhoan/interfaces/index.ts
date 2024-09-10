export interface IPrivileges {
    privilegeCode: string;
    action: "READ" | "OPS" | "ALL";
  }
  
  export interface IBodyCreateRole {
      code?: string, 
      name?: string,
      privileges: IPrivileges[]
  }
  