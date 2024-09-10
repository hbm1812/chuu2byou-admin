import {
  IContentDmDiaChinh,
  IResultSearchDmDiaChinh,
} from "../../interfaces/dmDiaChinh.interface";
import { request } from "../request";
import { API_CATEGORY, endpoints } from "../endpoint";
import { buildQueryString } from "../../utils";

export const getDanhSachDmTinhTp = () =>
  request<IResultSearchDmDiaChinh>(
    "get",
    `${API_CATEGORY}/${endpoints.category.dmDiaChinh.danhSachDm}`
  );

export const getDanhSachDmDiaChinhByName = (
  ten: string | null | undefined,
  idCha: string | number | null | undefined
) => {
  const queryParams = buildQueryString({ ten, idCha });
  return request<IContentDmDiaChinh[]>(
    "get",
    `${API_CATEGORY}/${endpoints.category.dmDiaChinh.layDsachDiaChinhTheoTen}?${queryParams}`
  );
};
