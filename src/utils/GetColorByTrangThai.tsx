import { Tag } from "antd";
import React from "react";
import { Switch } from "antd";
const GetColorByTrangThai = (trangThai: string) => {
  switch (trangThai) {
    case "Sử dụng":
      return (
        <Tag color="success">
          <span>{trangThai}</span>
        </Tag>
      );

    case "Không sử dụng":
      return (
        <Tag color="red">
          <span>{trangThai}</span>
        </Tag>
      );
    case "1":
      return (
        <Tag color="success">
          <span>Sử dụng</span>
        </Tag>
      );

    case "2":
      return (
        <Tag color="red">
          <span>Không sử dụng</span>
        </Tag>
      );
    default:
      return (
        <Tag color="default">
          <span>{trangThai}</span>
        </Tag>
      );
  }
};
export default GetColorByTrangThai;

export const renderStatus = (status: number) => {
  switch (status) {
    case 1:
      return (
        <Tag style={{ width: "100%", textAlign: "center" }} color="red">
          Chưa thực hiện
        </Tag>
      );
    case 2:
      return (
        <Tag style={{ width: "100%", textAlign: "center" }} color="gold">
          Đang thực hiện
        </Tag>
      );
    case 3:
      return (
        <Tag
          style={{ width: "100%", textAlign: "center" }}
          color="success"
        >
          Đã hoàn thành
        </Tag>
      );
    default:
      return null;
  }
};
export const renderStatusNoColor = (status: number) => {
  switch (status) {
    case 1:
      return "Chưa thực hiện";
    case 2:
      return "Đang thực hiện";
    case 3:
      return " Đã hoàn thành";

    default:
      return null;
  }
};
export const renderProgressStatus = (status: number) => {
  switch (status) {
    case 1:
      return (
        <Tag style={{ width: "100%", textAlign: "center" }} color="cyan">
          Chưa đến hạn
        </Tag>
      );
    case 2:
      return (
        <Tag style={{ width: "100%", textAlign: "center" }} color="gold">
          Đến hạn
        </Tag>
      );
    case 4:
      return (
        <Tag style={{ width: "100%", textAlign: "center" }} color="red">
          Quá hạn
        </Tag>
      );
    case 3:
      return (
        <Tag
          style={{ width: "100%", textAlign: "center" }}
          color="success"
        >
          Đúng hạn
        </Tag>
      );
    default:
      return null;
  }
};

export const renderStatusUser = (status: number) => {
  switch (status) {
    case 0:
      return <Tag color="red">Không hoạt động</Tag>;
    case 1:
      return <Tag color="success">Đang hoạt động</Tag>;
    default:
      return null;
  }
  
};

export const renderStatusUse = (status: number) => {
  switch (status) {
    case 2:
      return <Tag color="red">Không sử dụng</Tag>;
    case 1:
      return <Tag color="success">Sử dụng</Tag>;
    default:
      return null;
  }
};

export const renderStatusExpried = (status: number) => {
  switch (status) {
    case 2:
      return <Tag color="#ff4d4f">Quá hạn</Tag>;
    case 1:
      return <Tag color="#faad17">Đến hạn</Tag>;
    default:
      return null;
  }
};

export const renderStatusTF = (status: boolean) => {
  switch (status) {
    case true:
      return <Tag color="success">Có</Tag>;
    case false:
      return <Tag color="#ff4d4f">Không</Tag>;
    default:
      return null;
  }
};

export const renderStatusPaid = (status: number) => {
  switch (status) {
    case 1:
      return (
        <Tag style={{ width: "100%", textAlign: "center" }} color="red">
          Chưa thanh toán
        </Tag>
      );
    case 2:
      return (
        <Tag style={{ width: "100%", textAlign: "center" }} color="cyan">
          Đã thanh toán 1 phần
        </Tag>
      );
    case 3:
      return (
        <Tag
          style={{ width: "100%", textAlign: "center" }}
          color="success"
        >
          Đã thanh toán toàn bộ
        </Tag>
      );
    case 4:
      return (
        <Tag style={{ width: "100%", textAlign: "center" }} color="gold">
          Chậm thanh toán
        </Tag>
      );
    default:
      return null;
  }
};
