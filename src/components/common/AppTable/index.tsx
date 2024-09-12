import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import emptyImage from "../../../assets/svg/empty.svg";

type Props<T> = {
  titleTable?: string;
  borderTop?: boolean;
  total?: string | number;
  columns: ColumnsType<T>;
  data: T[];
  toolbar?: React.ReactNode;
};

const AppTable: React.FC<Props<any> & React.ComponentProps<typeof Table>> = ({
  titleTable,
  total,
  data,
  columns,
  borderTop = true,
  toolbar,

  ...restProps
}) => {
  return (
    <div
      // className="apptable_container"
        className={`apptable_container ${titleTable ? 'border-class' : ''}`}
      style={{
        border: borderTop ? "" : "none",
        marginTop: borderTop ? "" : 0,
      }}
    >
      <div className="apptable_container_header">
        <div className="apptable_container_header_title">
          <h3>{titleTable}</h3>
        </div>
        {toolbar && toolbar}
        {total && (
          <div className="apptable_container_header_title">
            <h4>
              <span>{total}</span> 件のレコードがあります
            </h4>
          </div>
        )}
      </div>
      <Table
        {...restProps}
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: "max-content" }}
        size="small"
        locale={{
          emptyText: (
            <div className="empty_table">
              <img src={emptyImage} alt="No data" style={{ margin: 20 }} />
              <div>データなし</div>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default AppTable;
