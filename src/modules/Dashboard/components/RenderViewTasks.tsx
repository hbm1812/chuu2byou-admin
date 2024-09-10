import { ColumnsType } from "antd/es/table";
import AppTable from "../../../components/common/AppTable";
import {
  renderProgressStatus,
  renderStatus,
  renderStatusNoColor,
} from "../../../utils/GetColorByTrangThai";
import { ITasks } from "../../BaoCaoThongKe/interfaces/TypeBaoCaoDoanhThu";
import moment from "moment";

const RenderViewTasks = ({ tasks }: { tasks?: ITasks[] }) => {
  //! define

  //! state

  //! function
  const column: ColumnsType<ITasks> = [
    {
      title: "Mã công việc",
      dataIndex: "code",
      key: "code",
      fixed: "left",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Tên công việc",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },
    {
      title: "Cấp công việc",
      dataIndex: "taskLevel",
      key: "taskLevel",
      align: "center",
    },
    {
      title: "Sản phẩm đầu ra",
      dataIndex: "productName",
      key: "productName",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
    },

    {
      title: "Ngày bắt đầu công việc",
      render: (_, record) => {
        return (
          record.startTime &&
          moment(record.startTime, "YYYY-MM-DD").format("DD-MM-YYYY")
        );
      },
      key: "startTime",
      align: "center",
    },

    {
      title: "Ngày kết thúc công việc",
      render: (_, record) => {
        return (
          record.endTime &&
          moment(record.endTime, "YYYY-MM-DD").format("DD-MM-YYYY")
        );
      },
      key: "endTime",
      align: "center",
    },
    {
      title: "Trạng thái công việc",
      key: "status",
      align: "center",
      render: (_, record) => {
        return renderStatusNoColor(record?.status);
      },
    },
    {
      title: "Tiến độ công việc",
      key: "progressStatus",
      align: "center",
      render: (_, record) => {
        return renderProgressStatus(record?.progressStatus);
      },
    },
  ];

  //! useEffect

  //! render
  return (
    <AppTable
      borderTop={true}
      columns={column as ColumnsType<any>}
      data={tasks || []}
      pagination={false}
    />
  );
};

export default RenderViewTasks;
