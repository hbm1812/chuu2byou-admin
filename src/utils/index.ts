import { TreeDataNode } from "antd";
import { IContentDmDiaChinh } from "../interfaces/dmDiaChinh.interface";
import moment from "moment";

interface ConvertDataResult {
  treeData: TreeDataNode[];
  expandedKeys: string[];
}

export function splitText(string: string, length: any) {
  const count = string?.length;
  if (count > length) {
    const text = string.substring(0, length + 1).concat("...");
    return text;
  } else {
    return string;
  }
}

export const compareObjects = (obj1: any, obj2: any) => {
  // Kiểm tra số lượng thuộc tính của hai đối tượng
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }

  // So sánh từng thuộc tính và giá trị của hai đối tượng
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};
const compareRelevantProperties = (obj1: any, obj2: any) => {
  const commonKeys = Object.keys(obj1).filter((key) => key in obj2);

  for (const key of commonKeys) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};
export const isObjectInArray = (obj: any, arr: any) => {
  for (const item of arr) {
    if (compareRelevantProperties(obj, item)) {
      return true;
    }
  }
  return false;
};

export const buildQueryString = (params: { [key: string]: any }): string => {
  const query = Object.keys(params)
    .map((key) => {
      const value = params[key];
      return value !== null && value !== undefined
        ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : `${encodeURIComponent(key)}=`;
    })
    .join("&");
  return query;
};

export const convertDataToTree = (
  data: IContentDmDiaChinh[]
): ConvertDataResult => {
  const map = new Map<number, TreeDataNode & { capDiaChinh?: string }>();
  const expandedKeys: string[] = [];

  // Tạo map với tất cả các nodes
  data.forEach((item) => {
    map.set(item.id, {
      title: item.ten,
      key: item.id.toString(),
      children: [],
      capDiaChinh: item.capDiaChinh,
    });
  });

  // Tìm đối tượng đầu tiên có capDiaChinh là "T" và thêm id vào expandedKeys
  const firstTItem = data.find((item) => item.capDiaChinh === "T");
  if (firstTItem) {
    expandedKeys.push(firstTItem.id.toString());
  }

  const tree: TreeDataNode[] = [];

  data.forEach((item) => {
    if (item.diaChinhChaID) {
      if (map.has(item.diaChinhChaID as number)) {
        const parentNode = map.get(item.diaChinhChaID as number)!;
        if (!parentNode.children!.some(child => child.key === item.id.toString())) {
          parentNode.children!.push(map.get(item.id)!);
        }
      }
    } else {
      tree.push(map.get(item.id)!);
    }
  });

  return { treeData: tree, expandedKeys };
};


export const formatDateMonthYear = (dateString: string | undefined) => {
  if (!dateString || dateString === "") return undefined;

  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

export const formatDateMonthYearQuo = (dateString: string | undefined) => {
  if (!dateString) return undefined;

  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

export const formatMonthYear = (dateString: string | undefined) => {
  if (!dateString || dateString === "") return undefined;

  const [month, year] = dateString.split('/');
  return `${year}-${month}`;
};


export const cleanString = (value: string | null | undefined): string | undefined => {
  return value && value.trim() !== "" ? value : undefined;
}

export const cleanNumber = (value: number | null | undefined): number | undefined => {
  return value ? value : undefined;
}

export const normalizeString = (value: string | undefined): string | undefined => {
  return value && value.trim() !== "" ? value.toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d") : undefined;
}

export const toDateDisplay = (value: string | undefined): string | undefined => {
  return value ? moment(value, "YYYY-MM-DD").format("DD/MM/YYYY") : undefined;
}

export const formatCurrency = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


/**
 * Định dạng số thành tiền Việt Nam Đồng (VND)
 * @param {number} amount - Số tiền cần định dạng
 * @returns {string} - Chuỗi định dạng tiền tệ
 */
export const currency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    currency: "VND",
  }).format(amount);
};
