export interface IParamsDmDiaChinh {
    page?: number | string;
    size?: number | string;
}

export interface IContentDmDiaChinh {
    capDiaChinh: string;
    diaChinhChaID: null | string | number;
    id: number;
    loaiDiaBan: null | string | number;
    ma: string;
    maTraCuu: string;
    path: string;
    pathParents: string;
    ten: string;
    tenDayDu: string;
    tenNganGon: string;
    children?: any[]
}

export interface IResultSearchDmDiaChinh {
    content: IContentDmDiaChinh[];
    totalPages: number;
    totalElements: number;
    size: number
}

export interface IDmThanhPho {
    name: string;
    value: number;
}
export interface IDmHuyenXa {
    name: string;
    value: number;
    parentId: number;
}