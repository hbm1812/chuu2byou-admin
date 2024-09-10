interface ContractActions {
    add: (payload: any) => Promise<any>;
    update: (payload: any, idHopDong?: string) => Promise<any>;
  }