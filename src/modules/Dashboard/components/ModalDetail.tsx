import { Tabs, TabsProps } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppModal from "../../../components/common/AppModal";
import {
    startLoading,
    stopLoading,
} from "../../../redux/reducers/loadingReducer";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import { getDetail } from "../../BaoCaoThongKe/api/BaoCaoDoanhThu.api";
import { IResultDetailStatistic } from "../../BaoCaoThongKe/interfaces/TypeBaoCaoDoanhThu";
import RenderViewInfo from "./RenderViewInfo";
import RenderViewPayment from "./RenderViewPayment";
import RenderViewTasks from "./RenderViewTasks";

interface IProps {
  open: number | null;
  setOpenModal: Dispatch<SetStateAction<number | null>>;
}

const ModalDetail = (props: IProps) => {
  //! define

  //! state
  const dispatch = useDispatch();
  const { open, setOpenModal } = props;

  const [detail, setDetail] = useState<IResultDetailStatistic>();

  //! function
  const handleOk = () => {};

  const handleCancel = () => {
    setOpenModal(null);
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const getDetailContract = async () => {
    dispatch(startLoading());
    try {
      const response = await getDetail(open);
      if (response.status) {
        setDetail(response.result)
      }
    } catch (err) {
      dispatch(
        showNotification({
          message: "Lấy dữ liệu thất bại.",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const itemsTab: TabsProps["items"] = [
    {
      key: "1",
      label: "Thông tin chung",
      children: <RenderViewInfo overview={detail?.overview} />,
    },
    {
      key: "2",
      label: "Danh sách công việc",
      children: <RenderViewTasks tasks={detail?.tasks} />,
    },
    {
      key: "3",
      label: "Thanh toán",
      children: <RenderViewPayment payment={detail?.paymentInstallments} />,
    },
  ];

  //! useEffect
  useEffect(() => {
    getDetailContract();
  }, [open]);

  //! render
  return (
    <AppModal
      width={"80%"}
      title={"Chi tiết hợp đồng"}
      isOpen={!!open}
      onSubmit={handleOk}
      onClose={handleCancel}
      typeOpenModal={"detail"}
    >
      <Tabs
        type="card"
        defaultActiveKey="1"
        items={itemsTab}
        onChange={onChange}
      />
    </AppModal>
  );
};

export default ModalDetail;
