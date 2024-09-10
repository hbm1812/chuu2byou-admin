import {request} from "../request";
import {API_SECURITY, endpoints} from "../endpoint";
import {IMenu} from "../../interfaces/menu.interface";

export const getMenu = () =>
    request<IMenu[]>(
        "post",
        `${API_SECURITY}/${endpoints.security.getMenu}`
    );
