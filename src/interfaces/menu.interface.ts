import {ReactNode} from "react";

export interface IMenu {
    key: string;
    code: string;
    name: string;
    icon: ReactNode | string;
    parentCode: number | string | null;
    path: string;
    ordinal: number | string | null;
    children: IMenu[] | [];
}