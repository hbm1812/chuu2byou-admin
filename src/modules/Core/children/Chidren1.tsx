import React from "react";
import PageContainer from "../../../components/common/PageContainer";
import AppButton from "../../../components/common/AppButton";
import InputCore from "./components/InputCore";
import SelectedCore from "./components/SelectedCore";
import { FaArrowLeftLong } from "react-icons/fa6";
import DatePickerExample from "./components/DatePickerExample";

const Chidren1: React.FC = () => {
  const extraButton = () => {
    return (
      <div className="page_container_header_extra">
        <AppButton className="default_btn_add" title="Thêm mới" />
        <AppButton className="default_btn_search" title="Tìm kiếm" />
        <AppButton
          className="default_btn_refresh"
          title="Hover có background"
        />
        <AppButton danger title="Xoá có viền" />
      </div>
    );
  };

  return (
    <PageContainer title="Core 1" icon={<FaArrowLeftLong size={23} className="icon_pageContainer"/>} extra={extraButton()}>
      <div className="core_1_container">
        <InputCore />
        <SelectedCore />
        <DatePickerExample />
      </div>
    </PageContainer>
  );
};

export default Chidren1;
