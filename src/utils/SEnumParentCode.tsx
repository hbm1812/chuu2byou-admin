import React from "react";

const SEnumParentCode = (code: string) => {
    switch (code) {
        case "QLHT":
            return <div>Quản lý hệ thống</div>;
        case "QLDM":
            return <div>Quản lý danh mục</div>;
        case "QLHD":
            return <div>Quản lý hợp đồng</div>;
        default:
            return <div></div>;
    }
};

export default SEnumParentCode;