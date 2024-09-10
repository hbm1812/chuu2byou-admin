import Table, { ColumnsType } from "antd/es/table";
import AppTable from "../../../components/common/AppTable";
import { currency } from "../../../utils";
import { renderStatusPaid } from "../../../utils/GetColorByTrangThai";
import {
  IPaymentInstallments,
  IPayments,
} from "../../BaoCaoThongKe/interfaces/TypeBaoCaoDoanhThu";
import { Empty } from "antd";
import moment from "moment";

const RenderViewPayment = ({
  payment,
}: {
  payment?: IPaymentInstallments[];
}) => {
  //! define

  //! state

  //! function
  const expandedRowRender = (record: IPaymentInstallments) => {
    const columns: ColumnsType<IPayments> = [
      {
        title: "Ngày thanh toán",
        dataIndex: "dueDate",
        key: "dueDate",
        fixed: "left",
        onHeaderCell: () => ({
          style: { textAlign: "center" },
        }),
      },
      {
        title: "Đã thanh toán",
        key: "valueAmount",
        render: (_, record) => {
          return (
            <div style={{ textAlign: "right" }}>
              {currency(record?.valueAmount)}
            </div>
          );
        },
        onHeaderCell: () => ({
          style: { textAlign: "center" },
        }),
      },
      {
        title: "Còn lại",
        key: "valueRemain",
        render: (_, record) => {
          return (
            <div style={{ textAlign: "right" }}>
              {currency(record?.valueRemain)}
            </div>
          );
        },
        onHeaderCell: () => ({
          style: { textAlign: "center" },
        }),
      },
      // {
      //   title: "ID hoá đơn",
      //   key: "invoiceId",
      //   dataIndex: "invoiceId",
      //   align:'center'

      // },
      {
        title: "Số hoá đơn",
        key: "invoiceNumber",
        dataIndex: "invoiceNumber",
        align:'center'
      },
      {
        title: "Ngày hoá đơn",
        key: "invoiceDate",
        render: (_, record) => {
          return record.invoiceDate && moment(record.invoiceDate, "YYYY-MM-DD").format("DD-MM-YYYY");
        },
        align: 'center'
      },
    ];

    return record.payments?.length > 0 ? (
      <Table
        columns={columns}
        dataSource={record.payments}
        pagination={false}
      />
    ) : (
      <Empty description="Chưa có thông tin thanh toán" />
    );
  };

  const column: ColumnsType<IPaymentInstallments> = [
    {
      title: "Tên đợt thanh toán",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Giá trị thanh toán",
      key: "valueAmount",
      render: (_, record) => {
        return (
          <div style={{ textAlign: "right" }}>
            {currency(record?.valueAmount)}
          </div>
        );
      },
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Thời gian thanh toán",
      key: "dueDateNote",
      render: (_, record) => {
        return record.dueDateNote && moment(record.dueDateNote, "YYYY-MM-DD").format("DD-MM-YYYY");
      },
      align: "center",
    },
    {
      title: "Ngày dự kiến",
      // dataIndex: "expectedDate",
      render: (_, record) => {
        return record.dueDateNote && moment(record.expectedDate, "YYYY-MM-DD").format("DD-MM-YYYY");
      },
      key: "expectedDate",
      align: "center",
    },
    {
      title: "Trạng thái thanh toán",
      key: "paid",
      render: (_, record) => {
        return renderStatusPaid(record?.paymentStatus);
      },
      align: "center",
      width: 150
    },
  ];

  //! useEffect

  //! render
  return (
    <AppTable
      borderTop={true}
      columns={column as ColumnsType<any>}
      expandable={{ expandedRowRender }}
      data={
        payment?.map((item) => {
          return { ...item, key: item.id };
        }) || []
      }
      pagination={false}
    />
  );
};

export default RenderViewPayment;
